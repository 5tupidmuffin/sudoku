if(!self.define){let e,t={};const o=(o,n)=>(o=new URL(o+".js",n).href,t[o]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=o,e.onload=t,document.head.appendChild(e)}else e=o,importScripts(o),t()})).then((()=>{let e=t[o];if(!e)throw new Error(`Module ${o} didn’t register its module`);return e})));self.define=(n,r)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(t[i])return;let s={};const c=e=>o(e,i),u={module:{uri:i},exports:s,require:c};t[i]=Promise.all(n.map((e=>u[e]||c(e)))).then((e=>(r(...e),s)))}}define(["./workbox-6716fad7"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"bundle.js",revision:"e1754c94142082c06c84f7a0e144a787"}],{})}));
//# sourceMappingURL=service-worker.js.map