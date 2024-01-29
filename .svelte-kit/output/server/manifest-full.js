export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["logo.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.uzoGVAa_.js","app":"_app/immutable/entry/app.O1kFD_vv.js","imports":["_app/immutable/entry/start.uzoGVAa_.js","_app/immutable/chunks/scheduler.sMD3e7PM.js","_app/immutable/chunks/singletons.AnexqP55.js","_app/immutable/entry/app.O1kFD_vv.js","_app/immutable/chunks/scheduler.sMD3e7PM.js","_app/immutable/chunks/index.eGdn8Yx4.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/administrar",
				pattern: /^\/administrar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/evaluar",
				pattern: /^\/evaluar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
