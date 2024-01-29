

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.i74hS4h8.js","_app/immutable/chunks/scheduler.sMD3e7PM.js","_app/immutable/chunks/index.eGdn8Yx4.js","_app/immutable/chunks/singletons.AnexqP55.js"];
export const stylesheets = [];
export const fonts = [];
