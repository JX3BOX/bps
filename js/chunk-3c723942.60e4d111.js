(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c723942"],{"00cc":function(e,t,n){"use strict";var a=n("e676"),r=n.n(a);r.a},"07ac":function(e,t,n){var a=n("23e7"),r=n("6f53").values;a({target:"Object",stat:!0},{values:function(e){return r(e)}})},"159b":function(e,t,n){var a=n("da84"),r=n("fdbc"),i=n("17c2"),o=n("9112");for(var s in r){var l=a[s],c=l&&l.prototype;if(c&&c.forEach!==i)try{o(c,"forEach",i)}catch(u){c.forEach=i}}},"17c2":function(e,t,n){"use strict";var a=n("b727").forEach,r=n("a640"),i=n("ae40"),o=r("forEach"),s=i("forEach");e.exports=o&&s?[].forEach:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}},3450:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isSuperAuthor?n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"v-lua"},[n("div",{staticClass:"m-lua-index m-lua-box"},[n("div",{staticClass:"u-title"},[n("i",{staticClass:"el-icon-collection-tag"}),n("span",{staticClass:"u-title-list",on:{click:e.showList}},[e._v("文件夹")])]),e._l(e.schoolmap,(function(t,a){return n("div",{key:a,staticClass:"u-type",class:{on:e.current==a},on:{click:function(t){return e.changeType(a)}}},[n("img",{staticClass:"u-typeicon",attrs:{src:e._f("iconURL")(a)}}),n("span",[e._v(e._s(a))])])}))],2),n("el-alert",{staticClass:"m-lua-warning",attrs:{title:"本功能仅内部作者可见，仅作为攻略写作的参考资料。禁止外传，违者后果自负！",type:"error",effect:"dark","show-icon":""}}),n("div",{staticClass:"m-lua-tree m-lua-box"},[n("div",{staticClass:"u-title"},[n("i",{staticClass:"el-icon-collection-tag"}),n("span",{staticClass:"u-title-list",on:{click:e.showList}},[e._v("文件列表")]),n("span",{staticClass:"u-title-file"},[n("i",{staticClass:"el-icon-arrow-right"}),e._v(" "+e._s(e.file))]),n("div",{staticClass:"u-back",on:{click:e.showList}},[n("i",{staticClass:"el-icon-caret-left"}),e._v(" 返 回 ")])]),e._l(e.map,(function(t,a){return n("div",{directives:[{name:"show",rawName:"v-show",value:a==e.current&&!e.data,expression:"group == current && !data"}],key:a,staticClass:"u-item"},e._l(t,(function(t,r){return n("div",{key:r,staticClass:"u-subitem"},[n("div",{staticClass:"u-wrapper"},[e.isDirectory(t)?n("div",{staticClass:"u-container"},[n("div",{staticClass:"u-folder",on:{click:function(t){return e.showSubtree(t,a+r)}}},[n("i",{staticClass:"el-icon-folder"}),e._v(" "+e._s(r)+" ")]),n("div",{ref:a+r,refInFor:!0,staticClass:"u-subtree"},e._l(t,(function(t,a){return n("div",{key:a,staticClass:"u-leaf",on:{click:function(n){return e.showCode(t)}}},[n("i",{staticClass:"el-icon-tickets"}),e._v(" "+e._s(t)+" ")])})),0)]):n("div",{staticClass:"u-leaf",on:{click:function(n){return e.showCode(t)}}},[n("i",{staticClass:"el-icon-tickets"}),e._v(" "+e._s(r)+" ")])])])})),0)})),n("div",{directives:[{name:"show",rawName:"v-show",value:e.data,expression:"data"}],staticClass:"u-data"},[n("div",{ref:"lua",staticClass:"u-code"},[n("pre",[n("code",{staticClass:"language-lua",attrs:{id:"lua"}},[e._v(e._s(e.data))])])])])],2)],1):n("div",{staticClass:"v-null"},[n("el-alert",{attrs:{title:"没有查看权限",type:"warning","show-icon":""}})],1)},r=[],i=(n("c975"),n("d81d"),n("b64b"),n("d3b7"),n("07ac"),n("bc3a")),o=n.n(i),s=n("64c7"),l=s["__ossMirror"]+"static/kungfu/",c="200702";function u(){return o.a.get(l+"map.json").then((function(e){return e.data})).catch((function(e){console.log(e)}))}function f(e){return o.a.get(l+e+"?version="+c,{headers:{"content-type":"text/plain"}}).then((function(e){return e.data})).catch((function(e){console.log(e)}))}var d=n("7aaa"),h=n("46d4"),g=(n("f272"),n("a326"),n("c9d2")),v=n.n(g),p={name:"Lua",props:[],data:function(){return{loading:!1,map:{},schoolmap:d,current:"",data:"",file:"",isSuperAuthor:v.a.isSuperAuthor()}},computed:{subtype:function(){return this.$store.state.subtype},school:function(){var e=this.subtype||"通用";return h[e]["school"]},school_name:function(){var e=Object.keys(d),t=Object.values(d),n=t.indexOf(this.school);return n>=0?e[n]:""}},methods:{isDirectory:function(e){return Array.isArray(e)},showSubtree:function(e,t){this.$refs[t][0]["classList"].toggle("on")},showCode:function(e){this.file=e,this.loadLua(e)},showList:function(){this.file=this.current,this.data=""},loadMap:function(){var e=this;this.loading=!0,u().then((function(t){e.map=t})).finally((function(){e.loading=!1}))},loadLua:function(e){var t=this;this.loading=!0,f(e).then((function(e){t.data=e})).then((function(){var e=t.$refs.lua;e&&Prism.highlightAllUnder(e)})).finally((function(){t.loading=!1}))},changeType:function(e){this.file=this.current=e,this.data=""}},filters:{iconURL:function(e){return s["__imgPath"]+"image/school/"+d[e]+".png"}},mounted:function(){this.isSuperAuthor&&(this.current=this.school_name,this.loadMap())},components:{}},m=p,y=(n("00cc"),n("2877")),b=Object(y["a"])(m,a,r,!1,null,null,null);t["default"]=b.exports},4160:function(e,t,n){"use strict";var a=n("23e7"),r=n("17c2");a({target:"Array",proto:!0,forced:[].forEach!=r},{forEach:r})},"466d":function(e,t,n){"use strict";var a=n("d784"),r=n("825a"),i=n("50c4"),o=n("1d80"),s=n("8aa5"),l=n("14c3");a("match",1,(function(e,t,n){return[function(t){var n=o(this),a=void 0==t?void 0:t[e];return void 0!==a?a.call(t,n):new RegExp(t)[e](String(n))},function(e){var a=n(t,e,this);if(a.done)return a.value;var o=r(e),c=String(this);if(!o.global)return l(o,c);var u=o.unicode;o.lastIndex=0;var f,d=[],h=0;while(null!==(f=l(o,c))){var g=String(f[0]);d[h]=g,""===g&&(o.lastIndex=s(c,i(o.lastIndex),u)),h++}return 0===h?null:d}]}))},"4d63":function(e,t,n){var a=n("83ab"),r=n("da84"),i=n("94ca"),o=n("7156"),s=n("9bf2").f,l=n("241c").f,c=n("44e7"),u=n("ad6d"),f=n("9f7f"),d=n("6eeb"),h=n("d039"),g=n("69f3").set,v=n("2626"),p=n("b622"),m=p("match"),y=r.RegExp,b=y.prototype,w=/a/g,k=/a/g,x=new y(w)!==w,C=f.UNSUPPORTED_Y,_=a&&i("RegExp",!x||C||h((function(){return k[m]=!1,y(w)!=w||y(k)==k||"/a/i"!=y(w,"i")})));if(_){var A=function(e,t){var n,a=this instanceof A,r=c(e),i=void 0===t;if(!a&&r&&e.constructor===A&&i)return e;x?r&&!i&&(e=e.source):e instanceof A&&(i&&(t=u.call(e)),e=e.source),C&&(n=!!t&&t.indexOf("y")>-1,n&&(t=t.replace(/y/g,"")));var s=o(x?new y(e,t):y(e,t),a?this:b,A);return C&&n&&g(s,{sticky:n}),s},E=function(e){e in A||s(A,e,{configurable:!0,get:function(){return y[e]},set:function(t){y[e]=t}})},S=l(y),O=0;while(S.length>O)E(S[O++]);b.constructor=A,A.prototype=b,d(r,"RegExp",A)}v("RegExp")},"6f53":function(e,t,n){var a=n("83ab"),r=n("df75"),i=n("fc6a"),o=n("d1e7").f,s=function(e){return function(t){var n,s=i(t),l=r(s),c=l.length,u=0,f=[];while(c>u)n=l[u++],a&&!o.call(s,n)||f.push(e?[n,s[n]]:s[n]);return f}};e.exports={entries:s(!0),values:s(!1)}},7156:function(e,t,n){var a=n("861d"),r=n("d2bb");e.exports=function(e,t,n){var i,o;return r&&"function"==typeof(i=t.constructor)&&i!==n&&a(o=i.prototype)&&o!==n.prototype&&r(e,o),e}},"7aaa":function(e){e.exports=JSON.parse('{"七秀":4,"万花":2,"五毒":9,"长歌":19,"天策":1,"少林":5,"明教":8,"苍云":18,"纯阳":3,"唐门":10,"藏剑":6,"丐帮":7,"霸刀":20,"蓬莱":21,"凌雪阁":22,"衍天宗":23,"江湖":0,"物品":"item","装备":"equip","轻功":"fly","经脉":"jm","阵法":"zf"}')},a15b:function(e,t,n){"use strict";var a=n("23e7"),r=n("44ad"),i=n("fc6a"),o=n("a640"),s=[].join,l=r!=Object,c=o("join",",");a({target:"Array",proto:!0,forced:l||!c},{join:function(e){return s.call(i(this),void 0===e?",":e)}})},a326:function(e,t,n){},b64b:function(e,t,n){var a=n("23e7"),r=n("7b0b"),i=n("df75"),o=n("d039"),s=o((function(){i(1)}));a({target:"Object",stat:!0,forced:s},{keys:function(e){return i(r(e))}})},d81d:function(e,t,n){"use strict";var a=n("23e7"),r=n("b727").map,i=n("1dde"),o=n("ae40"),s=i("map"),l=o("map");a({target:"Array",proto:!0,forced:!s||!l},{map:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},e676:function(e,t,n){},f272:function(e,t,n){(function(t){n("4160"),n("a15b"),n("d81d"),n("fb6a"),n("d3b7"),n("4d63"),n("ac1f"),n("25f0"),n("466d"),n("5319"),n("159b");var a="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},r=function(e){var t=/\blang(?:uage)?-([\w-]+)\b/i,n=0,a={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(t){return t instanceof r?new r(t.type,e(t.content),t.alias):Array.isArray(t)?t.map(e):t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function e(t,n){var r,i;switch(n=n||{},a.util.type(t)){case"Object":if(i=a.util.objId(t),n[i])return n[i];for(var o in r={},n[i]=r,t)t.hasOwnProperty(o)&&(r[o]=e(t[o],n));return r;case"Array":return i=a.util.objId(t),n[i]?n[i]:(r=[],n[i]=r,t.forEach((function(t,a){r[a]=e(t,n)})),r);default:return t}},getLanguage:function(e){for(;e&&!t.test(e.className);)e=e.parentElement;return e?(e.className.match(t)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(l){var e=(/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(l.stack)||[])[1];if(e){var t=document.getElementsByTagName("script");for(var n in t)if(t[n].src==e)return t[n]}return null}},isActive:function(e,t,n){for(var a="no-"+t;e;){var r=e.classList;if(r.contains(t))return!0;if(r.contains(a))return!1;e=e.parentElement}return!!n}},languages:{extend:function(e,t){var n=a.util.clone(a.languages[e]);for(var r in t)n[r]=t[r];return n},insertBefore:function(e,t,n,r){var i=(r=r||a.languages)[e],o={};for(var s in i)if(i.hasOwnProperty(s)){if(s==t)for(var l in n)n.hasOwnProperty(l)&&(o[l]=n[l]);n.hasOwnProperty(s)||(o[s]=i[s])}var c=r[e];return r[e]=o,a.languages.DFS(a.languages,(function(t,n){n===c&&t!=e&&(this[t]=o)})),o},DFS:function e(t,n,r,i){i=i||{};var o=a.util.objId;for(var s in t)if(t.hasOwnProperty(s)){n.call(t,s,t[s],r||s);var l=t[s],c=a.util.type(l);"Object"!==c||i[o(l)]?"Array"!==c||i[o(l)]||(i[o(l)]=!0,e(l,n,s,i)):(i[o(l)]=!0,e(l,n,null,i))}}},plugins:{},highlightAll:function(e,t){a.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var r={callback:n,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),a.hooks.run("before-all-elements-highlight",r);for(var i,o=0;i=r.elements[o++];)a.highlightElement(i,!0===t,r.callback)},highlightElement:function(n,r,i){var o=a.util.getLanguage(n),s=a.languages[o];n.className=n.className.replace(t,"").replace(/\s+/g," ")+" language-"+o;var l=n.parentElement;l&&"pre"===l.nodeName.toLowerCase()&&(l.className=l.className.replace(t,"").replace(/\s+/g," ")+" language-"+o);var c={element:n,language:o,grammar:s,code:n.textContent};function u(e){c.highlightedCode=e,a.hooks.run("before-insert",c),c.element.innerHTML=c.highlightedCode,a.hooks.run("after-highlight",c),a.hooks.run("complete",c),i&&i.call(c.element)}if(a.hooks.run("before-sanity-check",c),!c.code)return a.hooks.run("complete",c),void(i&&i.call(c.element));if(a.hooks.run("before-highlight",c),c.grammar)if(r&&e.Worker){var f=new Worker(a.filename);f.onmessage=function(e){u(e.data)},f.postMessage(JSON.stringify({language:c.language,code:c.code,immediateClose:!0}))}else u(a.highlight(c.code,c.grammar,c.language));else u(a.util.encode(c.code))},highlight:function(e,t,n){var i={code:e,grammar:t,language:n};return a.hooks.run("before-tokenize",i),i.tokens=a.tokenize(i.code,i.grammar),a.hooks.run("after-tokenize",i),r.stringify(a.util.encode(i.tokens),i.language)},tokenize:function(e,t){var n=t.rest;if(n){for(var l in n)t[l]=n[l];delete t.rest}var c=new i;return o(c,c.head,e),function e(t,n,i,l,c,u,f){for(var d in i)if(i.hasOwnProperty(d)&&i[d]){var h=i[d];h=Array.isArray(h)?h:[h];for(var g=0;g<h.length;++g){if(f&&f==d+","+g)return;var v=h[g],p=v.inside,m=!!v.lookbehind,y=!!v.greedy,b=0,w=v.alias;if(y&&!v.pattern.global){var k=v.pattern.toString().match(/[imsuy]*$/)[0];v.pattern=RegExp(v.pattern.source,k+"g")}v=v.pattern||v;for(var x=l.next,C=c;x!==n.tail;C+=x.value.length,x=x.next){var _=x.value;if(n.length>t.length)return;if(!(_ instanceof r)){var A=1;if(y&&x!=n.tail.prev){v.lastIndex=C;var E=v.exec(t);if(!E)break;var S=E.index+(m&&E[1]?E[1].length:0),O=E.index+E[0].length,j=C;for(j+=x.value.length;j<=S;)x=x.next,j+=x.value.length;if(j-=x.value.length,C=j,x.value instanceof r)continue;for(var L=x;L!==n.tail&&(j<O||"string"==typeof L.value&&!L.prev.value.greedy);L=L.next)A++,j+=L.value.length;A--,_=t.slice(C,j),E.index-=C}else{v.lastIndex=0;E=v.exec(_)}if(E){m&&(b=E[1]?E[1].length:0);S=E.index+b,E=E[0].slice(b),O=S+E.length;var P=_.slice(0,S),N=_.slice(O),I=x.prev;P&&(I=o(n,I,P),C+=P.length),s(n,I,A);var M=new r(d,p?a.tokenize(E,p):E,w,E,y);if(x=o(n,I,M),N&&o(n,x,N),1<A&&e(t,n,i,x.prev,C,!0,d+","+g),u)break}else if(u)break}}}}}(e,c,t,c.head,0),function(e){for(var t=[],n=e.head.next;n!==e.tail;)t.push(n.value),n=n.next;return t}(c)},hooks:{all:{},add:function(e,t){var n=a.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=a.hooks.all[e];if(n&&n.length)for(var r,i=0;r=n[i++];)r(t)}},Token:r};function r(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.length=0|(a||"").length,this.greedy=!!r}function i(){var e={value:null,prev:null,next:null},t={value:null,prev:e,next:null};e.next=t,this.head=e,this.tail=t,this.length=0}function o(e,t,n){var a=t.next,r={value:n,prev:t,next:a};return t.next=r,a.prev=r,e.length++,r}function s(e,t,n){for(var a=t.next,r=0;r<n&&a!==e.tail;r++)a=a.next;(t.next=a).prev=t,e.length-=r}if(e.Prism=a,r.stringify=function e(t,n){if("string"==typeof t)return t;if(Array.isArray(t)){var r="";return t.forEach((function(t){r+=e(t,n)})),r}var i={type:t.type,content:e(t.content,n),tag:"span",classes:["token",t.type],attributes:{},language:n},o=t.alias;o&&(Array.isArray(o)?Array.prototype.push.apply(i.classes,o):i.classes.push(o)),a.hooks.run("wrap",i);var s="";for(var l in i.attributes)s+=" "+l+'="'+(i.attributes[l]||"").replace(/"/g,"&quot;")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+s+">"+i.content+"</"+i.tag+">"},!e.document)return e.addEventListener&&(a.disableWorkerMessageHandler||e.addEventListener("message",(function(t){var n=JSON.parse(t.data),r=n.language,i=n.code,o=n.immediateClose;e.postMessage(a.highlight(i,a.languages[r],r)),o&&e.close()}),!1)),a;var l=a.util.currentScript();function c(){a.manual||a.highlightAll()}if(l&&(a.filename=l.src,l.hasAttribute("data-manual")&&(a.manual=!0)),!a.manual){var u=document.readyState;"loading"===u||"interactive"===u&&l&&l.defer?document.addEventListener("DOMContentLoaded",c):window.requestAnimationFrame?window.requestAnimationFrame(c):window.setTimeout(c,16)}return a}(a);e.exports&&(e.exports=r),"undefined"!=typeof t&&(t.Prism=r),r.languages.lua={comment:/^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,string:{pattern:/(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,greedy:!0},number:/\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,keyword:/\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,function:/(?!\d)\w+(?=\s*(?:[({]))/,operator:[/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,{pattern:/(^|[^.])\.\.(?!\.)/,lookbehind:!0}],punctuation:/[\[\](){},;]|\.+|:+/}}).call(this,n("c8ba"))}}]);
//# sourceMappingURL=chunk-3c723942.60e4d111.js.map