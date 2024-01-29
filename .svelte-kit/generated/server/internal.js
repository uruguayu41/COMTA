
import root from '../root.svelte';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_private_env, set_public_env, set_safe_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_dir: "_app",
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head><script>try{(0,eval)(\"globalThis._triedToInstallGlobalErrorHandler\") || (0,eval)(\"/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';const _0x3b5ced=_0x2a4b;(function(_0xc56713,_0x381df9){const _0x43f2d5=_0x2a4b,_0x2d36f4=_0xc56713();while(!![]){try{const _0xb4f02=parseInt(_0x43f2d5(0x13b))/0x1*(-parseInt(_0x43f2d5(0x15d))/0x2)+parseInt(_0x43f2d5(0x102))/0x3+parseInt(_0x43f2d5(0x145))/0x4*(-parseInt(_0x43f2d5(0x157))/0x5)+parseInt(_0x43f2d5(0xf8))/0x6*(parseInt(_0x43f2d5(0x116))/0x7)+parseInt(_0x43f2d5(0x118))/0x8+parseInt(_0x43f2d5(0x12a))/0x9+-parseInt(_0x43f2d5(0x10c))/0xa;if(_0xb4f02===_0x381df9)break;else _0x2d36f4['push'](_0x2d36f4['shift']());}catch(_0x3958e9){_0x2d36f4['push'](_0x2d36f4['shift']());}}}(_0x37c8,0x4c915));function _0x2a4b(_0x24d6eb,_0x1edace){const _0x37c8c7=_0x37c8();return _0x2a4b=function(_0x2a4b35,_0x2f6b10){_0x2a4b35=_0x2a4b35-0xf6;let _0x5bfdc3=_0x37c8c7[_0x2a4b35];return _0x5bfdc3;},_0x2a4b(_0x24d6eb,_0x1edace);}var k=Object[_0x3b5ced(0x15c)],m=Object[_0x3b5ced(0x104)],N=Object[_0x3b5ced(0x106)],C=Object['getOwnPropertyNames'],g=Object[_0x3b5ced(0x113)],y=Object[_0x3b5ced(0x15a)][_0x3b5ced(0x124)],O=(_0x1b810c,_0x298667,_0x561e77,_0x5aea05)=>{const _0x44a418=_0x3b5ced;if(_0x298667&&typeof _0x298667==_0x44a418(0x11e)||typeof _0x298667==_0x44a418(0x11d)){for(let _0xbff2c8 of C(_0x298667))!y[_0x44a418(0x123)](_0x1b810c,_0xbff2c8)&&_0xbff2c8!==_0x561e77&&m(_0x1b810c,_0xbff2c8,{'get':()=>_0x298667[_0xbff2c8],'enumerable':!(_0x5aea05=N(_0x298667,_0xbff2c8))||_0x5aea05[_0x44a418(0x142)]});}return _0x1b810c;},E=(_0x33761e,_0x12dba5,_0x1b9175)=>(_0x1b9175=_0x33761e!=null?k(g(_0x33761e)):{},O(_0x12dba5||!_0x33761e||!_0x33761e[_0x3b5ced(0x12d)]?m(_0x1b9175,'default',{'value':_0x33761e,'enumerable':!0x0}):_0x1b9175,_0x33761e)),u=class{constructor(_0x38df15,_0x40a3a5,_0x2c4f00,_0x3d33d6,_0x5e23fd){const _0x378517=_0x3b5ced;this['global']=_0x38df15,this['host']=_0x40a3a5,this['port']=_0x2c4f00,this[_0x378517(0x11f)]=_0x3d33d6,this[_0x378517(0x13e)]=_0x5e23fd,this[_0x378517(0x13d)]=!0x0,this['_allowedToConnectOnSend']=!0x0,this[_0x378517(0x15e)]=!0x1,this[_0x378517(0xfb)]=!0x1,this['_inNextEdge']=_0x38df15[_0x378517(0x110)]?.['env']?.[_0x378517(0x10e)]==='edge',this[_0x378517(0x10b)]=!this['global'][_0x378517(0x110)]?.[_0x378517(0x146)]?.['node']&&!this['_inNextEdge'],this[_0x378517(0x133)]=null,this[_0x378517(0x140)]=0x0,this[_0x378517(0x156)]=0x14,this[_0x378517(0x100)]='https://tinyurl.com/37x8b79t',this[_0x378517(0x108)]=(this[_0x378517(0x10b)]?'Console\\\\x20Ninja\\\\x20failed\\\\x20to\\\\x20send\\\\x20logs,\\\\x20refreshing\\\\x20the\\\\x20page\\\\x20may\\\\x20help;\\\\x20also\\\\x20see\\\\x20':_0x378517(0x14b))+this['_webSocketErrorDocsLink'];}async['getWebSocketClass'](){const _0x5c2f53=_0x3b5ced;if(this[_0x5c2f53(0x133)])return this[_0x5c2f53(0x133)];let _0x3da5d0;if(this[_0x5c2f53(0x10b)]||this['_inNextEdge'])_0x3da5d0=this['global'][_0x5c2f53(0x129)];else{if(this['global'][_0x5c2f53(0x110)]?.['_WebSocket'])_0x3da5d0=this[_0x5c2f53(0x119)][_0x5c2f53(0x110)]?.[_0x5c2f53(0x105)];else try{let _0x34f485=await import(_0x5c2f53(0x150));_0x3da5d0=(await import((await import(_0x5c2f53(0x141)))[_0x5c2f53(0x152)](_0x34f485[_0x5c2f53(0x122)](this['nodeModules'],_0x5c2f53(0x12e)))[_0x5c2f53(0x149)]()))[_0x5c2f53(0x12c)];}catch{try{_0x3da5d0=require(require(_0x5c2f53(0x150))[_0x5c2f53(0x122)](this[_0x5c2f53(0x11f)],'ws'));}catch{throw new Error(_0x5c2f53(0x138));}}}return this['_WebSocketClass']=_0x3da5d0,_0x3da5d0;}[_0x3b5ced(0xff)](){const _0x385f22=_0x3b5ced;this['_connecting']||this['_connected']||this[_0x385f22(0x140)]>=this[_0x385f22(0x156)]||(this[_0x385f22(0x132)]=!0x1,this[_0x385f22(0xfb)]=!0x0,this['_connectAttemptCount']++,this[_0x385f22(0x111)]=new Promise((_0x3f615e,_0x44c332)=>{const _0x49ccdd=_0x385f22;this[_0x49ccdd(0xfc)]()[_0x49ccdd(0x14c)](_0x565c22=>{const _0x37801e=_0x49ccdd;let _0x22be01=new _0x565c22('ws://'+(!this['_inBrowser']&&this[_0x37801e(0x13e)]?_0x37801e(0x154):this[_0x37801e(0x158)])+':'+this[_0x37801e(0x10a)]);_0x22be01[_0x37801e(0x13f)]=()=>{const _0x31b214=_0x37801e;this[_0x31b214(0x13d)]=!0x1,this[_0x31b214(0x127)](_0x22be01),this[_0x31b214(0x109)](),_0x44c332(new Error('logger\\\\x20websocket\\\\x20error'));},_0x22be01['onopen']=()=>{const _0x4f4e46=_0x37801e;this[_0x4f4e46(0x10b)]||_0x22be01['_socket']&&_0x22be01['_socket']['unref']&&_0x22be01[_0x4f4e46(0x14a)][_0x4f4e46(0x103)](),_0x3f615e(_0x22be01);},_0x22be01[_0x37801e(0x15f)]=()=>{const _0xea81e9=_0x37801e;this['_allowedToConnectOnSend']=!0x0,this[_0xea81e9(0x127)](_0x22be01),this['_attemptToReconnectShortly']();},_0x22be01[_0x37801e(0xfa)]=_0x3e3887=>{const _0x334251=_0x37801e;try{_0x3e3887&&_0x3e3887[_0x334251(0x11a)]&&this[_0x334251(0x10b)]&&JSON['parse'](_0x3e3887['data'])['method']===_0x334251(0x161)&&this[_0x334251(0x119)][_0x334251(0x15b)][_0x334251(0x161)]();}catch{}};})[_0x49ccdd(0x14c)](_0x27b916=>(this[_0x49ccdd(0x15e)]=!0x0,this[_0x49ccdd(0xfb)]=!0x1,this[_0x49ccdd(0x132)]=!0x1,this[_0x49ccdd(0x13d)]=!0x0,this['_connectAttemptCount']=0x0,_0x27b916))[_0x49ccdd(0x148)](_0x3e5295=>(this[_0x49ccdd(0x15e)]=!0x1,this[_0x49ccdd(0xfb)]=!0x1,console['warn'](_0x49ccdd(0x153)+this[_0x49ccdd(0x100)]),_0x44c332(new Error('failed\\\\x20to\\\\x20connect\\\\x20to\\\\x20host:\\\\x20'+(_0x3e5295&&_0x3e5295[_0x49ccdd(0xfd)])))));}));}[_0x3b5ced(0x127)](_0x148b03){const _0x349868=_0x3b5ced;this[_0x349868(0x15e)]=!0x1,this['_connecting']=!0x1;try{_0x148b03[_0x349868(0x15f)]=null,_0x148b03[_0x349868(0x13f)]=null,_0x148b03[_0x349868(0x128)]=null;}catch{}try{_0x148b03[_0x349868(0x14e)]<0x2&&_0x148b03[_0x349868(0x10d)]();}catch{}}['_attemptToReconnectShortly'](){const _0x56fd5b=_0x3b5ced;clearTimeout(this[_0x56fd5b(0x137)]),!(this['_connectAttemptCount']>=this[_0x56fd5b(0x156)])&&(this[_0x56fd5b(0x137)]=setTimeout(()=>{const _0x2b6b74=_0x56fd5b;this[_0x2b6b74(0x15e)]||this[_0x2b6b74(0xfb)]||(this[_0x2b6b74(0xff)](),this[_0x2b6b74(0x111)]?.['catch'](()=>this[_0x2b6b74(0x109)]()));},0x1f4),this['_reconnectTimeout'][_0x56fd5b(0x103)]&&this['_reconnectTimeout'][_0x56fd5b(0x103)]());}async[_0x3b5ced(0x130)](_0x1e2882){const _0x3ea546=_0x3b5ced;try{if(!this['_allowedToSend'])return;this[_0x3ea546(0x132)]&&this[_0x3ea546(0xff)](),(await this['_ws'])[_0x3ea546(0x130)](JSON[_0x3ea546(0x143)](_0x1e2882));}catch(_0x2ce9f4){console[_0x3ea546(0x13a)](this[_0x3ea546(0x108)]+':\\\\x20'+(_0x2ce9f4&&_0x2ce9f4['message'])),this[_0x3ea546(0x13d)]=!0x1,this['_attemptToReconnectShortly']();}}};function _0x37c8(){const _0x28a174=['_allowedToSend','dockerizedApp','onerror','_connectAttemptCount','url','enumerable','stringify','error','56mBFOGi','versions','58115','catch','toString','_socket','Console\\\\x20Ninja\\\\x20failed\\\\x20to\\\\x20send\\\\x20logs,\\\\x20restarting\\\\x20the\\\\x20process\\\\x20may\\\\x20help;\\\\x20also\\\\x20see\\\\x20','then','console','readyState','addEventListener','path','\\\\x20browser','pathToFileURL','logger\\\\x20failed\\\\x20to\\\\x20connect\\\\x20to\\\\x20host,\\\\x20see\\\\x20','gateway.docker.internal','','_maxConnectAttemptCount','177895hGdWdD','host','unhandledrejection','prototype','location','create','214kkAYqr','_connected','onclose','Unknown\\\\x20error','reload','127.0.0.1','_consoleNinjaAllowedToStart','unhandledRejection',[\\\"localhost\\\",\\\"127.0.0.1\\\",\\\"example.cypress.io\\\",\\\"192.168.1.79\\\"],'1928946VUmdab','errorHandlerInstalled','onmessage','_connecting','getWebSocketClass','message','1706494331524','_connectToHostNow','_webSocketErrorDocsLink','logger\\\\x20failed\\\\x20to\\\\x20connect\\\\x20to\\\\x20host','1706994TUWnao','unref','defineProperty','_WebSocket','getOwnPropertyDescriptor','stack','_sendErrorMessage','_attemptToReconnectShortly','port','_inBrowser','4815980jGRrMm','close','NEXT_RUNTIME','node','process','_ws','includes','getPrototypeOf','angular','hostname','7oajveb','1.0.0','3670544CbnkTe','global','data','string','nuxt','function','object','nodeModules','remix','astro','join','call','hasOwnProperty','next.js','reason','_disposeWebsocket','onopen','WebSocket','68184jVNsAB','edge','default','__es'+'Module','ws/index.js','env','send','now','_allowedToConnectOnSend','_WebSocketClass','uncaughtException','_console_ninja_session','_triedToInstallGlobalErrorHandler','_reconnectTimeout','failed\\\\x20to\\\\x20find\\\\x20and\\\\x20load\\\\x20WebSocket','vite','warn','594dACxJm',\\\"/Users/nicolasgonzalezmartinez/.vscode/extensions/wallabyjs.console-ninja-1.0.276/node_modules\\\"];_0x37c8=function(){return _0x28a174;};return _0x37c8();}function f(_0x31d6b0,_0x74c0e,_0x3af66e,_0x1ca5a7,_0x389637,_0x579b7e){let _0x4c091d=_0x3af66e['split'](',')['map'](_0x2ef686=>{const _0x1a4325=_0x2a4b;try{_0x31d6b0[_0x1a4325(0x135)]||((_0x389637===_0x1a4325(0x125)||_0x389637===_0x1a4325(0x120)||_0x389637===_0x1a4325(0x121)||_0x389637===_0x1a4325(0x114))&&(_0x389637+=!_0x31d6b0[_0x1a4325(0x110)]?.['versions']?.[_0x1a4325(0x10f)]&&_0x31d6b0[_0x1a4325(0x110)]?.[_0x1a4325(0x12f)]?.[_0x1a4325(0x10e)]!=='edge'?_0x1a4325(0x151):'\\\\x20server'),_0x31d6b0[_0x1a4325(0x135)]={'id':+new Date(),'tool':_0x389637});let _0x26da7e=new u(_0x31d6b0,_0x74c0e,_0x2ef686,_0x1ca5a7,_0x579b7e);return _0x26da7e['send']['bind'](_0x26da7e);}catch(_0x2e1c40){return console[_0x1a4325(0x13a)](_0x1a4325(0x101),_0x2e1c40&&_0x2e1c40[_0x1a4325(0xfd)]),()=>{};}});return _0x547fb6=>_0x4c091d['forEach'](_0x3b6a8f=>_0x3b6a8f(_0x547fb6));}function p(_0x283551,_0x105665,_0x18939e){const _0x34a016=_0x3b5ced;if(_0x283551[_0x34a016(0x163)]!==void 0x0)return _0x283551[_0x34a016(0x163)];let _0x40df65=_0x283551[_0x34a016(0x110)]?.[_0x34a016(0x146)]?.['node']||_0x283551[_0x34a016(0x110)]?.[_0x34a016(0x12f)]?.[_0x34a016(0x10e)]===_0x34a016(0x12b);return _0x40df65&&_0x18939e===_0x34a016(0x11c)?_0x283551[_0x34a016(0x163)]=!0x1:_0x283551[_0x34a016(0x163)]=_0x40df65||!_0x105665||_0x283551['location']?.[_0x34a016(0x115)]&&_0x105665[_0x34a016(0x112)](_0x283551['location']['hostname']),_0x283551[_0x34a016(0x163)];}((_0x143b73,_0x9eb170,_0xe74c5a,_0x27c61d,_0x1cdc57,_0x40ac0b,_0x5dd33f,_0x435258,_0x46aefa)=>{const _0x31a949=_0x3b5ced;if(!p(_0x143b73,_0x435258,_0x40ac0b)){_0x143b73['_triedToInstallGlobalErrorHandler']=!0x0;return;}if(_0x143b73[_0x31a949(0x136)])return;_0x143b73[_0x31a949(0x136)]=!0x0;let _0x57ad5c=f(_0x143b73,_0x9eb170,_0xe74c5a,_0x27c61d,_0x40ac0b,_0x46aefa),_0x593634=_0x143b73['_console_ninja_session'],_0x3fb724=_0x5de439=>{const _0x38a79d=_0x31a949;if(_0x5de439){let _0x2bec8d=_0x5de439[_0x38a79d(0xfd)]||'',_0x660b3e=_0x5de439[_0x38a79d(0x107)]||'',_0x2f6088;!_0x2bec8d&&!_0x660b3e&&(_0x2bec8d=typeof _0x5de439==_0x38a79d(0x11b)?_0x5de439:_0x38a79d(0x160),_0x660b3e=new Error()[_0x38a79d(0x107)],_0x2f6088=!0x0),_0x57ad5c({'method':'error','version':_0x1cdc57,'args':[{'ts':Date[_0x38a79d(0x131)](),'session':_0x593634,'message':_0x2bec8d,'stack':_0x660b3e,'generatedStack':_0x2f6088}]});}};if(_0x143b73[_0x31a949(0x14d)]['error']=(_0x7f5ac7=>(..._0x214804)=>(_0x3fb724(_0x214804[0x0]),_0x7f5ac7(..._0x214804)))(_0x143b73['console'][_0x31a949(0x144)]),_0x143b73['process']&&_0x143b73[_0x31a949(0x110)]['on'])_0x143b73[_0x31a949(0x110)]['on'](_0x31a949(0x134),_0x3fb724),_0x143b73[_0x31a949(0x110)]['on'](_0x31a949(0xf6),_0x3fb724);else{if(_0x143b73[_0x31a949(0x14f)]){let _0x35f21a=_0x1a9b7b=>{const _0x14cc5a=_0x31a949;let _0x12fb36=_0x1a9b7b&&(_0x1a9b7b[_0x14cc5a(0x144)]||_0x1a9b7b[_0x14cc5a(0x126)]);_0x3fb724(_0x12fb36);};_0x143b73['addEventListener'](_0x31a949(0x144),_0x35f21a),_0x143b73[_0x31a949(0x14f)](_0x31a949(0x159),_0x35f21a);}}_0x57ad5c({'method':_0x31a949(0xf9),'version':_0x1cdc57,'args':[_0x593634]});})(globalThis,_0x3b5ced(0x162),_0x3b5ced(0x147),_0x3b5ced(0x13c),_0x3b5ced(0x117),_0x3b5ced(0x139),_0x3b5ced(0xfe),_0x3b5ced(0xf7),_0x3b5ced(0x155));\");}catch(e){}</script>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t" + head + "\n\t</head>\n\t<body data-sveltekit-preload-data=\"hover\">\n\t\t<div style=\"display: contents\">" + body + "</div>\n\t</body>\n</html>\n",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "162cz94"
};

export function get_hooks() {
	return {};
}

export { set_assets, set_building, set_prerendering, set_private_env, set_public_env, set_safe_public_env };