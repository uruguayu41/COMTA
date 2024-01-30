<script>
  import { onMount } from "svelte";
  let cargado = false; // variable que se cambia cuando se cargan los datos

  onMount(async () => {
    const logueado = document.cookie.includes("logueado=true");
    const rol = document.cookie.includes("rol=EVALUADOR");
    if (logueado && rol) {
      cargado = true;
    }
  });
</script>

{#if cargado}
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Ayuda EVALUADOR</title>
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
      <img src="/logo.png" alt="Logo COMTA" class="w-1/2" />
    </div>
    <body>
      <div class="bg-green-800 w-screen h-20 flex items-center justify-center">
        <h1 class="text-white text-4xl">AYUDA EVALUADOR</h1>
      </div>
      <div
        class="w-full max-w-md mx-auto mt-10 p-4 bg-green-900 rounded-lg shadow-md"
      >
        <p class="text-white text-lg">
          En esta página se encuentra la información referente a las
          funcionalidades que se pueden realizar como evaluador del sistema de
          evaluaciones COMTA.
        </p>
      </div>

      <div id="sidebar" class="bg-gray-200 p-4 w-64">
        <h2 class="text-xl font-bold mb-4">TABLA DE CONTENIDO:</h2>
        <ul>
          <li>
            <a href="#Pantalla inicial" class="block py-1 hover:bg-gray-300"
              >Pantalla inicial</a
            >
          </li>
          <li>
            <a
              href="#Seleccionar persona a evaluar"
              class="block py-1 hover:bg-gray-300"
              >Seleccionar persona a evaluar</a
            >
          </li>
          <li>
            <a href="#Completar evaluación" class="block py-1 hover:bg-gray-300"
              >Completar evaluación</a
            >
          </li>
        </ul>
      </div>
      <div id="content">
        <h2 id="Pantalla Inicial" class="text-2xl font-bold mt-4 mb-2">
          Pantalla inicial
        </h2>
        <p>
          Al ingresar con su usuario y contraseña, visualizará la siguiente
          pantalla:
          <img src="/ayuda/pantalla_inicial_evaluador.png" alt="" />
          Aquí verá su pantalla como evaluador, deberá completar las evaluaciones
          que tenga pendientes seleccionando a la persona evaluada y rellenando todos
          los campos en la tabla La tabla está dividida en secciones, para cada sección
          deberá responder a la consigna correspondiente en cada fila, asignando
          un puntaje en la casilla que corresponda (una sola evaluación por fila),
          cada columna indica el puntaje que puede asignar por casilla, deberá elegir
          el concepto que más se adapte a la consigna y elegir entre los puntos permitidos.
          También verá al final de cada sección de la tabla los puntos parciales
          que ha asignado en esa sección. Si al finalizar la evaluación se le ha
          olvidado evaluar algún concepto, se le mostrará un mensaje indicando en
          que parte se le ha olvidado completar una ponderación y lo llevará hasta
          esa fila. De igual forma, si ingresa valores inadecuados para la alguna
          casilla, se le indicará que casilla está incorrecta y se lo llevará hasta
          ella.
        </p>
        <br />
        <h2
          id="Seleccionar persona a evaluar"
          class="text-2xl font-bold mt-4 mb-2"
        >
          Seleccionar persona a evaluar
        </h2>
        <p>
          Al inicio de la página, verá un menú desplegable, al lado de
          "Seleccione una persona a evaluar". Deberá presionar el menú
          desplegable y se mostrarán todas las personas que tiene pendinetes de
          evaluar. Deberá seleccionar que persona va a evaluar en este momento,
          luego de seleccionada la persona, se rellenarán automaticamente los
          campos de información:
          <br />
          <img
            class="mx-20%"
            src="/ayuda/seleccionar_evaluado.png"
            alt="Descripción de la imagen"
          />
          <br>
          Luego de seleccionar a la persona a evaluar, se completarán automáticamente los datos:
          <img src="/ayuda/autocompletado.png" alt="">
        </p>
        <h2 id="Completar evaluación" class="text-2xl font-bold mt-4 mb-2">
          Completar evaluación
        </h2>
        <p>
          Deberá rellenar la tabla completamente, (no olvidar que solo debe completar un campo por fila en la columna que aplique el concepto a su criterio, asignandu un puntaje en el intervalo).
          Al final de la tabla podrá visualizar los puntos totales asignados y los puntos promedio que se le ha asignado al evaluado.
          <img src="/ayuda/puntos.png" alt="">
          <br>
          En la parte final de la página tendrá secciones que puede rellenar o no según sus necesidades, podrá escribir lo que desee en las secciones objetivos y comentarios. 
          Al finalizar la evaluación, deberá presionar el botón "Guardar evaluación" para guardar la evaluación completada actualmente. Por favor, espere a que se recargue la página una vez pulsado el botón.
          <img src="/ayuda/final.png" alt="">
          <br /><br />
        </p>
      </div>
    </body>
  </html>
{/if}
