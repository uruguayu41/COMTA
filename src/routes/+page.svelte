<script>
  import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
  } from "firebase/firestore";
  import { firebaseApp } from "./../firebase";

  const db = getFirestore(firebaseApp);
  let username = "";
  let password = "";

  async function verificarLogin() {
    const usersRef = collection(db, "USUARIOS");
    const q = query(
      usersRef,
      where("USUARIO", "==", username),
      where("CONTRASENA", "==", password)
    );
    try {
      const querySnapshot = await getDocs(q);
      let userExists = false;
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        userExists = true;
        document.cookie = "logueado=" + true;
        document.cookie = "id=" + userData.CI;
        document.cookie = "rol=" + userData.ROL;
        localStorage.setItem("isAuthenticated", "true");
        if(userData.ROL == "EVALUADOR"){
          window.location.href = "/evaluar";
        }
        else if (userData.ROL == "ADMINISTRADOR"){
          window.location.href = "/administrar";
        }
      });

      if (!userExists) {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
</script>



<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ingreso Evaluuadores COMTA</title>
    <link rel="icon" href="/favicon.png" type="image/png">
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <div class="flex justify-center bg-green-900">
    <img src="logo.png" alt="Logo COMTA" class="w-1/2">
  </div>
  <body>
    <nav
      class="bg-[#FAA21A] h-[80x] w-full flex justify-between items-center px-4"
    >
      <h1 class="text-white text-5xl font-extrabold">BIENVENIDOS</h1>
    </nav>
    <main
      class="flex flex-col items-center justify-center h-[calc(100vh-80px)]"
    >
      <div class="w-1/2 flex flex-col justify-center items-center mb-6">
        <div class="flex flex-col space-y-4 mb-6">
          <input
            class="form-input px-4 py-2 w-full max-w-xs border rounded-md bg-white text-green-600"
            type="text"
            placeholder="Usuario"
            bind:value={username}
          />
          <input
            class="form-input px-4 py-2 w-full max-w-xs border rounded-md bg-white text-green-600"
            type="password"
            placeholder="Contraseña"
            bind:value={password}
          />
        </div><button
          class="bg-green-600 text-white text-25 font-semibold px-6 py-3 rounded-md mb-4"
          on:click={verificarLogin}
        >
          INICIAR SESIÓN
        </button>
      </div>
    </main><script
      src="https://cdn.tailwindcss.com/2.2.19/tailwind.min.js"
    ></script>
  </body>
</html>
