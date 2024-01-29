<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ayuda</title>
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <style>
      #sidebar {
        width: 200px;
        float: left;
        padding: 10px;
        background-color: #f2f2f2;
      }
      #content {
        margin-left: 220px;
      }
      h2 {
        margin-top: 0;
      }
    </style>
  </head>
  <div class="flex justify-center bg-green-900 top-0">
    <img src="logo.png" alt="Logo COMTA" class="w-1/2" />
  </div>
  <body>
    <div class="bg-green-800 w-screen h-20 flex items-center justify-center">
      <h1 class="text-white text-4xl">AYUDA</h1>
    </div>
    <div
      class="w-full max-w-md mx-auto mt-10 p-4 bg-green-900 rounded-lg shadow-md"
    >
      <p class="text-white text-lg">
        En esta página se encuentra la información referente a inicio de sesión,
        luego cada perfil podrá acceder a la información necesaria para conocer
        todas las funcionalidades disponibles.
      </p>
    </div>

    <div id="sidebar" class="bg-gray-200 p-4 w-64">
      <h2 class="text-xl font-bold mb-4">TABLA DE CONTENIDO:</h2>
      <ul>
        <li>
          <a
            href="#¿Para que sirve esta página?"
            class="block py-1 hover:bg-gray-300">¿Para que sirve esta página?</a
          >
        </li>
        <li>
          <a href="#¿Cómo ingresar?" class="block py-1 hover:bg-gray-300"
            >¿Cómo ingresar?</a
          >
        </li>
      </ul>
    </div>
    <div id="content">
      <h2
        id="¿Para que sirve esta página?"
        class="text-2xl font-bold mt-4 mb-2"
      >
        ¿Para que sirve esta página?
      </h2>
      <p>
        Esta web de diseñó como aplicación de evaluación. Pretende brindar un entorno amigable para los evaluadores y gestores.
        Con esta aplicación podrás crear evaluaciones, asignar evaluadores y gestionar las evaluaciones.
        Cada evaluador puede ingresar con las credenciales asignadas y completar todas las evaluaciones que se las ha asigna.
      </p>
      <br>
      <h2 id="¿Cómo ingresar?" class="text-2xl font-bold mt-4 mb-2">
        ¿Cómo ingresar?
      </h2>
      <p>
        Para ingresar al sistema, según el rol que se le ha asignado, deberá ingresar sus credenciales en la pantalla anterior.
        Si se ha olvidado de sus credenciales o cree que hay algun error en la información, contacte con el administrador.
        <br><br>
        <img class="mx-20%" src="/ayuda/pantalla_login.png" alt="Descripción de la imagen">      </p>
    </div>
  </body>
</html>
