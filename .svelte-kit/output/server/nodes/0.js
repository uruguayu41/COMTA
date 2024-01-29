

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.elOm3lj3.js","_app/immutable/chunks/scheduler.sMD3e7PM.js","_app/immutable/chunks/index.eGdn8Yx4.js"];
export const stylesheets = [];
export const fonts = [];
