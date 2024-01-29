import { c as create_ssr_component, f as add_attribute } from "../../chunks/ssr.js";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDZeNbW8zWy8grOJUQ0IcZBcGybzscn0Y8",
  authDomain: "comta-e86b2.firebaseapp.com",
  projectId: "comta-e86b2",
  storageBucket: "comta-e86b2.appspot.com",
  messagingSenderId: "962441954689",
  appId: "1:962441954689:web:d53c73c095333e7f215480"
};
const firebaseApp = initializeApp(firebaseConfig);
getFirestore(firebaseApp);
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getFirestore(firebaseApp);
  let username = "";
  let password = "";
  return `<html lang="en"><head><meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title data-svelte-h="svelte-16nj6bh">Ingreso Evaluuadores COMTA</title> <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"></head> <body><nav class="bg-[#FAA21A] h-[80x] w-full flex justify-between items-center px-4"><h1 class="text-white text-5xl font-extrabold" data-svelte-h="svelte-f9z8gs">BIENVENIDOS</h1></nav> <img src="logo.png" alt="Logo COMTA"> <main class="flex flex-col items-center justify-center h-[calc(100vh-80px)]"><div class="w-1/2 flex flex-col justify-center items-center mb-6"><div class="flex flex-col space-y-4 mb-6"><input class="form-input px-4 py-2 w-full max-w-xs border rounded-md bg-white text-green-600" type="text" placeholder="Usuario"${add_attribute("value", username, 0)}> <input class="form-input px-4 py-2 w-full max-w-xs border rounded-md bg-white text-green-600" type="password" placeholder="Contraseña"${add_attribute("value", password, 0)}> </div><button class="bg-green-600 text-white text-25 font-semibold px-6 py-3 rounded-md mb-4" data-svelte-h="svelte-1wpg7vl">INICIAR SESIÓN</button></div> </main><script src="https://cdn.tailwindcss.com/2.2.19/tailwind.min.js" data-svelte-h="svelte-hfmmt4"><\/script></body></html>`;
});
export {
  Page as default
};
