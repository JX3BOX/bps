(function(e){function t(t){for(var s,r,o=t[0],f=t[1],u=t[2],d=0,i=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&i.push(a[r][0]),a[r]=0;for(s in f)Object.prototype.hasOwnProperty.call(f,s)&&(e[s]=f[s]);l&&l(t);while(i.length)i.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],s=!0,r=1;r<n.length;r++){var o=n[r];0!==a[o]&&(s=!1)}s&&(c.splice(t--,1),e=f(f.s=n[0]))}return e}var s={},r={collection:0},a={collection:0},c=[];function o(e){return f.p+"js/"+({}[e]||e)+"."+{"chunk-480f5d97":"81110331","chunk-d29eb642":"7e5213d7","chunk-e7f99d54":"7e39293f","chunk-f4258f42":"eee6fe46"}[e]+".js"}function f(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,f),n.l=!0,n.exports}f.e=function(e){var t=[],n={"chunk-480f5d97":1,"chunk-d29eb642":1,"chunk-e7f99d54":1,"chunk-f4258f42":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var s="css/"+({}[e]||e)+"."+{"chunk-480f5d97":"f640de50","chunk-d29eb642":"8a481e19","chunk-e7f99d54":"6276b5cd","chunk-f4258f42":"e4c417e4"}[e]+".css",a=f.p+s,c=document.getElementsByTagName("link"),o=0;o<c.length;o++){var u=c[o],d=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(d===s||d===a))return t()}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){u=i[o],d=u.getAttribute("data-href");if(d===s||d===a)return t()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=t,l.onerror=function(t){var s=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=s,delete r[e],l.parentNode.removeChild(l),n(c)},l.href=a;var b=document.getElementsByTagName("head")[0];b.appendChild(l)})).then((function(){r[e]=0})));var s=a[e];if(0!==s)if(s)t.push(s[2]);else{var c=new Promise((function(t,n){s=a[e]=[t,n]}));t.push(s[2]=c);var u,d=document.createElement("script");d.charset="utf-8",d.timeout=120,f.nc&&d.setAttribute("nonce",f.nc),d.src=o(e);var i=new Error;u=function(t){d.onerror=d.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var s=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;i.message="Loading chunk "+e+" failed.\n("+s+": "+r+")",i.name="ChunkLoadError",i.type=s,i.request=r,n[1](i)}a[e]=void 0}};var l=setTimeout((function(){u({type:"timeout",target:d})}),12e4);d.onerror=d.onload=u,document.head.appendChild(d)}return Promise.all(t)},f.m=e,f.c=s,f.d=function(e,t,n){f.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},f.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.t=function(e,t){if(1&t&&(e=f(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(f.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)f.d(n,s,function(t){return e[t]}.bind(null,s));return n},f.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return f.d(t,"a",t),t},f.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},f.p="https://cdn.jx3box.com/static/bps/",f.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=t,u=u.slice();for(var i=0;i<u.length;i++)t(u[i]);var l=d;c.push([1,"chunk-vendors"]),n()})({"0ee1":function(e,t,n){"use strict";n("ac42")},1:function(e,t,n){e.exports=n("26fb")},"26fb":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),r=n("5c96"),a=n.n(r),c=n("6a69"),o=(n("6b30"),n("c5b4"),n("e795"),n("16e5")),f=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f"));s["default"].use(f["a"]);var u=f["a"].prototype.push;f["a"].prototype.push=function(e){return u.call(this,e).catch((function(e){return e}))};var d=[{name:"collection",path:"/",component:function(){return Promise.all([n.e("chunk-e7f99d54"),n.e("chunk-480f5d97"),n.e("chunk-d29eb642"),n.e("chunk-f4258f42")]).then(n.bind(null,"13a0"))}},{name:"collection-single",path:"/:id?",component:function(){return Promise.all([n.e("chunk-480f5d97"),n.e("chunk-d29eb642")]).then(n.bind(null,"1ce6"))}}],i=new f["a"]({routes:d,mode:"history",base:"/collection"}),l=i,b=n("4360"),j=n("3dfd");s["default"].config.productionTip=!1,s["default"].use(a.a),s["default"].use(c["a"]),o["a"].install(s["default"]),new s["default"]({router:l,store:b["a"],render:function(e){return e(j["a"])}}).$mount("#app")},"3dfd":function(e,t,n){"use strict";var s=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},r=[],a={name:"App"},c=a,o=(n("0ee1"),n("2877")),f=Object(o["a"])(c,s,r,!1,null,null,null);t["a"]=f.exports},4360:function(e,t,n){"use strict";n("caad"),n("2532");var s=n("2b0e"),r=n("2f62");s["default"].use(r["a"]);var a={state:{client:location.href.includes("origin")?"origin":"std",subtype:"",id:0,user_id:0,post:"",extend:{collection_data:"",directory:!1},isSuperAuthor:!1},mutations:{switchClient:function(e,t){e.client=t||"std"}},getters:{},actions:{},modules:{}};t["a"]=new r["a"].Store(a)},4678:function(e,t,n){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"64030","./ms-my.js":"64030","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function r(e){var t=a(e);return n(t)}function a(e){if(!n.o(s,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}r.keys=function(){return Object.keys(s)},r.resolve=a,e.exports=r,r.id="4678"},"7cb7":function(e,t,n){var s={"./bilibili.svg":"175f","./douyu.svg":"b119","./github.svg":"bffd","./huya.svg":"046a","./msg.svg":"aa9d","./weibo.svg":"50b5"};function r(e){var t=a(e);return n(t)}function a(e){if(!n.o(s,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}r.keys=function(){return Object.keys(s)},r.resolve=a,e.exports=r,r.id="7cb7"},ac42:function(e,t,n){}});
//# sourceMappingURL=collection.2d09a230.js.map