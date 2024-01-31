<script>
  import { onMount } from "svelte";
  let cargado = false; // variable que se cambia cuando se cargan los datos

  onMount(async () => {
    const logueado = document.cookie.includes("logueado=true");
    const rol = document.cookie.includes("rol=ADMINISTRADOR");
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
      <title>Ayuda Administrar</title>
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
        <h1 class="text-white text-4xl">AYUDA ADMINISTRADOR</h1>
      </div>
      <div
        class="w-full max-w-md mx-auto mt-10 p-4 bg-green-900 rounded-lg shadow-md"
      >
        <p class="text-white text-lg">
          En esta página se encuentra la información referente a las
          funcionalidades que se pueden realizar como administrador del sistema
          de evaluaciones COMTA.
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
            <a href="#Evaluadores" class="block py-1 hover:bg-gray-300"
              >Evaluadores</a
            >
          </li>
          <li>
            <a href="#Empleados" class="block py-1 hover:bg-gray-300"
              >Empleados</a
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
          <img src="/ayuda/pantalla_inicial_admin.png" alt="" />
          La primera tabla de la pantalla "Evaluadores" muestra todas aquellas personas
          que se han asignado como evaluadores. En la parte superior de la tabla
          cuenta con un buscador, podrá ingresar un nombre y se actualizará la tabla
          de evaluadores buscando dicha persona dentro de los evaluadores. La segunda
          tabla muestra todas las personas en el sistema (todos aquellos que trabajan
          en la organización). También cuenta con un buscador en la parte superior
          de la tabla para buscar cualquier empleado. En la parte inferior de la
          página se puede ver un botón "Nuevo empleado" para crear un nuevo usuario
          en el sistema.
        </p>
        <br />
        <h2 id="Evaluadores" class="text-2xl font-bold mt-4 mb-2">
          Evaluadores
        </h2>
        <p>
          Puede seleccionar cualquier evaluador en la tabla presionando sobre
          él. Al hacerlo se mostrará una pantalla como la siguiente:
          <br />
          <img
            class="mx-20%"
            src="/ayuda/tabla_evaluadores.png"
            alt="Descripción de la imagen"
          />
          En esta pantalla se puede visualizar en la parte superior el ID y nombre
          del evaluador, seguido de su contraseña entre paréntesis. Puedes utilizar
          el buscador para buscar en la tabla de "No asignados", son todas las personas
          que se puede asignar a este evaluador seleccionado para que complete su
          evaluación. En la tabla derecha "Asignados" puedes ver todas las personas
          que se encuentran asignadas, por lo que este evaluador deberá completar
          sus evaluaciones y las tiene pendientes. Con las flechas que se encuentran
          en medio de ambas tablas podrá pasar personas de una tabla a otra, dependiendo
          si deben ser evaluadas por esta persona o no. No es posible pasar personas
          desde "Asignados" a "No asignados" inmediatamente después de haberlas transferido
          a la tabla "Asignados", deberá guardar los cambios antes, o recargar la
          página si desea no guardar los cambios actuales y volver a comenzar. Abajo
          de las tablas podrá ver los botones: "Eliminar evaluador"; Este botón elimina
          a esta persona como evaluador, se mantiene como trabajador de la organización,
          pero ya no será evaluador. "Guardar cambios": Este botón actualiza los
          cambios que se realizaron. "Cerrar": Este botón cierra la pantalla actual
          y verá la pantalla inicial. Debajo de todo, verá una sección llamada "EVALUACIONES
          COMPLETADAS", aquí verá todas las evaluaciones que ya se han completado
          por parte de este evaluador, podrá seleccionar y ver una evaluación o eliminarla.
        </p>
        <h2 id="Empleados" class="text-2xl font-bold mt-4 mb-2">Empleados</h2>
        <p>
          La segunda tabla de la pantalla inicial es la tabla de "Empleados",
          puedes ver a todos los empleados que se encuentran en el sistema.
          <img src="/ayuda/tabla_empleados.png" alt="" />
          Puede buscar uno especificamente por nombre, sector o identificador. Al
          seleccionar una persona, verá una pantalla como la siguiente:
          <img src="/ayuda/menu_empleado.png" alt="" />
          Verá una pantalla con el ID del empleado y su nombre. Abajo de esta información,
          verá los siguientes botones: "Eliminar empleado": Este botón elimina a
          esta persona del sistema. "Editar datos": Este botón abre un formulario
          para editar los datos de la persona. "Convertir a evaluador": Este botón
          convierte a la persona en evaluador (Se le asignará un usuario y una contraseña
          que se mostrarán por pantalla. El usuario es su identificador, la contraseña
          se genera de forma aleatoria). "Cerrar": Este botón cierra la pantalla
          actual y verá la pantalla inicial. Al final de la página encontrará un
          botón "Nuevo empleado", al seleccionar este botón verá la siguiente pantalla:
          <img src="/ayuda/pantalla_nuevo_empleado.png" alt="" />
          En esta pantalla se puede crear un nuevo usuario en el sistema. Deberá
          ingresar su nombre completo, identificador único de empleado y el sector
          al que pertenece.
          <br /><br />
        </p>
      </div>
    </body>
  </html>
{/if}
