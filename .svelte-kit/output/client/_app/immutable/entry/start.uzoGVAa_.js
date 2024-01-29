import{o as Se,t as $e}from"../chunks/scheduler.sMD3e7PM.js";import{S as dt,a as pt,b as ht,H as V,N as K,r as ne,o as Ae,c as M,P as Oe,f as at,g as Pe,d as pe,i as je,s as Fe,e as B,h as ot,j as Ot}from"../chunks/singletons.AnexqP55.js";new URL("sveltekit-internal://");function Pt(e,r){return e==="/"||r==="ignore"?e:r==="never"?e.endsWith("/")?e.slice(0,-1):e:r==="always"&&!e.endsWith("/")?e+"/":e}function jt(e){return e.split("%25").map(decodeURI).join("%25")}function Rt(e){for(const r in e)e[r]=decodeURIComponent(e[r]);return e}function Re({href:e}){return e.split("#")[0]}const It=["href","pathname","search","toString","toJSON"];function xt(e,r,a){const s=new URL(e);Object.defineProperty(s,"searchParams",{value:new Proxy(s.searchParams,{get(l,f){if(f==="get"||f==="getAll"||f==="has")return u=>(a(u),l[f](u));r();const w=Reflect.get(l,f);return typeof w=="function"?w.bind(l):w}}),enumerable:!0,configurable:!0});for(const l of It)Object.defineProperty(s,l,{get(){return r(),e[l]},enumerable:!0,configurable:!0});return Lt(s),s}function Lt(e){Object.defineProperty(e,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const Nt="/__data.json",Tt=".html__data.json";function Ct(e){return e.endsWith(".html")?e.replace(/\.html$/,Tt):e.replace(/\/$/,"")+Nt}function Ut(...e){let r=5381;for(const a of e)if(typeof a=="string"){let s=a.length;for(;s;)r=r*33^a.charCodeAt(--s)}else if(ArrayBuffer.isView(a)){const s=new Uint8Array(a.buffer,a.byteOffset,a.byteLength);let l=s.length;for(;l;)r=r*33^s[--l]}else throw new TypeError("value must be a string or TypedArray");return(r>>>0).toString(36)}let qe=0;const _t=window.fetch;function Dt(){qe+=1}function Ft(){qe-=1}{let e=!1;(async()=>{e=new Error().stack.includes("check_stack_trace")})(),window.fetch=(a,s)=>{const l=a instanceof Request?a.url:a.toString(),f=new Error().stack.split(`
`),w=f.findIndex(m=>m.includes("load@")||m.includes("at load")),u=f.slice(0,w+2).join(`
`),g=e?u.includes("src/runtime/client/client.js"):qe,c=s?.__sveltekit_fetch__;return g&&!c&&console.warn(`Loading ${l} using \`window.fetch\`. For best results, use the \`fetch\` that is passed to your \`load\` function: https://kit.svelte.dev/docs/load#making-fetch-requests`),(a instanceof Request?a.method:s?.method||"GET")!=="GET"&&oe.delete(He(a)),_t(a,s)}}const oe=new Map;function Mt(e){const r=atob(e),a=new Uint8Array(r.length);for(let s=0;s<r.length;s++)a[s]=r.charCodeAt(s);return a.buffer}function qt(e,r){const a=He(e,r),s=document.querySelector(a);if(s?.textContent){let{body:l,...f}=JSON.parse(s.textContent);const w=s.getAttribute("data-ttl");return w&&oe.set(a,{body:l,init:f,ttl:1e3*Number(w)}),s.getAttribute("data-b64")!==null&&(l=Mt(l)),Promise.resolve(new Response(l,f))}return gt(e,r)}function Ht(e,r,a){if(oe.size>0){const s=He(e,a),l=oe.get(s);if(l){if(performance.now()<l.ttl&&["default","force-cache","only-if-cached",void 0].includes(a?.cache))return new Response(l.body,l.init);oe.delete(s)}}return gt(r,a)}function gt(e,r){const a={...r};return Object.defineProperty(a,"__sveltekit_fetch__",{value:!0,writable:!0,configurable:!0}),window.fetch(e,a)}function He(e,r){let s=`script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request?e.url:e)}]`;if(r?.headers||r?.body){const l=[];r.headers&&l.push([...new Headers(r.headers)].join(",")),r.body&&(typeof r.body=="string"||ArrayBuffer.isView(r.body))&&l.push(r.body),s+=`[data-hash="${Ut(...l)}"]`}return s}const Vt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Bt(e){const r=[];return{pattern:e==="/"?/^\/$/:new RegExp(`^${Jt(e).map(s=>{const l=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(s);if(l)return r.push({name:l[1],matcher:l[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const f=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(s);if(f)return r.push({name:f[1],matcher:f[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!s)return;const w=s.split(/\[(.+?)\](?!\])/);return"/"+w.map((g,c)=>{if(c%2){if(g.startsWith("x+"))return Ie(String.fromCharCode(parseInt(g.slice(2),16)));if(g.startsWith("u+"))return Ie(String.fromCharCode(...g.slice(2).split("-").map(A=>parseInt(A,16))));const h=Vt.exec(g);if(!h)throw new Error(`Invalid param: ${g}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,m,j,E,P]=h;return r.push({name:E,matcher:P,optional:!!m,rest:!!j,chained:j?c===1&&w[0]==="":!1}),j?"(.*?)":m?"([^/]*)?":"([^/]+?)"}return Ie(g)}).join("")}).join("")}/?$`),params:r}}function Gt(e){return!/^\([^)]+\)$/.test(e)}function Jt(e){return e.slice(1).split("/").filter(Gt)}function Kt(e,r,a){const s={},l=e.slice(1),f=l.filter(u=>u!==void 0);let w=0;for(let u=0;u<r.length;u+=1){const g=r[u];let c=l[u-w];if(g.chained&&g.rest&&w&&(c=l.slice(u-w,u+1).filter(h=>h).join("/"),w=0),c===void 0){g.rest&&(s[g.name]="");continue}if(!g.matcher||a[g.matcher](c)){s[g.name]=c;const h=r[u+1],m=l[u+1];h&&!h.rest&&h.optional&&m&&g.chained&&(w=0),!h&&!m&&Object.keys(s).length===f.length&&(w=0);continue}if(g.optional&&g.chained){w++;continue}return}if(!w)return s}function Ie(e){return e.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function zt({nodes:e,server_loads:r,dictionary:a,matchers:s}){const l=new Set(r);return Object.entries(a).map(([u,[g,c,h]])=>{const{pattern:m,params:j}=Bt(u),E={id:u,exec:P=>{const A=m.exec(P);if(A)return Kt(A,j,s)},errors:[1,...h||[]].map(P=>e[P]),layouts:[0,...c||[]].map(w),leaf:f(g)};return E.errors.length=E.layouts.length=Math.max(E.errors.length,E.layouts.length),E});function f(u){const g=u<0;return g&&(u=~u),[g,e[u]]}function w(u){return u===void 0?u:[l.has(u),e[u]]}}function Ve(e,r=JSON.parse){try{return r(sessionStorage[e])}catch{}}function xe(e,r,a=JSON.stringify){const s=a(r);try{sessionStorage[e]=s}catch{}}class Le extends Error{constructor(r,a){super(r),this.name="DevalueError",this.path=a.join("")}}function st(e){return Object(e)!==e}const Wt=Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Yt(e){const r=Object.getPrototypeOf(e);return r===Object.prototype||r===null||Object.getOwnPropertyNames(r).sort().join("\0")===Wt}function Xt(e){return Object.prototype.toString.call(e).slice(8,-1)}function Zt(e){switch(e){case'"':return'\\"';case"<":return"\\u003C";case"\\":return"\\\\";case`
`:return"\\n";case"\r":return"\\r";case"	":return"\\t";case"\b":return"\\b";case"\f":return"\\f";case"\u2028":return"\\u2028";case"\u2029":return"\\u2029";default:return e<" "?`\\u${e.charCodeAt(0).toString(16).padStart(4,"0")}`:""}}function X(e){let r="",a=0;const s=e.length;for(let l=0;l<s;l+=1){const f=e[l],w=Zt(f);w&&(r+=e.slice(a,l)+w,a=l+1)}return`"${a===0?e:r+e.slice(a)}"`}const Be=-1,yt=-2,wt=-3,mt=-4,vt=-5,Ge=-6;function Qt(e,r){return bt(JSON.parse(e),r)}function bt(e,r){if(typeof e=="number")return l(e,!0);if(!Array.isArray(e)||e.length===0)throw new Error("Invalid input");const a=e,s=Array(a.length);function l(f,w=!1){if(f===Be)return;if(f===wt)return NaN;if(f===mt)return 1/0;if(f===vt)return-1/0;if(f===Ge)return-0;if(w)throw new Error("Invalid input");if(f in s)return s[f];const u=a[f];if(!u||typeof u!="object")s[f]=u;else if(Array.isArray(u))if(typeof u[0]=="string"){const g=u[0],c=r?.[g];if(c)return s[f]=c(l(u[1]));switch(g){case"Date":s[f]=new Date(u[1]);break;case"Set":const h=new Set;s[f]=h;for(let E=1;E<u.length;E+=1)h.add(l(u[E]));break;case"Map":const m=new Map;s[f]=m;for(let E=1;E<u.length;E+=2)m.set(l(u[E]),l(u[E+1]));break;case"RegExp":s[f]=new RegExp(u[1],u[2]);break;case"Object":s[f]=Object(u[1]);break;case"BigInt":s[f]=BigInt(u[1]);break;case"null":const j=Object.create(null);s[f]=j;for(let E=1;E<u.length;E+=2)j[u[E]]=l(u[E+1]);break;default:throw new Error(`Unknown type ${g}`)}}else{const g=new Array(u.length);s[f]=g;for(let c=0;c<u.length;c+=1){const h=u[c];h!==yt&&(g[c]=l(h))}}else{const g={};s[f]=g;for(const c in u){const h=u[c];g[c]=l(h)}}return s[f]}return l(0)}function Ne(e,r){const a=[],s=new Map,l=[];for(const c in r)l.push({key:c,fn:r[c]});const f=[];let w=0;function u(c){if(typeof c=="function")throw new Le("Cannot stringify a function",f);if(s.has(c))return s.get(c);if(c===void 0)return Be;if(Number.isNaN(c))return wt;if(c===1/0)return mt;if(c===-1/0)return vt;if(c===0&&1/c<0)return Ge;const h=w++;s.set(c,h);for(const{key:j,fn:E}of l){const P=E(c);if(P)return a[h]=`["${j}",${u(P)}]`,h}let m="";if(st(c))m=Te(c);else switch(Xt(c)){case"Number":case"String":case"Boolean":m=`["Object",${Te(c)}]`;break;case"BigInt":m=`["BigInt",${c}]`;break;case"Date":m=`["Date","${c.toISOString()}"]`;break;case"RegExp":const{source:E,flags:P}=c;m=P?`["RegExp",${X(E)},"${P}"]`:`["RegExp",${X(E)}]`;break;case"Array":m="[";for(let A=0;A<c.length;A+=1)A>0&&(m+=","),A in c?(f.push(`[${A}]`),m+=u(c[A]),f.pop()):m+=yt;m+="]";break;case"Set":m='["Set"';for(const A of c)m+=`,${u(A)}`;m+="]";break;case"Map":m='["Map"';for(const[A,D]of c)f.push(`.get(${st(A)?Te(A):"..."})`),m+=`,${u(A)},${u(D)}`;m+="]";break;default:if(!Yt(c))throw new Le("Cannot stringify arbitrary non-POJOs",f);if(Object.getOwnPropertySymbols(c).length>0)throw new Le("Cannot stringify POJOs with symbolic keys",f);if(Object.getPrototypeOf(c)===null){m='["null"';for(const A in c)f.push(`.${A}`),m+=`,${X(A)},${u(c[A])}`,f.pop();m+="]"}else{m="{";let A=!1;for(const D in c)A&&(m+=","),A=!0,f.push(`.${D}`),m+=`${X(D)}:${u(c[D])}`,f.pop();m+="}"}}return a[h]=m,h}const g=u(e);return g<0?`${g}`:`[${a.join(",")}]`}function Te(e){const r=typeof e;return r==="string"?X(e):e instanceof String?X(e.toString()):e===void 0?Be.toString():e===0&&1/e<0?Ge.toString():r==="bigint"?`["BigInt","${e}"]`:String(e)}function en(e){function r(a,s){if(a)for(const l in a){if(l[0]==="_"||e.has(l))continue;const f=[...e.values()],w=tn(l,s?.slice(s.lastIndexOf(".")))??`valid exports are ${f.join(", ")}, or anything with a '_' prefix`;throw new Error(`Invalid export '${l}'${s?` in ${s}`:""} (${w})`)}}return r}function tn(e,r=".js"){const a=[];if(Je.has(e)&&a.push(`+layout${r}`),Et.has(e)&&a.push(`+page${r}`),kt.has(e)&&a.push(`+layout.server${r}`),nn.has(e)&&a.push(`+page.server${r}`),rn.has(e)&&a.push(`+server${r}`),a.length>0)return`'${e}' is a valid export in ${a.slice(0,-1).join(", ")}${a.length>1?" or ":""}${a.at(-1)}`}const Je=new Set(["load","prerender","csr","ssr","trailingSlash","config"]),Et=new Set([...Je,"entries"]),kt=new Set([...Je]),nn=new Set([...kt,"actions","entries"]),rn=new Set(["GET","POST","PATCH","PUT","DELETE","OPTIONS","HEAD","fallback","prerender","trailingSlash","config","entries"]),an=en(Et);function on(e){return e.filter(r=>r!=null)}class _e{constructor(r,a){this.status=r,typeof a=="string"?this.body={message:a}:a?this.body=a:this.body={message:`Error: ${r}`}}toString(){return JSON.stringify(this.body)}}class it{constructor(r,a){this.status=r,this.location=a}}class Ke extends Error{constructor(r,a,s){super(s),this.status=r,this.text=a}}function sn(e,r){const a=/^(moz-icon|view-source|jar):/.exec(r);a&&console.warn(`${e}: Calling \`depends('${r}')\` will throw an error in Firefox because \`${a[1]}\` is a special URI scheme`)}const Ce="x-sveltekit-invalidated",cn="x-sveltekit-trailing-slash";function he(e){return e instanceof _e||e instanceof Ke?e.status:500}function ln(e){return e instanceof Ke?e.text:"Internal Error"}const z=Ve(dt)??{},re=Ve(pt,Qt)??{},se=Ve(ht)??{},Me=history.pushState,ae=history.replaceState;{let e=!1;const r=()=>{e||(e=!0,console.warn("Avoid using `history.pushState(...)` and `history.replaceState(...)` as these will conflict with SvelteKit's router. Use the `pushState` and `replaceState` imports from `$app/navigation` instead."))};history.pushState=(...a)=>(r(),Me.apply(history,a)),history.replaceState=(...a)=>(r(),ae.apply(history,a))}function Ue(e){z[e]=Fe()}function ct(e,r){let a=e+1;for(;z[a];)delete z[a],a+=1;for(a=r+1;se[a];)delete se[a],a+=1}function Y(e){return location.href=e.href,new Promise(()=>{})}function lt(){}function fn(e,r){const a=zt(e),s=e.nodes[0],l=e.nodes[1];s(),l();const f=document.documentElement,w=[],u=[];let g=null;const c={before_navigate:[],on_navigate:[],after_navigate:[]};let h={branch:[],error:null,url:null},m=!1,j=!1,E=!0,P=!1,A=!1,D=!1,Z=!1,ie=!1,q,L=history.state?.[V],F=history.state?.[K];L||(L=F=Date.now(),ae.call(history,{...history.state,[V]:L,[K]:F},"",location.href));const ge=z[L];ge&&(history.scrollRestoration="manual",scrollTo(ge.x,ge.y));let I,W,ye;async function ze(){if(await(ye||=Promise.resolve()),!ye)return;ye=null;const n=ee(h.url,!0);g=null;const t=W={},o=n&&await ve(n);t===W&&(o&&(o.type==="redirect"?await ce(new URL(o.location,h.url).href,{},1,t):(o.props.page!==void 0&&(I=o.props.page),q.$set(o.props))),w.length=0)}function We(n){u.some(t=>t?.snapshot)&&(se[n]=u.map(t=>t?.snapshot?.capture()))}function Ye(n){se[n]?.forEach((t,o)=>{u[o]?.snapshot?.restore(t)})}function Xe(){Ue(L),xe(dt,z),We(F),xe(ht,se),xe(pt,re,Ne)}async function ce(n,t,o,i){return ue({type:"goto",url:ne(n),keepfocus:t.keepFocus,noscroll:t.noScroll,replace_state:t.replaceState,redirect_count:o,state:t.state,nav_token:i,accept:()=>{t.invalidateAll&&(ie=!0)}})}async function Ze(n){return g={id:n.id,promise:ve(n).then(t=>(t.type==="loaded"&&t.state.error&&(g=null),t))},g.promise}async function le(n){const t=a.find(o=>o.exec(be(n)));t&&await Promise.all([...t.layouts,t.leaf].map(o=>o?.[1]()))}function Qe(n){if(n.state.error&&document.querySelector("vite-error-overlay"))return;h=n.state;const t=document.querySelector("style[data-sveltekit]");t&&t.remove(),I=n.props.page,q=new e.root({target:r,props:{...n.props,stores:B,components:u},hydrate:!0}),Ye(F);const o={from:null,to:{params:h.params,route:{id:h.route?.id??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};c.after_navigate.forEach(i=>i(o)),j=!0}async function Q({url:n,params:t,branch:o,status:i,error:d,route:p,form:_}){let v="never";for(const S of o)S?.slash!==void 0&&(v=S.slash);n.pathname=Pt(n.pathname,v),n.search=n.search;const k={type:"loaded",state:{url:n,params:t,branch:o,error:d,route:p},props:{constructors:on(o).map(S=>S.node.component),page:I}};_!==void 0&&(k.props.form=_);let b={},N=!I,T=0;for(let S=0;S<Math.max(o.length,h.branch.length);S+=1){const x=o[S],O=h.branch[S];x?.data!==O?.data&&(N=!0),x&&(b={...b,...x.data},N&&(k.props[`data_${T}`]=b),T+=1)}return(!h.url||n.href!==h.url.href||h.error!==d||_!==void 0&&_!==I.form||N)&&(k.props.page={error:d,params:t,route:{id:p?.id??null},state:{},status:i,url:new URL(n),form:_??null,data:N?b:I.data}),k}async function we({loader:n,parent:t,url:o,params:i,route:d,server_data_node:p}){let _=null,v=!0;const k={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},b=await n();if(an(b.universal),b.universal?.load){let N=function(...y){for(const S of y){sn(d.id,S);const{href:x}=new URL(S,o);k.dependencies.add(x)}};const T={route:new Proxy(d,{get:(y,S)=>(v&&(k.route=!0),y[S])}),params:new Proxy(i,{get:(y,S)=>(v&&k.params.add(S),y[S])}),data:p?.data??null,url:xt(o,()=>{v&&(k.url=!0)},y=>{v&&k.search_params.add(y)}),async fetch(y,S){let x;y instanceof Request?(x=y.url,S={body:y.method==="GET"||y.method==="HEAD"?void 0:await y.blob(),cache:y.cache,credentials:y.credentials,headers:y.headers,integrity:y.integrity,keepalive:y.keepalive,method:y.method,mode:y.mode,redirect:y.redirect,referrer:y.referrer,referrerPolicy:y.referrerPolicy,signal:y.signal,...S}):x=y;const O=new URL(x,o);return v&&N(O.href),O.origin===o.origin&&(x=O.href.slice(o.origin.length)),j?Ht(x,O.href,S):qt(x,S)},setHeaders:()=>{},depends:N,parent(){return v&&(k.parent=!0),t()},untrack(y){v=!1;try{return y()}finally{v=!0}}};try{if(Dt(),_=await b.universal.load.call(null,T)??null,_!=null&&Object.getPrototypeOf(_)!==Object.prototype)throw new Error(`a load function related to route '${d.id}' returned ${typeof _!="object"?`a ${typeof _}`:_ instanceof Response?"a Response object":Array.isArray(_)?"an array":"a non-plain object"}, but must return a plain object at the top level (i.e. \`return {...}\`)`)}finally{Ft()}}return{node:b,loader:n,server:p,universal:b.universal?.load?{type:"data",data:_,uses:k}:null,data:_??p?.data??null,slash:M&&(o.pathname===M||o.pathname===M+"/")?"always":b.universal?.trailingSlash??p?.slash}}function et(n,t,o,i,d,p){if(ie)return!0;if(!d)return!1;if(d.parent&&n||d.route&&t||d.url&&o)return!0;for(const _ of d.search_params)if(i.has(_))return!0;for(const _ of d.params)if(p[_]!==h.params[_])return!0;for(const _ of d.dependencies)if(w.some(v=>v(new URL(_))))return!0;return!1}function me(n,t){return n?.type==="data"?n:n?.type==="skip"?t??null:null}function $t(n,t){if(!n)return new Set(t.searchParams.keys());const o=new Set([...n.searchParams.keys(),...t.searchParams.keys()]);for(const i of o){const d=n.searchParams.getAll(i),p=t.searchParams.getAll(i);d.every(_=>p.includes(_))&&p.every(_=>d.includes(_))&&o.delete(i)}return o}async function ve({id:n,invalidating:t,url:o,params:i,route:d}){if(g?.id===n)return g.promise;const{errors:p,layouts:_,leaf:v}=d,k=[..._,v];p.forEach($=>$?.().catch(()=>{})),k.forEach($=>$?.[1]().catch(()=>{}));let b=null;const N=h.url?n!==h.url.pathname+h.url.search:!1,T=h.route?d.id!==h.route.id:!1,y=$t(h.url,o);let S=!1;const x=k.map(($,R)=>{const C=h.branch[R],U=!!$?.[0]&&(C?.loader!==$[1]||et(S,T,N,y,C.server?.uses,i));return U&&(S=!0),U});if(x.some(Boolean)){try{b=await ft(o,x)}catch($){return fe({status:he($),error:await te($,{url:o,params:i,route:{id:d.id}}),url:o,route:d})}if(b.type==="redirect")return b}const O=b?.nodes;let H=!1;const G=k.map(async($,R)=>{if(!$)return;const C=h.branch[R],U=O?.[R];if((!U||U.type==="skip")&&$[1]===C?.loader&&!et(H,T,N,y,C.universal?.uses,i))return C;if(H=!0,U?.type==="error")throw U;return we({loader:$[1],url:o,params:i,route:d,parent:async()=>{const Ee={};for(let ke=0;ke<R;ke+=1)Object.assign(Ee,(await G[ke])?.data);return Ee},server_data_node:me(U===void 0&&$[0]?{type:"skip"}:U??null,$[0]?C?.server:void 0)})});for(const $ of G)$.catch(()=>{});const J=[];for(let $=0;$<k.length;$+=1)if(k[$])try{J.push(await G[$])}catch(R){if(R instanceof it)return{type:"redirect",location:R.location};let C=he(R),U;if(O?.includes(R))C=R.status??C,U=R.error;else if(R instanceof _e)U=R.body;else{if(await B.updated.check())return await Y(o);U=await te(R,{params:i,url:o,route:{id:d.id}})}const de=await tt($,J,p);return de?await Q({url:o,params:i,branch:J.slice(0,de.idx).concat(de.node),status:C,error:U,route:d}):await rt(o,{id:d.id},U,C)}else J.push(void 0);return await Q({url:o,params:i,branch:J,status:200,error:null,route:d,form:t?void 0:null})}async function tt(n,t,o){for(;n--;)if(o[n]){let i=n;for(;!t[i];)i-=1;try{return{idx:i+1,node:{node:await o[n](),loader:o[n],data:{},server:null,universal:null}}}catch{continue}}}async function fe({status:n,error:t,url:o,route:i}){const d={};let p=null;if(e.server_loads[0]===0)try{const b=await ft(o,[!0]);if(b.type!=="data"||b.nodes[0]&&b.nodes[0].type!=="data")throw 0;p=b.nodes[0]??null}catch{(o.origin!==Ae||o.pathname!==location.pathname||m)&&await Y(o)}const v=await we({loader:s,url:o,params:d,route:i,parent:()=>Promise.resolve({}),server_data_node:me(p)}),k={node:await l(),loader:l,universal:null,server:null,data:null};return await Q({url:o,params:d,branch:[v,k],status:n,error:t,route:null})}function ee(n,t){if(je(n,M))return;const o=be(n.pathname);for(const i of a){const d=i.exec(o);if(d)return{id:n.pathname+n.search,invalidating:t,route:i,params:Rt(d),url:n}}}function be(n){return jt(n.slice(M.length)||"/")}function nt({url:n,type:t,intent:o,delta:i}){let d=!1;const p=ut(h,o,n,t);i!==void 0&&(p.navigation.delta=i);const _={...p.navigation,cancel:()=>{d=!0,p.reject(new Error("navigation was cancelled"))}};return A||c.before_navigate.forEach(v=>v(_)),d?null:p}async function ue({type:n,url:t,popped:o,keepfocus:i,noscroll:d,replace_state:p,state:_={},redirect_count:v=0,nav_token:k={},accept:b=lt,block:N=lt}){const T=ee(t,!1),y=nt({url:t,type:n,delta:o?.delta,intent:T});if(!y){N();return}const S=L,x=F;b(),A=!0,j&&B.navigating.set(y.navigation),W=k;let O=T&&await ve(T);if(!O){if(je(t,M))return await Y(t);O=await rt(t,{id:null},await te(new Ke(404,"Not Found",`Not found: ${t.pathname}`),{url:t,params:{},route:{id:null}}),404)}if(t=T?.url||t,W!==k)return y.reject(new Error("navigation was aborted")),!1;if(O.type==="redirect")if(v>=20)O=await fe({status:500,error:await te(new Error("Redirect loop"),{url:t,params:{},route:{id:null}}),url:t,route:{id:null}});else return ce(new URL(O.location,t).href,{},v+1,k),!1;else O.props.page.status>=400&&await B.updated.check()&&await Y(t);if(w.length=0,ie=!1,P=!0,Ue(S),We(x),O.props.page.url.pathname!==t.pathname&&(t.pathname=O.props.page.url.pathname),_=o?o.state:_,!o){const $=p?0:1,R={[V]:L+=$,[K]:F+=$};(p?ae:Me).call(history,R,"",t),p||ct(L,F)}if(re[L]=_,g=null,O.props.page.state=_,j){h=O.state,O.props.page&&(O.props.page.url=t);const $=(await Promise.all(c.on_navigate.map(R=>R(y.navigation)))).filter(R=>typeof R=="function");if($.length>0){let R=function(){c.after_navigate=c.after_navigate.filter(C=>!$.includes(C))};$.push(R),c.after_navigate.push(...$)}q.$set(O.props),Z=!0}else Qe(O);const{activeElement:H}=document;await $e();const G=o?o.scroll:d?Fe():null;if(E){const $=t.hash&&document.getElementById(decodeURIComponent(t.hash.slice(1)));G?scrollTo(G.x,G.y):$?$.scrollIntoView():scrollTo(0,0)}const J=document.activeElement!==H&&document.activeElement!==document.body;!i&&!J&&De(),E=!0,O.props.page&&(I=O.props.page),A=!1,n==="popstate"&&Ye(F),y.fulfil(void 0),c.after_navigate.forEach($=>$(y.navigation)),B.navigating.set(null),P=!1}async function rt(n,t,o,i){if(n.origin===Ae&&n.pathname===location.pathname&&!m)return await fe({status:i,error:o,url:n,route:t});if(i!==404){console.error("An error occurred while loading the page. This will cause a full page reload. (This message will only appear during development.)");debugger}return await Y(n)}function At(){let n;f.addEventListener("mousemove",p=>{const _=p.target;clearTimeout(n),n=setTimeout(()=>{i(_,2)},20)});function t(p){i(p.composedPath()[0],1)}f.addEventListener("mousedown",t),f.addEventListener("touchstart",t,{passive:!0});const o=new IntersectionObserver(p=>{for(const _ of p)_.isIntersecting&&(le(_.target.href),o.unobserve(_.target))},{threshold:0});function i(p,_){const v=at(p,f);if(!v)return;const{url:k,external:b,download:N}=Pe(v,M);if(b||N)return;const T=pe(v);if(!T.reload)if(_<=T.preload_data){const y=ee(k,!1);y&&Ze(y).then(S=>{S.type==="loaded"&&S.state.error&&console.warn(`Preloading data for ${y.url.pathname} failed with the following error: ${S.state.error.message}
If this error is transient, you can ignore it. Otherwise, consider disabling preloading for this route. This route was preloaded due to a data-sveltekit-preload-data attribute. See https://kit.svelte.dev/docs/link-options for more info`)})}else _<=T.preload_code&&le(k.pathname)}function d(){o.disconnect();for(const p of f.querySelectorAll("a")){const{url:_,external:v,download:k}=Pe(p,M);if(v||k)continue;const b=pe(p);b.reload||(b.preload_code===ot.viewport&&o.observe(p),b.preload_code===ot.eager&&le(_.pathname))}}c.after_navigate.push(d),d()}function te(n,t){if(n instanceof _e)return n.body;console.warn("The next HMR update will cause the page to reload");const o=he(n),i=ln(n);return e.hooks.handleError({error:n,event:t,status:o,message:i})??{message:i}}return{after_navigate:n=>{Se(()=>(c.after_navigate.push(n),()=>{const t=c.after_navigate.indexOf(n);c.after_navigate.splice(t,1)}))},before_navigate:n=>{Se(()=>(c.before_navigate.push(n),()=>{const t=c.before_navigate.indexOf(n);c.before_navigate.splice(t,1)}))},on_navigate:n=>{Se(()=>(c.on_navigate.push(n),()=>{const t=c.on_navigate.indexOf(n);c.on_navigate.splice(t,1)}))},disable_scroll_handling:()=>{if(j&&!P)throw new Error("Can only disable scroll handling during navigation");(P||!j)&&(E=!1)},goto:(n,t={})=>(n=ne(n),n.origin!==Ae?Promise.reject(new Error(`Cannot use \`goto\` with an external URL. Use \`window.location = "${n}"\` instead`)):ce(n,t,0)),invalidate:n=>{if(typeof n=="function")w.push(n);else{const{href:t}=new URL(n,location.href);w.push(o=>o.href===t)}return ze()},invalidate_all:()=>(ie=!0,ze()),preload_data:async n=>{const t=ne(n),o=ee(t,!1);if(!o)throw new Error(`Attempted to preload a URL that does not belong to this app: ${t}`);const i=await Ze(o);if(i.type==="redirect")return{type:i.type,location:i.location};const{status:d,data:p}=i.props.page??I;return{type:i.type,status:d,data:p}},preload_code:n=>{{if(!n.startsWith(M))throw new Error(`pathnames passed to preloadCode must start with \`paths.base\` (i.e. "${M}${n}" rather than "${n}")`);if(!a.find(t=>t.exec(be(n))))throw new Error(`'${n}' did not match any routes`)}return le(n)},push_state:(n,t)=>{try{Ne(t)}catch(i){throw new Error(`Could not serialize state${i.path}`)}const o={[V]:L+=1,[K]:F,[Oe]:I.url.href};Me.call(history,o,"",ne(n)),I={...I,state:t},q.$set({page:I}),re[L]=t,ct(L,F)},replace_state:(n,t)=>{try{Ne(t)}catch(i){throw new Error(`Could not serialize state${i.path}`)}const o={[V]:L,[K]:F,[Oe]:I.url.href};ae.call(history,o,"",ne(n)),I={...I,state:t},q.$set({page:I}),re[L]=t},apply_action:async n=>{if(n.type==="error"){const t=new URL(location.href),{branch:o,route:i}=h;if(!i)return;const d=await tt(h.branch.length,o,i.errors);if(d){const p=await Q({url:t,params:h.params,branch:o.slice(0,d.idx).concat(d.node),status:n.status??500,error:n.error,route:i});h=p.state,q.$set(p.props),$e().then(De)}}else n.type==="redirect"?ce(n.location,{invalidateAll:!0},0):(q.$set({form:null,page:{...I,form:n.data,status:n.status}}),await $e(),q.$set({form:n.data}),n.type==="success"&&De())},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",t=>{let o=!1;if(Xe(),!A){const i=ut(h,void 0,null,"leave"),d={...i.navigation,cancel:()=>{o=!0,i.reject(new Error("navigation was cancelled"))}};c.before_navigate.forEach(p=>p(d))}o?(t.preventDefault(),t.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Xe()}),navigator.connection?.saveData||At(),f.addEventListener("click",t=>{if(t.button||t.which!==1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.defaultPrevented)return;const o=at(t.composedPath()[0],f);if(!o)return;const{url:i,external:d,target:p,download:_}=Pe(o,M);if(!i)return;if(p==="_parent"||p==="_top"){if(window.parent!==window)return}else if(p&&p!=="_self")return;const v=pe(o);if(!(o instanceof SVGAElement)&&i.protocol!==location.protocol&&!(i.protocol==="https:"||i.protocol==="http:")||_)return;if(d||v.reload){nt({url:i,type:"link"})?A=!0:t.preventDefault();return}const[b,N]=i.href.split("#");if(N!==void 0&&b===Re(location)){if(h.url.hash===i.hash){t.preventDefault(),o.ownerDocument.getElementById(N)?.scrollIntoView();return}if(D=!0,Ue(L),n(i),!v.replace_state)return;D=!1}t.preventDefault(),ue({type:"link",url:i,keepfocus:v.keepfocus,noscroll:v.noscroll,replace_state:v.replace_state??i.href===location.href})}),f.addEventListener("submit",t=>{if(t.defaultPrevented)return;const o=HTMLFormElement.prototype.cloneNode.call(t.target),i=t.submitter;if((i?.formMethod||o.method)!=="get")return;const p=new URL(i?.hasAttribute("formaction")&&i?.formAction||o.action);if(je(p,M))return;const _=t.target,v=pe(_);if(v.reload)return;t.preventDefault(),t.stopPropagation();const k=new FormData(_),b=i?.getAttribute("name");b&&k.append(b,i?.getAttribute("value")??""),p.search=new URLSearchParams(k).toString(),ue({type:"form",url:p,keepfocus:v.keepfocus,noscroll:v.noscroll,replace_state:v.replace_state??p.href===location.href})}),addEventListener("popstate",async t=>{if(t.state?.[V]){const o=t.state[V];if(W={},o===L)return;const i=z[o],d=re[o]??{},p=new URL(t.state[Oe]??location.href),_=t.state[K],v=Re(location)===Re(h.url);if(_===F&&(Z||v)){n(p),z[L]=Fe(),i&&scrollTo(i.x,i.y),d!==I.state&&(I={...I,state:d},q.$set({page:I})),L=o;return}const b=o-L;await ue({type:"popstate",url:p,popped:{state:d,scroll:i,delta:b},accept:()=>{L=o,F=_},block:()=>{history.go(-b)},nav_token:W})}else if(!D){const o=new URL(location.href);n(o)}}),addEventListener("hashchange",()=>{D&&(D=!1,ae.call(history,{...history.state,[V]:++L,[K]:F},"",location.href))});for(const t of document.querySelectorAll("link"))t.rel==="icon"&&(t.href=t.href);addEventListener("pageshow",t=>{t.persisted&&B.navigating.set(null)});function n(t){h.url=t,B.page.set({...I,url:t}),B.page.notify()}},_hydrate:async({status:n=200,error:t,node_ids:o,params:i,route:d,data:p,form:_})=>{m=!0;const v=new URL(location.href);({params:i={},route:d={id:null}}=ee(v,!1)||{});let k;try{const b=o.map(async(y,S)=>{const x=p[S];return x?.uses&&(x.uses=St(x.uses)),we({loader:e.nodes[y],url:v,params:i,route:d,parent:async()=>{const O={};for(let H=0;H<S;H+=1)Object.assign(O,(await b[H]).data);return O},server_data_node:me(x)})}),N=await Promise.all(b),T=a.find(({id:y})=>y===d.id);if(T){const y=T.layouts;for(let S=0;S<y.length;S++)y[S]||N.splice(S,0,void 0)}k=await Q({url:v,params:i,branch:N,status:n,error:t,form:_,route:T??null})}catch(b){if(b instanceof it){await Y(new URL(b.location,location.href));return}k=await fe({status:he(b),error:await te(b,{url:v,params:i,route:d}),url:v,route:d})}k.props.page&&(k.props.page.state={}),Qe(k)}}}async function ft(e,r){const a=new URL(e);if(a.pathname=Ct(e.pathname),e.pathname.endsWith("/")&&a.searchParams.append(cn,"1"),e.searchParams.has(Ce))throw new Error(`Cannot used reserved query parameter "${Ce}"`);a.searchParams.append(Ce,r.map(l=>l?"1":"0").join(""));const s=await _t(a.href);if(!s.ok){let l;throw s.headers.get("content-type")?.includes("application/json")?l=await s.json():s.status===404?l="Not Found":s.status===500&&(l="Internal Error"),new _e(s.status,l)}return new Promise(async l=>{const f=new Map,w=s.body.getReader(),u=new TextDecoder;function g(h){return bt(h,{Promise:m=>new Promise((j,E)=>{f.set(m,{fulfil:j,reject:E})})})}let c="";for(;;){const{done:h,value:m}=await w.read();if(h&&!c)break;for(c+=!m&&c?`
`:u.decode(m);;){const j=c.indexOf(`
`);if(j===-1)break;const E=JSON.parse(c.slice(0,j));if(c=c.slice(j+1),E.type==="redirect")return l(E);if(E.type==="data")E.nodes?.forEach(P=>{P?.type==="data"&&(P.uses=St(P.uses),P.data=g(P.data))}),l(E);else if(E.type==="chunk"){const{id:P,data:A,error:D}=E,Z=f.get(P);f.delete(P),D?Z.reject(g(D)):Z.fulfil(g(A))}}}})}function St(e){return{dependencies:new Set(e?.dependencies??[]),params:new Set(e?.params??[]),parent:!!e?.parent,route:!!e?.route,url:!!e?.url,search_params:new Set(e?.search_params??[])}}function De(){const e=document.querySelector("[autofocus]");if(e)e.focus();else{const r=document.body,a=r.getAttribute("tabindex");r.tabIndex=-1,r.focus({preventScroll:!0,focusVisible:!1}),a!==null?r.setAttribute("tabindex",a):r.removeAttribute("tabindex");const s=getSelection();if(s&&s.type!=="None"){const l=[];for(let f=0;f<s.rangeCount;f+=1)l.push(s.getRangeAt(f));setTimeout(()=>{if(s.rangeCount===l.length){for(let f=0;f<s.rangeCount;f+=1){const w=l[f],u=s.getRangeAt(f);if(w.commonAncestorContainer!==u.commonAncestorContainer||w.startContainer!==u.startContainer||w.endContainer!==u.endContainer||w.startOffset!==u.startOffset||w.endOffset!==u.endOffset)return}s.removeAllRanges()}})}}}function ut(e,r,a,s){let l,f;const w=new Promise((g,c)=>{l=g,f=c});return w.catch(()=>{}),{navigation:{from:{params:e.params,route:{id:e.route?.id??null},url:e.url},to:a&&{params:r?.params??null,route:{id:r?.route?.id??null},url:a},willUnload:!r,type:s,complete:w},fulfil:l,reject:f}}{const e=console.warn;console.warn=function(...a){a.length===1&&/<(Layout|Page|Error)(_[\w$]+)?> was created (with unknown|without expected) prop '(data|form)'/.test(a[0])||e(...a)}}async function pn(e,r,a){r===document.body&&console.warn(`Placing %sveltekit.body% directly inside <body> is not recommended, as your app may break for users who have certain browser extensions installed.

Consider wrapping it in an element:

<div style="display: contents">
  %sveltekit.body%
</div>`);const s=fn(e,r);Ot({client:s}),a?await s._hydrate(a):s.goto(location.href,{replaceState:!0}),s._start_router()}export{pn as start};
