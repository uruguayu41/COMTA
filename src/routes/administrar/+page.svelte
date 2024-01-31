<script>
  // @ts-nocheck

  import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    getDocs,
    updateDoc,
  } from "firebase/firestore";
  import {
    firebaseApp,
    storage,
    ref,
    listAll,
    deleteObject,
    getMetadata,
  } from "./../../firebase";
  import { onMount } from "svelte";

  const db = getFirestore(firebaseApp);

  let cargado = false; // variable que se cambia cuando se cargan los datos
  let empleados_no_asignados = [];
  let empleados_asignados = []; // arreglo para almacenar los empleados asignados a un evaluador seleccionado

  // @ts-ignore
  let evaluadores = []; // lista de evaluadores en la base de datos
  // @ts-ignore
  let empleados = []; // lista de empleados en la base de datos

  let evaluador_seleccionado = null; // evaluador seleccionado en la pantalla principal
  let empleado_seleccionado = null; // empleado seleccionado en la pantalla principal

  let nombreNuevoEmpleado = ""; // variable para crear un nuevo empleado
  let sectorNuevoEmpleado = ""; // variable para crear un nuevo empleado
  let identificadorNuevoEmpleado = ""; // variable para crear un nuevo empleado
  let nombreEditarEmpleado = ""; // variable para editar un empleado
  let sectorEditarEmpleado = ""; // variable para editar un empleado
  let identificadorEditarEmpleado = ""; // variable para editar un empleado

  let empleados_pantalla_principal = []; // variable para mostrar la lista de empleados en la pantalla principal
  let empleados_no_asignados_mostrar = []; // variable para mostrar la lista de empleados no asignados en la pantalla principal
  let evaluadores_pantalla_principal = []; // variable para mostrar la lista de evaluadores en la pantalla principal

  onMount(async () => {
    const logueado = document.cookie.includes("logueado=true");
    const rol = document.cookie.includes("rol=ADMINISTRADOR");
    if (logueado && rol) {
      await cargarEvaluadores();
      await cargarEmpleados();
      empleados_pantalla_principal = empleados;
      empleados_no_asignados_mostrar = empleados_no_asignados;
      evaluadores_pantalla_principal = evaluadores;
      cargado = true;
    }
  });

  function cargarEmpleadosSeleccionados() {
    evaluador_seleccionado.ASIGNADOS.forEach((element) => {
      empleados.find((empleado) => {
        if (empleado.CI === element) {
          empleados_asignados.push(empleado);
        }
      });
    });
    empleados.forEach((element) => {
      if (!empleados_asignados.find((empleado) => empleado.CI === element.CI)) {
        empleados_no_asignados.push(element);
      }
    });
  }

  async function cargarEvaluadores() {
    const usersRef = collection(db, "EVALUADORES");
    const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach((doc) => {
      // @ts-ignore
      evaluadores = evaluadores.concat(doc.data());
    });
  }

  async function cargarEmpleados() {
    const usersRef = collection(db, "EMPLEADOS");
    const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach((doc) => {
      // @ts-ignore
      empleados = empleados.concat(doc.data());
    });
  }

  function seleccionarEvaluador(event) {
    const selectedElement = event.target;
    const id_seleccionado = selectedElement.textContent
      .split("IDENTIFICADOR:")[1]
      .trim();
    evaluadores_pantalla_principal.find((evaluador) => {
      if (evaluador.CI === id_seleccionado) {
        evaluador_seleccionado = evaluador;
      }
    });
    openModalEvaluador();
  }

  function seleccionarEmpleado(event) {
    const selectedElement = event.target;
    const id_seleccionado = selectedElement.textContent
      .split("IDENTIFICADOR:")[1]
      .trim();
    empleados.find((empleado) => {
      if (empleado.CI === id_seleccionado) {
        empleado_seleccionado = empleado;
      }
    });
    openModalEmpleado();
  }

  async function nuevoEmpleado() {
    if (
      nombreNuevoEmpleado === "" ||
      sectorNuevoEmpleado === "" ||
      identificadorNuevoEmpleado === ""
    ) {
      alert("Todos los campos son obligatorios");
    } else {
      const nuevo_empleado = {
        NOMBRE: nombreNuevoEmpleado,
        SECTOR: sectorNuevoEmpleado,
        CI: identificadorNuevoEmpleado,
      };
      try {
        const docRef = await addDoc(
          collection(db, "EMPLEADOS"),
          nuevo_empleado
        );
        alert("Empleado creado con exito");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }

  function openModalNuevoEmpleado() {
    document.getElementById("modalNuevoEmpleado").classList.remove("hidden");
  }

  function closeModalNuevoEmpleado() {
    document.getElementById("nombreNuevoEmpleado").value = "";
    document.getElementById("modalNuevoEmpleado").classList.add("hidden");
  }

  async function openModalEvaluador() {
    const psw = document.getElementById("password_selected");
    psw.textContent = "(" + (await obtenerUserPass()) + ")";
    if (
      empleados_no_asignados_mostrar.length === 0 &&
      empleados_asignados.length === 0
    ) {
      cargarEmpleadosSeleccionados();
      buscarEmpleadosEvaluador();
      // @ts-ignore
      for (const element of empleados_asignados) {
        const htmlString =
          `<li onclick=seleccionarElemento(event) class='py-2 cursor-pointer hover:bg-gray-300'>` +
          element.CI +
          "_" +
          element.NOMBRE +
          "_" +
          element.SECTOR +
          "</li>";
        document
          .getElementById("lista2")
          .insertAdjacentHTML("beforeend", htmlString);
      }
      document.getElementById("tituloModalEvaluador").textContent =
        evaluador_seleccionado.CI + "_" + evaluador_seleccionado.NOMBRE;
    }
    document
      .getElementById("modalEvaluadorSeleccionado")
      .classList.remove("hidden");

    let stringInsert =
      ` <br/> <h2 class="text-2xl font-bold text-center mt-4 bg-green-500 text-white">EVALUACIONES COMPLETADAS</h2>` +
      `<div class="flex justify-center space-x-4">`;

    evaluador_seleccionado.EVALUACIONES_COMPLETADAS.forEach((ev) => {
      const id = ev.split("/").pop().split(".pdf")[0].split("_")[0];
      const date = ev.split("/").pop().split(".pdf")[0].split("_")[2];
      stringInsert += `<button class="flex items-center space-x-2">`;
      stringInsert += `  <a href="${ev}" class="text-green-500 hover:text-green-700">ID evaluado: ${id} Fecha: ${date}</a>`;
      stringInsert += `  <button class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 eliminar-button" data-id="${id}" data-date="${date}">Eliminar</button>`;
      stringInsert += `</button>`;
    });
    stringInsert += `</div>`;
    document
      .getElementById("modalEv")
      .insertAdjacentHTML("beforeend", stringInsert);

    const eliminarButtons = document.querySelectorAll(".eliminar-button");
    eliminarButtons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const id = event.target.dataset.id;
        const fecha = event.target.dataset.date;
        await eliminarEvaluacionEvaluador(id, fecha);
      });
    });
  }

  async function eliminarEvaluacionEvaluador(id, fecha) {
    const listRef = ref(storage);
    const listResult = await listAll(listRef);
    const matchingFiles = listResult.items.filter((itemRef) => {
      const fileName = getMetadata(itemRef);
      return fileName;
    });

    if (matchingFiles.length > 0) {
      const storageRef = matchingFiles[0];
      await deleteObject(storageRef).then(() => {});
      const querySnapshot = await getDocs(collection(db, "EVALUADORES"));
      for (const doc of querySnapshot.docs) {
        if (doc.data().CI === evaluador_seleccionado.CI) {
          let evaluaciones = doc.data().EVALUACIONES_COMPLETADAS;
          evaluaciones = evaluaciones.filter(
            (element) => !element.includes(id) && !element.includes(fecha)
          );
          await updateDoc(doc.ref, {
            EVALUACIONES_COMPLETADAS: evaluaciones,
          });
        }
      }
      alert("Evaluación eliminada con exito");
      window.location.reload();
    } else {
      alert("No se encontró la evaluación con el ID y fecha especificados");
    }
  }

  function closeModalEvaluador() {
    empleados_asignados = [];
    empleados_no_asignados = [];
    empleados_no_asignados_mostrar = [];
    document.getElementById("lista1").innerHTML = "";
    document.getElementById("lista2").innerHTML = "";
    document.getElementById("modalEv").innerHTML = "";
    document
      .getElementById("modalEvaluadorSeleccionado")
      .classList.add("hidden");
  }

  function openModalEmpleado() {
    document
      .getElementById("modalEmpleadoSeleccionado")
      .classList.remove("hidden");
    document.getElementById("tituloModalEmpleado").textContent =
      empleado_seleccionado.CI + "_" + empleado_seleccionado.NOMBRE;
  }

  function closeModalEmpleado() {
    document
      .getElementById("modalEmpleadoSeleccionado")
      .classList.add("hidden");
  }

  function seleccionarElemento(event) {
    const elementos = event.target.parentNode.getElementsByTagName("li");
    for (let i = 0; i < elementos.length; i++) {
      elementos[i].classList.remove("bg-blue-200");
    }
    event.target.classList.add("bg-blue-200");
  }
  try {
    window.seleccionarElemento = seleccionarElemento;
  } catch (error) {}

  function fromList1To2() {
    const lista1 = document.getElementById("lista1");
    const lista2 = document.getElementById("lista2");
    const selectedItem = lista1.querySelector(".bg-blue-200");
    selectedItem.classList.remove("bg-blue-200");
    const newElement = selectedItem.cloneNode(true);
    lista2.appendChild(newElement);
    empleados_no_asignados.forEach((element) => {
      if (element.CI === selectedItem.textContent.split("_")[0]) {
        const index = empleados_no_asignados.indexOf(element);
        empleados_no_asignados.splice(index, 1);
        return;
      }
    });
    buscarEmpleadosEvaluador();
  }

  function fromList2To1() {
    const lista2 = document.getElementById("lista2");
    const selectedItem = lista2.querySelector(".bg-blue-200");
    lista2.removeChild(selectedItem);
  }

  async function eliminarEvaluador() {
    if (confirm("¿Estás seguro de que deseas continuar?")) {
      const querySnapshot = await getDocs(collection(db, "EVALUADORES"));
      for (const doc of querySnapshot.docs) {
        if (doc.data().CI === evaluador_seleccionado.CI) {
          await deleteDoc(doc.ref);
        }
      }
      const querySnapshot2 = await getDocs(collection(db, "USUARIOS"));
      for (const doc2 of querySnapshot2.docs) {
        if (doc2.data().CI === evaluador_seleccionado.CI) {
          await deleteDoc(doc2.ref);
        }
      }
      alert("Evaluador eliminado con éxito");
      window.location.reload();
    } else {
      alert("Cancelado");
    }
  }

  function openModalEditarEmpleado() {
    closeModalEmpleado();
    nombreEditarEmpleado = empleado_seleccionado.NOMBRE;
    sectorEditarEmpleado = empleado_seleccionado.SECTOR;
    identificadorEditarEmpleado = empleado_seleccionado.CI;
    document.getElementById("modalEditarEmpleado").classList.remove("hidden");
  }

  function closeModalEditarEmpleado() {
    document.getElementById("modalEditarEmpleado").classList.add("hidden");
  }

  async function convertirEvaluador() {
    if (confirm("¿Estás seguro de que deseas continuar?")) {
      const nuevo_evaluador = {
        CI: empleado_seleccionado.CI,
        NOMBRE: empleado_seleccionado.NOMBRE,
        ASIGNADOS: [],
        EVALUACIONES_COMPLETADAS: [],
      };
      try {
        const docRef = await addDoc(
          collection(db, "EVALUADORES"),
          nuevo_evaluador
        );
        alert("Evaluador creado con exito");
        closeModalEditarEmpleado();
      } catch (error) {
        console.log(error);
      }
      const usuario = empleado_seleccionado.CI;
      const password = (Math.floor(Math.random() * 9000) + 1000).toString();

      const nuevo_usuario = {
        CI: empleado_seleccionado.CI,
        USUARIO: usuario,
        CONTRASENA: password,
        ROL: "EVALUADOR",
      };
      try {
        const docRef = await addDoc(collection(db, "USUARIOS"), nuevo_usuario);
      } catch (error) {
        console.log(error);
      }

      alert(
        " Se ha creado el usuario " +
          usuario +
          " y la contraseña es: " +
          password
      );
      window.location.reload();
    } else {
      alert("Cancelado");
    }
  }

  async function eliminarEmpleado() {
    if (confirm("¿Estás seguro de que deseas continuar?")) {
      const querySnapshot = await getDocs(collection(db, "EMPLEADOS"));
      for (const doc of querySnapshot.docs) {
        if (doc.data().CI === empleado_seleccionado.CI) {
          await deleteDoc(doc.ref);
        }
        const querySnapshot2 = await getDocs(collection(db, "EVALUADORES"));
        for (const doc2 of querySnapshot2.docs) {
          if (doc2.data().CI === empleado_seleccionado.CI) {
            await deleteDoc(doc2.ref);
          }
        }

        const querySnapshot3 = await getDocs(collection(db, "USUARIOS"));
        for (const doc3 of querySnapshot3.docs) {
          if (doc3.data().CI === empleado_seleccionado.CI) {
            await deleteDoc(doc3.ref);
          }
        }

        alert("Empleado eliminado con éxito");
        window.location.reload();
      }
    } else {
      alert("Cancelado");
    }
  }

  async function guardarCambiosEvaluador() {
    const querySnapshot = await getDocs(collection(db, "EVALUADORES"));
    let asignados = document.getElementById("lista2").innerText;
    asignados = asignados.split("\n");
    let lista_asignados = [];
    for (let i = 0; i < asignados.length; i++) {
      lista_asignados.push(asignados[i].split("_")[0]);
    }
    for (const doc of querySnapshot.docs) {
      if (doc.data().CI === evaluador_seleccionado.CI) {
        await updateDoc(doc.ref, {
          ASIGNADOS: lista_asignados,
        });
        alert("Cambios guardados con exito");
        window.location.reload();
      }
    }
  }

  async function guardarCambiosEditarEmpleado() {
    if (confirm("¿Estás seguro de que deseas continuar?")) {
      const querySnapshot = await getDocs(collection(db, "EMPLEADOS"));
      for (const doc of querySnapshot.docs) {
        if (doc.data().CI === empleado_seleccionado.CI) {
          await updateDoc(doc.ref, {
            NOMBRE: nombreEditarEmpleado,
            SECTOR: sectorEditarEmpleado,
            CI: identificadorEditarEmpleado,
          });
        }
      }
      alert("Cambios guardados con exito");
      window.location.reload();
    } else {
      alert("Cancelado");
    }
    closeModalEditarEmpleado();
  }

  function buscarEvaluadoresPrincipal() {
    const buscado = document.getElementById("buscador_evaluadores_input").value;
    let lista_temporal = [];
    for (let i = 0; i < evaluadores.length; i++) {
      const cadena_buscar = evaluadores[i].CI + " " + evaluadores[i].NOMBRE;
      if (
        cadena_buscar.toLocaleLowerCase().includes(buscado.toLocaleLowerCase())
      ) {
        lista_temporal.push(evaluadores[i]);
      }
    }
    evaluadores_pantalla_principal = lista_temporal;
  }

  function buscarEmpleadosPrincipal() {
    const buscado = document.getElementById("buscador_empleados_input").value;
    let lista_temporal = [];
    for (let i = 0; i < empleados.length; i++) {
      const cadena_buscar =
        empleados[i].CI + " " + empleados[i].NOMBRE + " " + empleados[i].SECTOR;
      if (
        cadena_buscar.toLocaleLowerCase().includes(buscado.toLocaleLowerCase())
      ) {
        lista_temporal.push(empleados[i]);
      }
    }
    empleados_pantalla_principal = lista_temporal;
  }

  function buscarEmpleadosEvaluador() {
    const buscado = document.getElementById(
      "buscador_no_asignados_evaluador"
    ).value;
    let lista_temporal = [];
    for (let i = 0; i < empleados_no_asignados.length; i++) {
      const cadena_buscar =
        empleados_no_asignados[i].CI +
        " " +
        empleados_no_asignados[i].NOMBRE +
        " " +
        empleados_no_asignados[i].SECTOR;
      if (
        cadena_buscar.toLocaleLowerCase().includes(buscado.toLocaleLowerCase())
      ) {
        lista_temporal.push(empleados_no_asignados[i]);
      }
    }
    empleados_no_asignados_mostrar = lista_temporal;
  }

  function cerrarSesion() {
    document.cookie = "logueado=true;max-age=0";
    document.cookie = "rol=;max-age=0";
    window.location.href = "/";
  }

  async function obtenerUserPass() {
    let password = "";
    const querySnapshot = await getDocs(collection(db, "USUARIOS"));
    for (const doc of querySnapshot.docs) {
      if (doc.data().CI === evaluador_seleccionado.CI) {
        password = doc.data().CONTRASENA;
      }
    }
    return password;
  }
