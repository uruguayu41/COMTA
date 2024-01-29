

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.fwPWXepw.js","_app/immutable/chunks/scheduler.sMD3e7PM.js","_app/immutable/chunks/index.eGdn8Yx4.js"];
export const stylesheets = [];
export const fonts = [];
