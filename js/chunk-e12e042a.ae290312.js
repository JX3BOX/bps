(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e12e042a"],{"00cc":function(e,t,n){"use strict";n("e676")},"07ac":function(e,t,n){var a=n("23e7"),r=n("6f53").values;a({target:"Object",stat:!0},{values:function(e){return r(e)}})},"25f0":function(e,t,n){"use strict";var a=n("e330"),r=n("5e77").PROPER,i=n("6eeb"),o=n("825a"),s=n("3a9b"),c=n("577e"),l=n("d039"),u=n("ad6d"),f="toString",d=RegExp.prototype,h=d[f],g=a(u),p=l((function(){return"/a/b"!=h.call({source:"a",flags:"b"})})),v=r&&h.name!=f;(p||v)&&i(RegExp.prototype,f,(function(){var e=o(this),t=c(e.source),n=e.flags,a=c(void 0===n&&s(d,e)&&!("flags"in d)?g(e):n);return"/"+t+"/"+a}),{unsafe:!0})},3450:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isSuperAuthor?n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"v-lua"},[n("div",{staticClass:"m-lua-index m-lua-box"},[n("div",{staticClass:"u-title"},[n("i",{staticClass:"el-icon-collection-tag"}),n("span",{staticClass:"u-title-list",on:{click:e.showList}},[e._v("文件夹")])]),e._l(e.schoolmap,(function(t,a){return n("div",{key:a,staticClass:"u-type",class:{on:e.current==a},on:{click:function(t){return e.changeType(a)}}},[n("img",{staticClass:"u-typeicon",attrs:{src:e._f("iconURL")(a)}}),n("span",[e._v(e._s("item"==a?"物品":a))])])}))],2),n("div",{staticClass:"m-lua-search"},[n("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入关键词"},on:{change:e.searchLua},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}},[n("span",{attrs:{slot:"prepend"},slot:"prepend"},[n("i",{staticClass:"el-icon-search"}),e._v(" 搜索")]),n("el-button",{attrs:{slot:"append",icon:"el-icon-position"},on:{change:e.searchLua},slot:"append"})],1)],1),n("div",{staticClass:"m-lua-tree m-lua-box"},[n("div",{staticClass:"u-title"},[n("i",{staticClass:"el-icon-collection-tag"}),n("span",{staticClass:"u-title-list",on:{click:e.showList}},[e._v("文件列表")]),n("span",{staticClass:"u-title-file"},[n("i",{staticClass:"el-icon-arrow-right"}),e._v(" "+e._s(e.file))]),e.data?n("div",{staticClass:"u-back",on:{click:e.showList}},[n("i",{staticClass:"el-icon-caret-left"}),e._v(" 返 回 ")]):e._e()]),e._l(e.map,(function(t,a){return n("div",{directives:[{name:"show",rawName:"v-show",value:a==e.current&&!e.data,expression:"group == current && !data"}],key:a,staticClass:"u-item"},e._l(t,(function(t,r){return n("div",{key:r,staticClass:"u-subitem",class:{isHidden:e.search&&!e.hasResult(t)}},[n("div",{staticClass:"u-wrapper"},[e.isDirectory(t)?n("div",{staticClass:"u-container"},[n("div",{staticClass:"u-folder",on:{click:function(t){return e.showSubtree(t,a+r)}}},[n("i",{staticClass:"el-icon-folder"}),e._v(" "+e._s(r)+" ")]),n("div",{ref:a+r,refInFor:!0,staticClass:"u-subtree"},e._l(t,(function(t,a){return n("div",{directives:[{name:"show",rawName:"v-show",value:!e.search||t.includes(e.search),expression:"!search || lua.includes(search)"}],key:a,staticClass:"u-leaf",on:{click:function(n){return e.showCode(t)}}},[n("i",{staticClass:"el-icon-tickets"}),e._v(" "+e._s(t)+" ")])})),0)]):n("div",{staticClass:"u-leaf",on:{click:function(n){return e.showCode(t)}}},[n("i",{staticClass:"el-icon-tickets"}),e._v(" "+e._s(r)+" ")])])])})),0)})),n("div",{directives:[{name:"show",rawName:"v-show",value:e.data,expression:"data"}],staticClass:"u-data"},[n("div",{ref:"lua",staticClass:"u-code"},[n("pre",[n("code",{staticClass:"language-lua",attrs:{id:"lua"},domProps:{innerHTML:e._s(e.data)}})])])])],2),n("el-alert",{staticClass:"m-lua-warning",attrs:{title:"本功能仅内部作者可见，仅作为攻略写作的参考资料。禁止外传，违者后果自负！",type:"error",effect:"dark","show-icon":""}})],1):n("div",{staticClass:"v-null"},[n("el-alert",{attrs:{type:"warning","show-icon":""}},[n("span",{attrs:{slot:"title"},slot:"title"},[e._v("没有查看权限，仅"),n("a",{attrs:{href:"/dashboard/#cooperation",target:"_blank"}},[e._v("【签约作者】")]),e._v("可见。")])])],1)},r=[],i=n("b85c"),o=(n("b64b"),n("07ac"),n("d3b7"),n("d81d"),n("ac1f"),n("841c"),n("caad"),n("2532"),n("bc3a")),s=n.n(o),c=n("65c2"),l=c["__luaPath"]+"kungfu/";function u(){return s.a.get(l+"index.json").then((function(e){return e.data})).catch((function(e){console.log(e)}))}function f(e){var t=encodeURIComponent(e);return s.a.get(l+t+"?version="+Date.now(),{headers:{"content-type":"text/plain"}}).catch((function(e){console.log(e)}))}var d=n("7aaa"),h=n("46d4"),g=(n("f272"),n("a326"),n("c9d2")),p={name:"Lua",props:[],data:function(){return{loading:!1,map:{},schoolmap:d,current:"",data:"",file:"",isSuperAuthor:!1,search:""}},computed:{subtype:function(){return this.$store.state.subtype},school:function(){var e=this.subtype||"通用";return h[e]["school"]},school_name:function(){var e=Object.keys(d),t=Object.values(d),n=t.indexOf(this.school);return n>=0?e[n]:""}},methods:{isDirectory:function(e){return Array.isArray(e)},showSubtree:function(e,t){this.$refs[t][0]["classList"].toggle("on")},showCode:function(e){this.file=e,this.loadLua(e)},showList:function(){this.file=this.current,this.data=""},loadMap:function(){var e=this;this.loading=!0,u().then((function(t){e.map=t})).finally((function(){e.loading=!1}))},loadLua:function(e){var t=this;this.loading=!0,f(e).then((function(e){t.data=e.data})).then((function(){var e=t.$refs.lua;e&&Prism.highlightAllUnder(e),t.$forceUpdate()})).finally((function(){t.loading=!1}))},changeType:function(e){this.file=this.current=e,this.data="",this.search=""},hasResult:function(e){if(this.isDirectory(e)){var t,n=Object(i["a"])(e);try{for(n.s();!(t=n.n()).done;){var a=t.value;if(a.includes(this.search))return!0}}catch(r){n.e(r)}finally{n.f()}return!1}return e.includes(this.search)},searchLua:function(){this.data&&(this.data="")}},filters:{iconURL:function(e){return c["__imgPath"]+"image/school/"+d[e]+".png"}},mounted:function(){var e=this;g["a"].isSuperAuthor().then((function(t){e.isSuperAuthor=t,e.isSuperAuthor&&(e.current=e.school_name,e.loadMap())}))},components:{}},v=p,m=(n("00cc"),n("2877")),b=Object(m["a"])(v,a,r,!1,null,null,null);t["default"]=b.exports},"466d":function(e,t,n){"use strict";var a=n("c65b"),r=n("d784"),i=n("825a"),o=n("50c4"),s=n("577e"),c=n("1d80"),l=n("dc4a"),u=n("8aa5"),f=n("14c3");r("match",(function(e,t,n){return[function(t){var n=c(this),r=void 0==t?void 0:l(t,e);return r?a(r,t,n):new RegExp(t)[e](s(n))},function(e){var a=i(this),r=s(e),c=n(t,a,r);if(c.done)return c.value;if(!a.global)return f(a,r);var l=a.unicode;a.lastIndex=0;var d,h=[],g=0;while(null!==(d=f(a,r))){var p=s(d[0]);h[g]=p,""===p&&(a.lastIndex=u(r,o(a.lastIndex),l)),g++}return 0===g?null:h}]}))},"4d63":function(e,t,n){var a=n("83ab"),r=n("da84"),i=n("e330"),o=n("94ca"),s=n("7156"),c=n("9112"),l=n("9bf2").f,u=n("241c").f,f=n("3a9b"),d=n("44e7"),h=n("577e"),g=n("ad6d"),p=n("9f7f"),v=n("6eeb"),m=n("d039"),b=n("1a2d"),y=n("69f3").enforce,w=n("2626"),k=n("b622"),x=n("fce3"),C=n("107c"),A=k("match"),_=r.RegExp,S=_.prototype,E=r.SyntaxError,O=i(g),j=i(S.exec),L=i("".charAt),P=i("".replace),R=i("".indexOf),N=i("".slice),I=/^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/,D=/a/g,F=/a/g,M=new _(D)!==D,T=p.UNSUPPORTED_Y,U=a&&(!M||T||x||C||m((function(){return F[A]=!1,_(D)!=D||_(F)==F||"/a/i"!=_(D,"i")}))),$=function(e){for(var t,n=e.length,a=0,r="",i=!1;a<=n;a++)t=L(e,a),"\\"!==t?i||"."!==t?("["===t?i=!0:"]"===t&&(i=!1),r+=t):r+="[\\s\\S]":r+=t+L(e,++a);return r},z=function(e){for(var t,n=e.length,a=0,r="",i=[],o={},s=!1,c=!1,l=0,u="";a<=n;a++){if(t=L(e,a),"\\"===t)t+=L(e,++a);else if("]"===t)s=!1;else if(!s)switch(!0){case"["===t:s=!0;break;case"("===t:j(I,N(e,a+1))&&(a+=2,c=!0),r+=t,l++;continue;case">"===t&&c:if(""===u||b(o,u))throw new E("Invalid capture group name");o[u]=!0,i[i.length]=[u,l],c=!1,u="";continue}c?u+=t:r+=t}return[r,i]};if(o("RegExp",U)){for(var J=function(e,t){var n,a,r,i,o,l,u=f(S,this),g=d(e),p=void 0===t,v=[],m=e;if(!u&&g&&p&&e.constructor===J)return e;if((g||f(S,e))&&(e=e.source,p&&(t="flags"in m?m.flags:O(m))),e=void 0===e?"":h(e),t=void 0===t?"":h(t),m=e,x&&"dotAll"in D&&(a=!!t&&R(t,"s")>-1,a&&(t=P(t,/s/g,""))),n=t,T&&"sticky"in D&&(r=!!t&&R(t,"y")>-1,r&&(t=P(t,/y/g,""))),C&&(i=z(e),e=i[0],v=i[1]),o=s(_(e,t),u?this:S,J),(a||r||v.length)&&(l=y(o),a&&(l.dotAll=!0,l.raw=J($(e),n)),r&&(l.sticky=!0),v.length&&(l.groups=v)),e!==m)try{c(o,"source",""===m?"(?:)":m)}catch(b){}return o},W=function(e){e in J||l(J,e,{configurable:!0,get:function(){return _[e]},set:function(t){_[e]=t}})},q=u(_),H=0;q.length>H;)W(q[H++]);S.constructor=J,J.prototype=S,v(r,"RegExp",J)}w("RegExp")},"6f53":function(e,t,n){var a=n("83ab"),r=n("e330"),i=n("df75"),o=n("fc6a"),s=n("d1e7").f,c=r(s),l=r([].push),u=function(e){return function(t){var n,r=o(t),s=i(r),u=s.length,f=0,d=[];while(u>f)n=s[f++],a&&!c(r,n)||l(d,e?[n,r[n]]:r[n]);return d}};e.exports={entries:u(!0),values:u(!1)}},7156:function(e,t,n){var a=n("1626"),r=n("861d"),i=n("d2bb");e.exports=function(e,t,n){var o,s;return i&&a(o=t.constructor)&&o!==n&&r(s=o.prototype)&&s!==n.prototype&&i(e,s),e}},"7aaa":function(e){e.exports=JSON.parse('{"七秀":4,"万花":2,"五毒":9,"长歌":19,"天策":1,"少林":5,"明教":8,"苍云":18,"纯阳":3,"唐门":10,"藏剑":6,"丐帮":7,"霸刀":20,"蓬莱":21,"凌雪阁":22,"衍天":23,"北天药宗":24,"江湖":0,"item":"item","装备":"equip","轻功":"fly","经脉":"jm","阵法":"zf","秘笈":"mj"}')},a15b:function(e,t,n){"use strict";var a=n("23e7"),r=n("e330"),i=n("44ad"),o=n("fc6a"),s=n("a640"),c=r([].join),l=i!=Object,u=s("join",",");a({target:"Array",proto:!0,forced:l||!u},{join:function(e){return c(o(this),void 0===e?",":e)}})},a326:function(e,t,n){},b64b:function(e,t,n){var a=n("23e7"),r=n("7b0b"),i=n("df75"),o=n("d039"),s=o((function(){i(1)}));a({target:"Object",stat:!0,forced:s},{keys:function(e){return i(r(e))}})},b85c:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0");var a=n("06c5");function r(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=Object(a["a"])(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){c=!0,o=e},f:function(){try{s||null==n["return"]||n["return"]()}finally{if(c)throw o}}}}},c607:function(e,t,n){var a=n("da84"),r=n("83ab"),i=n("fce3"),o=n("c6b6"),s=n("9bf2").f,c=n("69f3").get,l=RegExp.prototype,u=a.TypeError;r&&i&&s(l,"dotAll",{configurable:!0,get:function(){if(this!==l){if("RegExp"===o(this))return!!c(this).dotAll;throw u("Incompatible receiver, RegExp required")}}})},d81d:function(e,t,n){"use strict";var a=n("23e7"),r=n("b727").map,i=n("1dde"),o=i("map");a({target:"Array",proto:!0,forced:!o},{map:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},e676:function(e,t,n){},e9c4:function(e,t,n){var a=n("23e7"),r=n("da84"),i=n("d066"),o=n("2ba4"),s=n("e330"),c=n("d039"),l=r.Array,u=i("JSON","stringify"),f=s(/./.exec),d=s("".charAt),h=s("".charCodeAt),g=s("".replace),p=s(1..toString),v=/[\uD800-\uDFFF]/g,m=/^[\uD800-\uDBFF]$/,b=/^[\uDC00-\uDFFF]$/,y=function(e,t,n){var a=d(n,t-1),r=d(n,t+1);return f(m,e)&&!f(b,r)||f(b,e)&&!f(m,a)?"\\u"+p(h(e,0),16):e},w=c((function(){return'"\\udf06\\ud834"'!==u("\udf06\ud834")||'"\\udead"'!==u("\udead")}));u&&a({target:"JSON",stat:!0,forced:w},{stringify:function(e,t,n){for(var a=0,r=arguments.length,i=l(r);a<r;a++)i[a]=arguments[a];var s=o(u,null,i);return"string"==typeof s?g(s,v,y):s}})},f272:function(e,t,n){(function(t){n("d81d"),n("ac1f"),n("5319"),n("fb6a"),n("d3b7"),n("159b"),n("00b4"),n("466d"),n("e9c4"),n("25f0"),n("4d63"),n("c607"),n("2c3e"),n("a15b");var a="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},r=function(e){var t=/\blang(?:uage)?-([\w-]+)\b/i,n=0,a={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(t){return t instanceof r?new r(t.type,e(t.content),t.alias):Array.isArray(t)?t.map(e):t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function e(t,n){var r,i;switch(n=n||{},a.util.type(t)){case"Object":if(i=a.util.objId(t),n[i])return n[i];for(var o in r={},n[i]=r,t)t.hasOwnProperty(o)&&(r[o]=e(t[o],n));return r;case"Array":return i=a.util.objId(t),n[i]?n[i]:(r=[],n[i]=r,t.forEach((function(t,a){r[a]=e(t,n)})),r);default:return t}},getLanguage:function(e){for(;e&&!t.test(e.className);)e=e.parentElement;return e?(e.className.match(t)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(c){var e=(/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(c.stack)||[])[1];if(e){var t=document.getElementsByTagName("script");for(var n in t)if(t[n].src==e)return t[n]}return null}},isActive:function(e,t,n){for(var a="no-"+t;e;){var r=e.classList;if(r.contains(t))return!0;if(r.contains(a))return!1;e=e.parentElement}return!!n}},languages:{extend:function(e,t){var n=a.util.clone(a.languages[e]);for(var r in t)n[r]=t[r];return n},insertBefore:function(e,t,n,r){var i=(r=r||a.languages)[e],o={};for(var s in i)if(i.hasOwnProperty(s)){if(s==t)for(var c in n)n.hasOwnProperty(c)&&(o[c]=n[c]);n.hasOwnProperty(s)||(o[s]=i[s])}var l=r[e];return r[e]=o,a.languages.DFS(a.languages,(function(t,n){n===l&&t!=e&&(this[t]=o)})),o},DFS:function e(t,n,r,i){i=i||{};var o=a.util.objId;for(var s in t)if(t.hasOwnProperty(s)){n.call(t,s,t[s],r||s);var c=t[s],l=a.util.type(c);"Object"!==l||i[o(c)]?"Array"!==l||i[o(c)]||(i[o(c)]=!0,e(c,n,s,i)):(i[o(c)]=!0,e(c,n,null,i))}}},plugins:{},highlightAll:function(e,t){a.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var r={callback:n,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),a.hooks.run("before-all-elements-highlight",r);for(var i,o=0;i=r.elements[o++];)a.highlightElement(i,!0===t,r.callback)},highlightElement:function(n,r,i){var o=a.util.getLanguage(n),s=a.languages[o];n.className=n.className.replace(t,"").replace(/\s+/g," ")+" language-"+o;var c=n.parentElement;c&&"pre"===c.nodeName.toLowerCase()&&(c.className=c.className.replace(t,"").replace(/\s+/g," ")+" language-"+o);var l={element:n,language:o,grammar:s,code:n.textContent};function u(e){l.highlightedCode=e,a.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,a.hooks.run("after-highlight",l),a.hooks.run("complete",l),i&&i.call(l.element)}if(a.hooks.run("before-sanity-check",l),!l.code)return a.hooks.run("complete",l),void(i&&i.call(l.element));if(a.hooks.run("before-highlight",l),l.grammar)if(r&&e.Worker){var f=new Worker(a.filename);f.onmessage=function(e){u(e.data)},f.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}))}else u(a.highlight(l.code,l.grammar,l.language));else u(a.util.encode(l.code))},highlight:function(e,t,n){var i={code:e,grammar:t,language:n};return a.hooks.run("before-tokenize",i),i.tokens=a.tokenize(i.code,i.grammar),a.hooks.run("after-tokenize",i),r.stringify(a.util.encode(i.tokens),i.language)},tokenize:function(e,t){var n=t.rest;if(n){for(var c in n)t[c]=n[c];delete t.rest}var l=new i;return o(l,l.head,e),function e(t,n,i,c,l,u,f){for(var d in i)if(i.hasOwnProperty(d)&&i[d]){var h=i[d];h=Array.isArray(h)?h:[h];for(var g=0;g<h.length;++g){if(f&&f==d+","+g)return;var p=h[g],v=p.inside,m=!!p.lookbehind,b=!!p.greedy,y=0,w=p.alias;if(b&&!p.pattern.global){var k=p.pattern.toString().match(/[imsuy]*$/)[0];p.pattern=RegExp(p.pattern.source,k+"g")}p=p.pattern||p;for(var x=c.next,C=l;x!==n.tail;C+=x.value.length,x=x.next){var A=x.value;if(n.length>t.length)return;if(!(A instanceof r)){var _=1;if(b&&x!=n.tail.prev){p.lastIndex=C;var S=p.exec(t);if(!S)break;var E=S.index+(m&&S[1]?S[1].length:0),O=S.index+S[0].length,j=C;for(j+=x.value.length;j<=E;)x=x.next,j+=x.value.length;if(j-=x.value.length,C=j,x.value instanceof r)continue;for(var L=x;L!==n.tail&&(j<O||"string"==typeof L.value&&!L.prev.value.greedy);L=L.next)_++,j+=L.value.length;_--,A=t.slice(C,j),S.index-=C}else{p.lastIndex=0;S=p.exec(A)}if(S){m&&(y=S[1]?S[1].length:0);E=S.index+y,S=S[0].slice(y),O=E+S.length;var P=A.slice(0,E),R=A.slice(O),N=x.prev;P&&(N=o(n,N,P),C+=P.length),s(n,N,_);var I=new r(d,v?a.tokenize(S,v):S,w,S,b);if(x=o(n,N,I),R&&o(n,x,R),1<_&&e(t,n,i,x.prev,C,!0,d+","+g),u)break}else if(u)break}}}}}(e,l,t,l.head,0),function(e){for(var t=[],n=e.head.next;n!==e.tail;)t.push(n.value),n=n.next;return t}(l)},hooks:{all:{},add:function(e,t){var n=a.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=a.hooks.all[e];if(n&&n.length)for(var r,i=0;r=n[i++];)r(t)}},Token:r};function r(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.length=0|(a||"").length,this.greedy=!!r}function i(){var e={value:null,prev:null,next:null},t={value:null,prev:e,next:null};e.next=t,this.head=e,this.tail=t,this.length=0}function o(e,t,n){var a=t.next,r={value:n,prev:t,next:a};return t.next=r,a.prev=r,e.length++,r}function s(e,t,n){for(var a=t.next,r=0;r<n&&a!==e.tail;r++)a=a.next;(t.next=a).prev=t,e.length-=r}if(e.Prism=a,r.stringify=function e(t,n){if("string"==typeof t)return t;if(Array.isArray(t)){var r="";return t.forEach((function(t){r+=e(t,n)})),r}var i={type:t.type,content:e(t.content,n),tag:"span",classes:["token",t.type],attributes:{},language:n},o=t.alias;o&&(Array.isArray(o)?Array.prototype.push.apply(i.classes,o):i.classes.push(o)),a.hooks.run("wrap",i);var s="";for(var c in i.attributes)s+=" "+c+'="'+(i.attributes[c]||"").replace(/"/g,"&quot;")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+s+">"+i.content+"</"+i.tag+">"},!e.document)return e.addEventListener&&(a.disableWorkerMessageHandler||e.addEventListener("message",(function(t){var n=JSON.parse(t.data),r=n.language,i=n.code,o=n.immediateClose;e.postMessage(a.highlight(i,a.languages[r],r)),o&&e.close()}),!1)),a;var c=a.util.currentScript();function l(){a.manual||a.highlightAll()}if(c&&(a.filename=c.src,c.hasAttribute("data-manual")&&(a.manual=!0)),!a.manual){var u=document.readyState;"loading"===u||"interactive"===u&&c&&c.defer?document.addEventListener("DOMContentLoaded",l):window.requestAnimationFrame?window.requestAnimationFrame(l):window.setTimeout(l,16)}return a}(a);e.exports&&(e.exports=r),"undefined"!=typeof t&&(t.Prism=r),r.languages.lua={comment:/^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,string:{pattern:/(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,greedy:!0},number:/\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,keyword:/\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,function:/(?!\d)\w+(?=\s*(?:[({]))/,operator:[/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,{pattern:/(^|[^.])\.\.(?!\.)/,lookbehind:!0}],punctuation:/[\[\](){},;]|\.+|:+/}}).call(this,n("c8ba"))}}]);
//# sourceMappingURL=chunk-e12e042a.ae290312.js.map