</script>

{#if cargado}
  <!-- svelte-ignore a11y-missing-attribute -->
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>ADMINISTRADOR</title>
      <link rel="icon" href="/favicon.png" type="image/png" />
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
    </head>
    <body>
      <div class="flex justify-center bg-green-900">
        <img src="logo.png" alt="Logo COMTA" class="w-1/2" />
      </div>
      <div class="flex justify-end">
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
          onclick="window.location.href = '/ayuda/administrar'"
        >
          Ayuda
        </button>
        <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        on:click={cerrarSesion}
      >
        Cerrar Sesión
      </button>
      </div>
      <br /><br /><br />
      <div class="w-3/10 mx-auto text-center text-green-800">
        <h1 class="text-4xl font-bold border-b-2 border-gray-500 pb-2">
          EVALUADORES
        </h1>
        <div class="flex">
          <h2 class="text-2xl font-bold pb-2 text-left mt-4">Buscador:</h2>
          <input
            id="buscador_evaluadores_input"
            type="text"
            value=""
            on:input={(event) => buscarEvaluadoresPrincipal()}
            class="text-base border rounded border-gray-500 py-1 px-2 mt-2 hover:bg-gray-200 text-left"
          />
        </div>
        <ul class="mt-8 max-h-80 overflow-y-auto">
          {#each evaluadores_pantalla_principal as evaluador}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li
              class="text-base border rounded border-gray-500 py-1 px-2 mt-2 hover:bg-gray-200 text-left"
              on:click={seleccionarEvaluador}
            >
              <pre class="grid grid-cols-2 grid-gap-4">
                <span class="text-left" style="pointer-events: none;"
                  >NOMBRE: {evaluador.NOMBRE}</span
                >
                <span class="text-left">IDENTIFICADOR: {evaluador.CI}</span>
              </pre>
            </li>
          {/each}
        </ul>

        <br /><br /><br />
      </div>

      <div class="w-3/10 mx-auto text-center text-green-800">
        <h1 class="text-4xl font-bold border-b-2 border-gray-500 pb-2">
          EMPLEADOS
        </h1>
        <div class="flex">
          <h2 class="text-2xl font-bold pb-2 text-left mt-4">Buscador:</h2>
          <input
            id="buscador_empleados_input"
            type="text"
            value=""
            on:input={(event) => buscarEmpleadosPrincipal()}
            class="text-base border rounded border-gray-500 py-1 px-2 mt-2 hover:bg-gray-200 text-left"
          />
        </div>

        <ul class="mt-8 max-h-80 overflow-y-auto">
          {#each empleados_pantalla_principal as empleado}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li
              class="text-base border rounded border-gray-500 py-1 px-2 mt-2 hover:bg-gray-200 text-left"
              on:click={seleccionarEmpleado}
            >
              <pre class="grid grid-cols-3 grid-gap-4">
                <span class="text-left" style="pointer-events: none;"
                  >NOMBRE: {empleado.NOMBRE}</span
                >
                <span class="text-left" style="pointer-events: none;"
                  >SECTOR: {empleado.SECTOR}</span
                >
                <span class="text-left" style="pointer-events: none;"
                  >IDENTIFICADOR: {empleado.CI}</span
                >
              </pre>
            </li>
          {/each}
        </ul>
        <br />
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
          on:click={openModalNuevoEmpleado}>Nuevo Empleado</button
        >
      </div>

      <div
        id="modalNuevoEmpleado"
        class="modal hidden fixed z-10 inset-0 overflow-y-auto"
      >
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-white rounded-lg p-8">
            <!-- Contenido del modal -->
            <h2 class="text-2xl font-bold mb-4">Agregar Nuevo Empleado</h2>

            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="block mb-2">Nombre:</label>
            <input
              type="text"
              class="w-full p-2 border border-gray-400 rounded"
              bind:value={nombreNuevoEmpleado}
            />

            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="block mb-2">SECTOR:</label>
            <input
              type="text"
              class="w-full p-2 border border-gray-400 rounded"
              bind:value={sectorNuevoEmpleado}
            />

            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="block mb-2">IDENTIFICADOR:</label>
            <input
              type="text"
              class="w-full p-2 border border-gray-400 rounded"
              bind:value={identificadorNuevoEmpleado}
            />

            <!-- Aquí puedes agregar los campos y elementos del formulario para agregar un nuevo empleado -->
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
              on:click={nuevoEmpleado}>Agregar</button
            >
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
              on:click={closeModalNuevoEmpleado}>Cerrar</button
            >
          </div>
        </div>
      </div>

      <div
        id="modalEditarEmpleado"
        class="modal hidden fixed z-10 inset-0 overflow-y-auto"
      >
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-white rounded-lg p-8">
            <h2 class="text-2xl font-bold mb-4">EDITAR DATOS</h2>
            <br />

            <label for="" class="block mb-2 text-lg">Nombre</label>
            <input
              type="text"
              class="w-full p-2 border border-gray-400 rounded"
              bind:value={nombreEditarEmpleado}
            />

            <label for="" class="block mb-2 text-lg">SECTOR</label>
            <input
              type="text"
              class="w-full p-2 border border-gray-400 rounded"
              bind:value={sectorEditarEmpleado}
            />

            <label for="" class="block mb-2 text-lg">IDENTIFICADOR</label>
            <input
              type="text"
              class="w-full p-2 border border-gray-400 rounded"
              bind:value={identificadorEditarEmpleado}
            />

            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
              on:click={guardarCambiosEditarEmpleado}
            >
              Guardar Cambios
            </button>

            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
              on:click={closeModalEditarEmpleado}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      <div
        id="modalEvaluadorSeleccionado"
        class="modal hidden fixed z-10 inset-0 overflow-y-auto"
      >
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-white rounded-lg p-8">
            <div class="flex items-center">
              <h2
                id="tituloModalEvaluador"
                class="text-2xl font-bold mb-4 mr-4"
              >
                EVALUADOR
              </h2>
              <!-- svelte-ignore a11y-missing-content -->
              <h3
                id="password_selected"
                class="text-md font-bold text-green-900"
              ></h3>
            </div>
            <br />

            <div class="flex mb-4">
              <h3 class="text-xl font-bold text-green-900">Buscador:</h3>
              <!-- Aplicar el color verde oscuro al título -->
              <input
                type="text"
                id="buscador_no_asignados_evaluador"
                on:input={(event) => buscarEmpleadosEvaluador()}
                class="text-sm border rounded border-gray-500 hover:bg-gray-200"
              />
            </div>
            <div class="flex justify-between max-h-52 overflow-y-auto">
              <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <div class="flex">
                <div class="p-4 rounded max-h-30 overflow-y-auto">
                  <div class="text-center">
                    <h3 class="text-xl font-bold mb-2 text-green-900">
                      NO ASIGNADOS
                    </h3>
                  </div>
                  <ul id="lista1" class="mr-8">
                    {#each empleados_no_asignados_mostrar as empleado}
                      <li
                        on:click={(event) => seleccionarElemento(event)}
                        class="py-2 cursor-pointer hover:bg-gray-300"
                      >
                        {empleado.CI +
                          "_" +
                          empleado.NOMBRE +
                          "_" +
                          empleado.SECTOR}
                      </li>
                    {/each}
                  </ul>
                </div>

                <div class="flex items-center">
                  <button
                    class="bg-gray-200 p-2 rounded-l"
                    on:click={() => fromList2To1()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    class="bg-gray-200 p-2 rounded-r"
                    on:click={() => fromList1To2()}
                  >
                    <!-- Icono de flecha derecha -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                <div class="flex">
                  <div class="p-4 rounded max-h-auto overflow-y-auto">
                    <div>
                      <h3 class="text-xl font-bold mb-2 text-green-900">
                        ASIGNADOS
                      </h3>
                    </div>
                    <ul id="lista2" class="ml-8">
                      {#each empleados_asignados as asignado}
                        <li
                          on:click={(event) => seleccionarElemento(event)}
                          class="py-2 cursor-pointer hover:bg-gray-300"
                        >
                          {asignado.NOMBRE}
                        </li>
                      {/each}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div></div>

            <br /><br />

            <div class="flex justify-center space-x-4">
              <button
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
                on:click={eliminarEvaluador}>Eliminar evaluador</button
              >
              <button
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
                on:click={guardarCambiosEvaluador}>Guardar cambios</button
              >
              <button
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
                on:click={closeModalEvaluador}>Cerrar</button
              >
            </div>
            <div id="modalEv" class="text-center"></div>
          </div>
        </div>
      </div>

      <div
        id="modalEmpleadoSeleccionado"
        class="modal hidden fixed z-10 inset-0 overflow-y-auto"
      >
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-white rounded-lg p-8">
            <!-- svelte-ignore a11y-missing-content -->
            <h2 id="tituloModalEmpleado" class="text-2xl font-bold mb-4"></h2>
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
              on:click={eliminarEmpleado}>Eliminar empleado</button
            >

            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
              on:click={openModalEditarEmpleado}>Editar datos</button
            >

            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
              on:click={convertirEvaluador}>Convertir a evaluador</button
            >
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
              on:click={closeModalEmpleado}>Cerrar</button
            >
          </div>
        </div>
      </div>
    </body>
  </html>
{/if}
