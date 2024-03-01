<script>
  // @ts-nocheck

  import {
    getFirestore,
    collection,
    getDocs,
    updateDoc,
  } from "firebase/firestore";
  import { firebaseApp } from "./../../firebase";
  import { storage, ref, uploadBytes, getDownloadURL } from "./../../firebase";
  import { onMount } from "svelte";
  import { jsPDF } from "jspdf";
  const db = getFirestore(firebaseApp);
  let cargado = false; // variable que se cambia cuando se cargan los datos
  let empleados = []; // lista de empleados en la base de datos
  let evaluador_logueado = null; // evaluador logueado
  let empleados_asignados = []; // lista de empleados asignados al evaluador logueado
  let empleado_evaluado_actual = null; // empleado que se está evaluando actualmente
  let puntos_subtotal_c1 = 0;
  let puntos_subtotal_c2 = 0;
  let puntos_subtotal_c3 = 0;
  let puntos_subtotal_c4 = 0;
  let puntos_total = 0; // puntaje total
  let promedio = 0;
  let inputs = null;

  onMount(async () => {
    const logueado = document.cookie.includes("logueado=true");
    const rol = document.cookie.includes("rol=EVALUADOR");
    if (logueado && rol) {
      await getEvaluadorLogueado();
      await cargarListaEmpleados();
      await getEmpleadosAsignados();
      cargado = true;
      setTimeout(() => {
        inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener("input", (event) => {
            calcularPuntos();
          });
        }
      }, 1000);
    }
  });

  async function cargarListaEmpleados() {
    const usersRef = collection(db, "EMPLEADOS");
    const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      empleados.push(userData);
    });
  }

  async function getEvaluadorLogueado() {
    const querySnapshot = await getDocs(collection(db, "EVALUADORES"));
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.CI === document.cookie.split("id=")[1].split(";")[0]) {
        evaluador_logueado = userData;
      }
    });
  }

  function getEmpleadosAsignados() {
    const asignados = evaluador_logueado.ASIGNADOS;
    empleados.forEach((element) => {
      if (asignados.includes(element.CI)) {
        empleados_asignados.push(element);
      }
    });
  }

  function seleccionEmpleado() {
    const seleccionado = document.getElementById("comboBox").value;
    if (seleccionado == "") {
      empleado_evaluado_actual = null;
      document.getElementById("nombreEmpleado").value = "";
      document.getElementById("sector").value = "";
      document.getElementById("idEmpleado").value = "";
      document.getElementById("nombreEvaluador").value = "";
      document.getElementById("evaluacionactual").value = "";
    } else {
      empleados_asignados.forEach((element) => {
        if (element.CI === seleccionado) {
          empleado_evaluado_actual = element;
        }
      });
      document.getElementById("nombreEmpleado").value =
        empleado_evaluado_actual.NOMBRE;
      document.getElementById("sector").value = empleado_evaluado_actual.SECTOR;
      document.getElementById("idEmpleado").value = empleado_evaluado_actual.CI;
      document.getElementById("nombreEvaluador").value =
        evaluador_logueado.NOMBRE;
      document.getElementById("evaluacionactual").value =
        new Date().toLocaleDateString();
      document.getElementById("ultimaevaluacion").value =
        ultimaEvaluacionCompletada(empleado_evaluado_actual.CI);
    }
  }

  function calcularPuntos() {
    puntos_subtotal_c1 = 0;
    puntos_subtotal_c2 = 0;
    puntos_subtotal_c3 = 0;
    puntos_subtotal_c4 = 0;
    puntos_total = 0;
    promedio = 0;
    for (let i = 1; i <= 16; i++) {
      try {
        const valor = parseInt(document.getElementById(`p${i}-${1}`).value);
        if (!isNaN(valor)) {
          puntos_subtotal_c1 += valor;
        }
      } catch (error) {}
    }
    for (let i = 1; i <= 16; i++) {
      try {
        const valor = parseInt(document.getElementById(`p${i}-${2}`).value);
        if (!isNaN(valor)) {
          puntos_subtotal_c2 += valor;
        }
      } catch (error) {}
    }
    for (let i = 1; i <= 16; i++) {
      try {
        const valor = parseInt(document.getElementById(`p${i}-${3}`).value);
        if (!isNaN(valor)) {
          puntos_subtotal_c3 += valor;
        }
      } catch (error) {}
    }
    for (let i = 1; i <= 16; i++) {
      try {
        const valor = parseInt(document.getElementById(`p${i}-${4}`).value);
        if (!isNaN(valor)) {
          puntos_subtotal_c4 += valor;
        }
      } catch (error) {}
    }
    puntos_total = puntos_subtotal_c1 + puntos_subtotal_c2 + puntos_subtotal_c3 + puntos_subtotal_c4;
    promedio = Math.round(puntos_total / 16);
  }

  async function guardarEvaluacion() {
    if (validarDatos()) {
      await Promise.all([crearPDF(), eliminarEvaluado()]);
      window.location.reload();
    }
  }

  function validarDatos() {
    const respuestas_p1 = {
      p1: document.getElementById("p1-1").value,
      p2: document.getElementById("p1-2").value,
      p3: document.getElementById("p1-3").value,
      p4: document.getElementById("p1-4").value,
    };
    const respuestas_p2 = {
      p1: document.getElementById("p2-1").value,
      p2: document.getElementById("p2-2").value,
      p3: document.getElementById("p2-3").value,
      p4: document.getElementById("p2-4").value,
    };
    const respuestas_p3 = {
      p1: document.getElementById("p3-1").value,
      p2: document.getElementById("p3-2").value,
      p3: document.getElementById("p3-3").value,
      p4: document.getElementById("p3-4").value,
    };

    const respuestas_p4 = {
      p1: document.getElementById("p4-1").value,
      p2: document.getElementById("p4-2").value,
      p3: document.getElementById("p4-3").value,
      p4: document.getElementById("p4-4").value,
    };

    const respuestas_p5 = {
      p1: document.getElementById("p5-1").value,
      p2: document.getElementById("p5-2").value,
      p3: document.getElementById("p5-3").value,
      p4: document.getElementById("p5-4").value,
    };

    const respuestas_p6 = {
      p1: document.getElementById("p6-1").value,
      p2: document.getElementById("p6-2").value,
      p3: document.getElementById("p6-3").value,
      p4: document.getElementById("p6-4").value,
    };

    const respuestas_p7 = {
      p1: document.getElementById("p7-1").value,
      p2: document.getElementById("p7-2").value,
      p3: document.getElementById("p7-3").value,
      p4: document.getElementById("p7-4").value,
    };

    const respuestas_p8 = {
      p1: document.getElementById("p8-1").value,
      p2: document.getElementById("p8-2").value,
      p3: document.getElementById("p8-3").value,
      p4: document.getElementById("p8-4").value,
    };

    const respuestas_p9 = {
      p1: document.getElementById("p9-1").value,
      p2: document.getElementById("p9-2").value,
      p3: document.getElementById("p9-3").value,
      p4: document.getElementById("p9-4").value,
    };

    const respuestas_p10 = {
      p1: document.getElementById("p10-1").value,
      p2: document.getElementById("p10-2").value,
      p3: document.getElementById("p10-3").value,
      p4: document.getElementById("p10-4").value,
    };

    const respuestas_p11 = {
      p1: document.getElementById("p11-1").value,
      p2: document.getElementById("p11-2").value,
      p3: document.getElementById("p11-3").value,
      p4: document.getElementById("p11-4").value,
    };

    const respuestas_p12 = {
      p1: document.getElementById("p12-1").value,
      p2: document.getElementById("p12-2").value,
      p3: document.getElementById("p12-3").value,
      p4: document.getElementById("p12-4").value,
    };

    const respuestas_p13 = {
      p1: document.getElementById("p13-1").value,
      p2: document.getElementById("p13-2").value,
      p3: document.getElementById("p13-3").value,
      p4: document.getElementById("p13-4").value,
    };

    const respuestas_p14 = {
      p1: document.getElementById("p14-1").value,
      p2: document.getElementById("p14-2").value,
      p3: document.getElementById("p14-3").value,
      p4: document.getElementById("p14-4").value,
    };

    const respuestas_p15 = {
      p1: document.getElementById("p15-1").value,
      p2: document.getElementById("p15-2").value,
      p3: document.getElementById("p15-3").value,
      p4: document.getElementById("p15-4").value,
    };

    const respuestas_p16 = {
      p1: document.getElementById("p16-1").value,
      p2: document.getElementById("p16-2").value,
      p3: document.getElementById("p16-3").value,
      p4: document.getElementById("p16-4").value,
    };

    const validValues = {
      p1: ["1", "2", ""],
      p2: ["3", "4", ""],
      p3: ["5", "6", ""],
      p4: ["7", "8", ""],
    };
    const errors = [];
    Object.keys(respuestas_p1).forEach((key) => {
      if (!validValues[key].includes(respuestas_p1[key])) {
        errors.push(`El valor ingresado en la pregunta 1 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta1").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p2).forEach((key) => {
      if (!validValues[key].includes(respuestas_p2[key])) {
        errors.push(`El valor ingresado en la pregunta 2 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta2").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p3).forEach((key) => {
      if (!validValues[key].includes(respuestas_p3[key])) {
        errors.push(`El valor ingresado en la pregunta 3 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta3").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p4).forEach((key) => {
      if (!validValues[key].includes(respuestas_p4[key])) {
        errors.push(`El valor ingresado en la pregunta 4 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta4").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p5).forEach((key) => {
      if (!validValues[key].includes(respuestas_p5[key])) {
        errors.push(`El valor ingresado en la pregunta 5 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta5").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p6).forEach((key) => {
      if (!validValues[key].includes(respuestas_p6[key])) {
        errors.push(`El valor ingresado en la pregunta 6 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta6").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p7).forEach((key) => {
      if (!validValues[key].includes(respuestas_p7[key])) {
        errors.push(`El valor ingresado en la pregunta 7 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta7").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p8).forEach((key) => {
      if (!validValues[key].includes(respuestas_p8[key])) {
        errors.push(`El valor ingresado en la pregunta 8 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta8").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p9).forEach((key) => {
      if (!validValues[key].includes(respuestas_p9[key])) {
        errors.push(`El valor ingresado en la pregunta 9 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta9").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p10).forEach((key) => {
      if (!validValues[key].includes(respuestas_p10[key])) {
        errors.push(`El valor ingresado en la pregunta 10 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta10").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p11).forEach((key) => {
      if (!validValues[key].includes(respuestas_p11[key])) {
        errors.push(`El valor ingresado en la pregunta 11 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta11").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p12).forEach((key) => {
      if (!validValues[key].includes(respuestas_p12[key])) {
        errors.push(`El valor ingresado en la pregunta 12 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta12").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p13).forEach((key) => {
      if (!validValues[key].includes(respuestas_p13[key])) {
        errors.push(`El valor ingresado en la pregunta 13 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta13").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p14).forEach((key) => {
      if (!validValues[key].includes(respuestas_p14[key])) {
        errors.push(`El valor ingresado en la pregunta 14 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta14").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p15).forEach((key) => {
      if (!validValues[key].includes(respuestas_p15[key])) {
        errors.push(`El valor ingresado en la pregunta 15 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta15").scrollIntoView();
      return;
    }

    Object.keys(respuestas_p16).forEach((key) => {
      if (!validValues[key].includes(respuestas_p16[key])) {
        errors.push(`El valor ingresado en la pregunta 16 no es válido`);
      }
    });
    if (errors.length > 0) {
      errors.forEach((error) => {
        console.log(error);
      });
      document.getElementById("pregunta16").scrollIntoView();
      return;
    }

    const respuestasRellenas = Object.values(respuestas_p1).filter(
      (value) => value.trim() !== ""
    );

    if (respuestasRellenas.length == 0) {
      alert("Responda a la pregunta 1");
      document.getElementById("pregunta1").scrollIntoView();
      return;
    }
    if (respuestasRellenas.length > 1) {
      alert("En la pregunta 1 solo puede responder una casilla");
      document.getElementById("pregunta1").scrollIntoView();
      return;
    }

    const respuestasRellenas2 = Object.values(respuestas_p2).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas2.length == 0) {
      alert("Responda a la pregunta 2");
      document.getElementById("pregunta2").scrollIntoView();
      return;
    }
    if (respuestasRellenas2.length > 1) {
      alert("En la pregunta 2 solo puede responder una casilla");
      document.getElementById("pregunta2").scrollIntoView();
      return;
    }
    const respuestasRellenas3 = Object.values(respuestas_p3).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas3.length == 0) {
      alert("Responda a la pregunta 3");
      document.getElementById("pregunta3").scrollIntoView();
      return;
    }
    if (respuestasRellenas3.length > 1) {
      alert("En la pregunta 3 solo puede responder una casilla");
      document.getElementById("pregunta3").scrollIntoView();
      return;
    }

    const respuestasRellenas4 = Object.values(respuestas_p4).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas4.length == 0) {
      alert("Responda a la pregunta 4");
      document.getElementById("pregunta4").scrollIntoView();
      return;
    }
    if (respuestasRellenas4.length > 1) {
      alert("En la pregunta 4 solo puede responder una casilla");
      document.getElementById("pregunta4").scrollIntoView();
      return;
    }

    const respuestasRellenas5 = Object.values(respuestas_p5).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas5.length == 0) {
      alert("Responda a la pregunta 5");
      document.getElementById("pregunta5").scrollIntoView();
      return;
    }
    if (respuestasRellenas5.length > 1) {
      alert("En la pregunta 5 solo puede responder una casilla");
      document.getElementById("pregunta5").scrollIntoView();
      return;
    }

    const respuestasRellenas6 = Object.values(respuestas_p6).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas6.length == 0) {
      alert("Responda a la pregunta 6");
      document.getElementById("pregunta6").scrollIntoView();
      return;
    }
    if (respuestasRellenas6.length > 1) {
      alert("En la pregunta 6 solo puede responder una casilla");
      document.getElementById("pregunta6").scrollIntoView();
      return;
    }

    const respuestasRellenas7 = Object.values(respuestas_p7).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas7.length == 0) {
      alert("Responda a la pregunta 7");
      document.getElementById("pregunta7").scrollIntoView();
      return;
    }
    if (respuestasRellenas7.length > 1) {
      alert("En la pregunta 7 solo puede responder una casilla");
      document.getElementById("pregunta7").scrollIntoView();
      return;
    }

    const respuestasRellenas8 = Object.values(respuestas_p8).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas8.length == 0) {
      alert("Responda a la pregunta 8");
      document.getElementById("pregunta8").scrollIntoView();
      return;
    }
    if (respuestasRellenas8.length > 1) {
      alert("En la pregunta 8 solo puede responder una casilla");
      document.getElementById("pregunta8").scrollIntoView();
      return;
    }

    const respuestasRellenas9 = Object.values(respuestas_p9).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas9.length == 0) {
      alert("Responda a la pregunta 9");
      document.getElementById("pregunta9").scrollIntoView();
      return;
    }
    if (respuestasRellenas9.length > 1) {
      alert("En la pregunta 9 solo puede responder una casilla");
      document.getElementById("pregunta9").scrollIntoView();
      return;
    }

    const respuestasRellenas10 = Object.values(respuestas_p10).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas10.length == 0) {
      alert("Responda a la pregunta 10");
      document.getElementById("pregunta10").scrollIntoView();
      return;
    }
    if (respuestasRellenas10.length > 1) {
      alert("En la pregunta 10 solo puede responder una casilla");
      document.getElementById("pregunta10").scrollIntoView();
      return;
    }

    const respuestasRellenas11 = Object.values(respuestas_p11).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas11.length == 0) {
      alert("Responda a la pregunta 11");
      document.getElementById("pregunta11").scrollIntoView();
      return;
    }
    if (respuestasRellenas11.length > 1) {
      alert("En la pregunta 11 solo puede responder una casilla");
      document.getElementById("pregunta11").scrollIntoView();
      return;
    }

    const respuestasRellenas12 = Object.values(respuestas_p12).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas12.length == 0) {
      alert("Responda a la pregunta 12");
      document.getElementById("pregunta12").scrollIntoView();
      return;
    }
    if (respuestasRellenas12.length > 1) {
      alert("En la pregunta 12 solo puede responder una casilla");
      document.getElementById("pregunta12").scrollIntoView();
      return;
    }

    const respuestasRellenas13 = Object.values(respuestas_p13).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas13.length == 0) {
      alert("Responda a la pregunta 13");
      document.getElementById("pregunta13").scrollIntoView();
      return;
    }
    if (respuestasRellenas13.length > 1) {
      alert("En la pregunta 13 solo puede responder una casilla");
      document.getElementById("pregunta13").scrollIntoView();
      return;
    }

    const respuestasRellenas14 = Object.values(respuestas_p14).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas14.length == 0) {
      alert("Responda a la pregunta 14");
      document.getElementById("pregunta14").scrollIntoView();
      return;
    }
    if (respuestasRellenas14.length > 1) {
      alert("En la pregunta 14 solo puede responder una casilla");
      document.getElementById("pregunta14").scrollIntoView();
      return;
    }

    const respuestasRellenas15 = Object.values(respuestas_p15).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas15.length == 0) {
      alert("Responda a la pregunta 15");
      document.getElementById("pregunta15").scrollIntoView();
      return;
    }
    if (respuestasRellenas15.length > 1) {
      alert("En la pregunta 15 solo puede responder una casilla");
      document.getElementById("pregunta15").scrollIntoView();
      return;
    }

    const respuestasRellenas16 = Object.values(respuestas_p16).filter(
      (value) => value.trim() !== ""
    );
    if (respuestasRellenas16.length == 0) {
      alert("Responda a la pregunta 16");
      document.getElementById("pregunta16").scrollIntoView();
      return;
    }
    if (respuestasRellenas16.length > 1) {
      alert("En la pregunta 16 solo puede responder una casilla");
      document.getElementById("pregunta16").scrollIntoView();
      return;
    }
    return true;
  }
  async function crearPDF() {
    document.getElementById("camboLabel").style.display = "none";
    document.getElementById("guardarEvaluacionDiv").style.display = "none";
    document.getElementById("evaluacionesCompletadas").style.display = "none";
    document.getElementById("evaluacionesCompletadas").style.display = "none";
    document.getElementById("btnCerrarSesion").style.display = "none";
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const fechaFormateada = `${dia.toString().padStart(2, "0")}-${mes
      .toString()
      .padStart(2, "0")}-${anio}`;
    let nombre_pdf =
      evaluador_logueado.CI +
      "_" +
      empleado_evaluado_actual.CI +
      empleado_evaluado_actual.NOMBRE +
      "_" +
      fechaFormateada +
      "_" +
      ".pdf";
    var doc = new jsPDF("p", "pt", "letter");
    var margin = 1;
    var scale =
      (doc.internal.pageSize.width - margin * 2) / document.body.scrollWidth;

    await doc.html(document.body, {
      x: margin,
      y: margin,
      html2canvas: {
        scale: scale,
        letterRendering: true,
      },
    });
    const pdfBytes = doc.output("arraybuffer");
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const storageRef = ref(storage, nombre_pdf);
    await uploadBytes(storageRef, pdfBlob);
    const url = await getDownloadURL(storageRef);
    await agregarEvaluacionCompletada(url);
  }

  async function agregarEvaluacionCompletada(url) {
    const querySnapshot = await getDocs(collection(db, "EVALUADORES"));
    for (const doc of querySnapshot.docs) {
      if (doc.data().CI === evaluador_logueado.CI) {
        let evaluaciones_completadas = doc.data().EVALUACIONES_COMPLETADAS;
        evaluaciones_completadas.push(url);
        await updateDoc(doc.ref, {
          EVALUACIONES_COMPLETADAS: evaluaciones_completadas,
        });
      }
    }
  }

  async function eliminarEvaluado() {
    const querySnapshot = await getDocs(collection(db, "EVALUADORES"));
    for (const doc of querySnapshot.docs) {
      if (doc.data().CI === evaluador_logueado.CI) {
        let asignados = doc.data().ASIGNADOS;
        asignados = asignados.filter(
          (element) => element !== empleado_evaluado_actual.CI
        );
        await updateDoc(doc.ref, {
          ASIGNADOS: asignados,
        });
      }
    }
  }
  function cerrarSesion() {
    document.cookie = "logueado=true;max-age=0";
    document.cookie = "rol=;max-age=0";
    window.location.href = "/";
  }

  function ultimaEvaluacionCompletada(id) {
    const evaluaciones_completadas =
      evaluador_logueado.EVALUACIONES_COMPLETADAS;
    let encontrado = false;
    for (let i = 0; i < evaluaciones_completadas.length; i++) {
      if (evaluaciones_completadas[i].split(".pdf")[0].split("_")[1] === id) {
        encontrado = true;
        return evaluaciones_completadas[i].split("_")[2];
      }
    }
    if (!encontrado) {
      return "NUNCA";
    }
  }
</script>

{#if cargado}
  <!-- svelte-ignore a11y-missing-attribute -->
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>EVALUADORES</title>
      <link rel="icon" href="/favicon.png" type="image/png" />
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
    </head>
    <div class="flex justify-center bg-green-900">
      <img src="logo.png" alt="Logo COMTA" class="w-1/2" />
    </div>
    <body>
      <header class="bg-green-800 text-white p-4 mb-4">
        <div class="flex justify-between items-center">
          <h1
            class="text-2xl font-bold border-b-2 border-green-800 text-center"
          >
            EVALUADOR- ID: {evaluador_logueado.CI} NOMBRE: {evaluador_logueado.NOMBRE}
          </h1>
          <div class="flex justify-end">
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
              onclick="window.location.href = '/ayuda/evaluador'"
            >
              Ayuda
            </button>
            <button
              id="btnCerrarSesion"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              on:click={cerrarSesion}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
    </body>
    <div id="camboLabel" class="flex items-center">
      <h2 class="mr-4">Seleccione una persona a evaluar:</h2>
      <select
        id="comboBox"
        class="bg-gray-200 px-4 py-2 rounded"
        on:change={seleccionEmpleado}
      >
        <option value=""></option>
        {#each empleados_asignados as item}
          <option value={item.CI}>{item.CI}_{item.NOMBRE}_{item.SECTOR}</option>
        {/each}
      </select>
    </div>

    <div class="p-4 rounded">
      <h2 class="bg-green-800 text-white text-center text-2xl font-bold p-4">
        PERFORMANCE DE EVALUACION
      </h2>
      <div class="bg-green-500 p-4">
        <table id="tabla1" class="w-full table-auto">
          <thead>
            <tr>
              <td class="px-4 py-2">NOMBRE DEL EMPLEADO:</td>
              <td class="px-4 py-2">
                <input
                  type="text"
                  id="nombreEmpleado"
                  readonly
                  class="bg-gray-200 w-full"
                  value=""
                />
              </td>
              <td class="px-4 py-2">SECTOR:</td>
              <td class="px-4 py-2">
                <input
                  type="text"
                  id="sector"
                  readonly
                  class="bg-gray-200 w-full"
                  value=""
                />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-2">ID DEL EMPLEADO:</td>
              <td class="px-4 py-2">
                <input
                  type="text"
                  id="idEmpleado"
                  readonly
                  class="bg-gray-200 w-full"
                  value=""
                />
              </td>
              <td class="px-4 py-2">NOMBRE DEL EVALUADOR:</td>
              <td class="px-4 py-2">
                <input
                  type="text"
                  id="nombreEvaluador"
                  readonly
                  class="bg-gray-200 w-full"
                  value=""
                />
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2">FECHA ÚLTIMA EVALUACIÓN:</td>
              <td class="px-4 py-2">
                <input
                  type="text"
                  id="ultimaevaluacion"
                  readonly
                  class="bg-gray-200 w-full"
                  value=""
                />
              </td>
              <td class="px-4 py-2">FECHA ENTREGA EVALUACIÓN ACTUAL:</td>
              <td class="px-4 py-2">
                <input
                  type="text"
                  id="evaluacionactual"
                  readonly
                  class="bg-gray-200 w-full"
                  value=""
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="bg-green-800 text-white text-center text-2xl font-bold p-4">
        CARACTERÍSTICAS
      </h2>
      <div class="p-4 rounded text-center">
        <div class="overflow-x-auto">
          <table
            class="table-auto w-full"
            style="position: sticky; top: 0; background-color: white;"
          >
            <tr>
              <td class="p-2 border border-black w-1/5">CALIFICACION:</td>
              <td class="p-2 border border-black w-1/5">INSATISFACTORIO</td>
              <td class="p-2 border border-black w-1/5">ACEPTABLE</td>
              <td class="p-2 border border-black w-1/5">MUY BIEN</td>
              <td class="p-2 border border-black w-1/5">EXCELENTE</td>
            </tr>
            <tr>
              <td class="p-2 border border-black w-1/5"
                >PUNTAJE DE DESEMPEÑO:</td
              >
              <td class="p-2 border border-black w-1/5">1-2</td>
              <td class="p-2 border border-black w-1/5">3-4</td>
              <td class="p-2 border border-black w-1/5">5-6</td>
              <td class="p-2 border border-black w-1/5">7-8</td>
            </tr>
          </table>
        </div>
        <div class="overflow-x-auto">
          <table
            class="table-auto w-full"
            style="position: sticky; top: 0; background-color: white;"
          >
            <tr id="pregunta1">
              <td class="p-2 border border-black w-1/5">Calidad del trabajo. <span style="color: green;">[Se ajusta a las normas, procedimientos y politicas existentes]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p1-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p1-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p1-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p1-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>
            <tr id="pregunta2">
              <td class="p-2 border border-black w-1/5">Consistencia en el trabajo <span style="color: green;">[Fija un correcto uso del tiempo, solidez y coherencia en sus funciones]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p2-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p2-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p2-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p2-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>
            <tr id="pregunta3">
              <td class="p-2 border border-black w-1/5">Comunicación <span style="color: green;">[Interaccion escrita, verbal, expresiones emocionales, para alcanzar la correcta comprension]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p3-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p3-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p3-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p3-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>
            <tr id="pregunta4">
              <td class="p-2 border border-black w-1/5">Trabajo independiente <span style="color: green;">[Capacidad de tomar decisiones correctas sin requerir una mayor supervision]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p4-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p4-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p4-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p4-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>
            <tr id="pregunta5">
              <td class="p-2 border border-black w-1/5">Toma la iniciativa <span style="color: green;">[Facilidad para avanzar ante diferentes tipos de innovacion]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p5-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p5-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p5-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p5-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>
            <tr id="pregunta6">
              <td class="p-2 border border-black w-1/5">Trabajo en grupo <span style="color: green;">[Tambien capacidad de compartir conocimiento y habilidades]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p6-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p6-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p6-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p6-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>
            <tr id="pregunta7">
              <td class="p-2 border border-black w-1/5">Productividad <span style="color: green;">[Se evalua la cantidad de produccion realizada o la cantidad de servicios atendidos]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p7-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p7-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p7-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p7-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>
            <tr id="pregunta8">
              <td class="p-2 border border-black w-1/5">Creatividad <span style="color: green;">[Ofrece alternativas innovadoras para solucionar problemas]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p8-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p8-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p8-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p8-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>

            <tr id="pregunta9">
              <td class="p-2 border border-black w-1/5">Relaciones con los compañeros de trabajo <span style="color: green;">[Relacion acorde en lo estrictamente laboral]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p9-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p9-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p9-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p9-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>
            <tr id="pregunta10">
              <td class="p-2 border border-black w-1/5">Relaciones con los clientes <span style="color: green;">[Agilidad, precision, amabilidad y comprension son claves para la fidelizacion]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p10-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p10-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p10-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p10-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>
            <tr id="pregunta11">
              <td class="p-2 border border-black w-1/5">Habilidades Técnicas <span style="color: green;">[Conocimiento de las distintas herramientas para el desarrollo de su labor]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p11-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p11-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p11-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p11-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>
            <tr id="pregunta12">
              <td class="p-2 border border-black w-1/5">Fiabilidad <span style="color: green;">[Para el buen funcionamiento se requiere de confiabilidad y credibilidad]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p12-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p12-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p12-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p12-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>

            <tr id="pregunta13">
              <td class="p-2 border border-black w-1/5">Puntualidad <span style="color: green;">[Cuidado en hacer las cosas o llegar a su debido tiempo - sin retrasos]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p13-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p13-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p13-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p13-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>
            <tr id="pregunta14">
              <td class="p-2 border border-black w-1/5">Asistencia <span style="color: green;">[Considerar las dificultades que ocasiona ausencias totales o parciales al trabajo]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p14-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p14-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p14-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p14-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>
            <tr id="pregunta15">
              <td class="p-2 border border-black w-1/5">Seguridad y Salud Ocupacional <span style="color: green;">[Tener disciplina y asi prevenir enfermedades o accidentes laborales]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p15-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p15-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p15-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p15-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>
            <tr id="pregunta16">
              <td class="p-2 border border-black w-1/5">Cuidado del Medio Ambiente <span style="color: green;">[Conducta correcta para garantizar y asegurar el buen uso de locales, materiales y servicios]</span></td>
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p16-1"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p16-2"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p16-3"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
              <td class="p-2 border border-black w-1/5"
                ><input
                  id="p16-4"
                  type="text"
                  class="border border-black p-2"
                  style="width: 100%"
                /></td
              >
            </tr>

            <tr id="subtotal">
              <td class="p-2 border border-black w-1/5">SUB-TOTAL</td>
              <td class="p-2 border border-black w-1/5">{puntos_subtotal_c1}</td
              >
              <td class="p-2 border border-black w-1/5">{puntos_subtotal_c2}</td
              >
              <td class="p-2 border border-black w-1/5">{puntos_subtotal_c3}</td
              >
              <td class="p-2 border border-black w-1/5">{puntos_subtotal_c4}</td
              >
            </tr>
          </table>
        </div>

        <br />
        <div class="bg-green-800 text-white p-4">
          <table class="w-full table-auto">
            <tr>
              <td class="bg-green-800 text-left text-white">TOTAL</td>
              <td class="bg-gray-600">{puntos_total}</td>
            </tr>
            <tr>
              <td class="bg-green-800 text-left text-white"
                >PROMEDIO EVALUACIÓN</td
              >
              <td class="bg-gray-600">{promedio}</td>
            </tr>
          </table>
        </div>
        <br /><br /><br /><br /><br />

        <div class="p-4">
          <h2
            class="bg-green-800 text-white text-center text-2xl font-bold p-4"
          >
            METAS
          </h2>
          <h3
            class="bg-green-500 text-white text-center text-2xl font-bold p-4"
          >
            ¿OBJETIVOS ALCANZADOS ESTABLECIDOS EN UNA REVISIÓN ANTERIOR?
          </h3>
          <textarea id="objetivosAnteriores" class="h-32 w-full"></textarea>
          <br />
          <h3
            class="bg-green-500 text-white text-center text-2xl font-bold p-4"
          >
            OBJETIVOS PARA EL PRÓXIMO PERÍODO EVALUATORIO
          </h3>
          <textarea id="objetivosFuturos" class="h-32 w-full"></textarea>
          <br />
          <h2
            class="bg-green-800 text-white text-center text-2xl font-bold p-4"
          >
            OPINION (Itercambio entre Evaluador y Evaluado)
          </h2>
          <h3
            class="bg-green-500 text-white text-center text-2xl font-bold p-4"
          >
            COMENTARIOS
          </h3>
          <textarea id="comentarios" class="h-32 w-full"></textarea>
          <table class="border-separate border-2 border-black">
            <tr class="border-b">
              <td class="bg-gray-200 w-1/10">FIRMA DEL EVALUADO</td>
              <td class="w-1/2" colspan="2">
                <div class="bg-white h-16"></div>
              </td>
              <td class="bg-gray-200 w-1/10">FIRMA DEL EVALUADOR</td>
              <td class="w-1/2" colspan="2">
                <div class="bg-white h-16"></div>
              </td>
            </tr>
            <br />
            <tr class="border-b">
              <td class="bg-gray-200 w-1/10">FECHA CIERRE DE LA EVALUACION</td>
              <td class="w-1/2" colspan="2">
                <div class="bg-white h-16"></div>
              </td>
              <td class="bg-gray-200 w-1/10">FIRMA GERENCIA</td>
              <td class="w-1/2" colspan="2">
                <div class="bg-white h-16"></div>
              </td>
            </tr>
          </table>
        </div>

        <br /><br />
        <div id="guardarEvaluacionDiv" class="flex justify-center space-x-4">
          <button
            class="bg-green-800 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
            on:click={guardarEvaluacion}
          >
            GUARDAR EVALUACION
          </button>
        </div>
      </div>

      <br /><br />
      <div id="evaluacionesCompletadas">
        <h2 class="text-2xl font-bold text-center mt-4 bg-green-500 text-white">
          EVALUACIONES COMPLETADAS
        </h2>
        <br />
        <div class="flex justify-center space-x-4">
          {#each evaluador_logueado.EVALUACIONES_COMPLETADAS as ev}
            <a href={ev} class="text-green-500 hover:text-green-700"
              >ID evaluado: {ev
                .split("/")
                .pop()
                .split(".pdf")[0]
                .split("_")[1]
                .replaceAll("%20", " ")}
              Fecha:
              {ev.split("/").pop().split(".pdf")[0].split("_")[2]}</a
            >
          {/each}
        </div>
      </div>
    </div></html
  >
{/if}
