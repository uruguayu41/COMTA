

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/administrar/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.o5dWmeL4.js","_app/immutable/chunks/scheduler.sMD3e7PM.js","_app/immutable/chunks/index.eGdn8Yx4.js"];
export const stylesheets = [];
export const fonts = [];
