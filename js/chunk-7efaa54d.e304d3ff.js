(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7efaa54d"],{"04d1":function(t,e,n){var a=n("342f"),i=a.match(/firefox\/(\d+)/i);t.exports=!!i&&+i[1]},"095a":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"v-story"},[n("el-tabs",{directives:[{name:"show",rawName:"v-show",value:t.isSchool,expression:"isSchool"}],attrs:{type:"card"},on:{"tab-click":t.loadData},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[n("el-tab-pane",{attrs:{label:"门派背景",name:"introduction"}}),n("el-tab-pane",{attrs:{label:"门派事记",name:"history"}}),n("el-tab-pane",{attrs:{label:"门派人物",name:"person"}})],1),n("div",{staticClass:"m-bps-story"},[t.data?["introduction"==t.active?n("div",{staticClass:"u-introduction"},t._l(t.data,(function(e,a){return n("p",{key:a},[t._v(t._s(e&&e.desc))])})),0):t._e(),"history"==t.active?n("div",{staticClass:"u-history"},t._l(t.data,(function(e,a){return n("div",{key:a,staticClass:"u-item"},[n("h2",{staticClass:"u-title u-name"},[t._v(t._s(e.name))]),t._l(e.descs,(function(e,a){return n("p",{key:a},[t._v(t._s(e&&e.desc))])}))],2)})),0):t._e(),"person"==t.active?n("div",{staticClass:"u-person"},t._l(t.data,(function(e,a){return n("div",{key:a,staticClass:"u-item"},[n("h2",{staticClass:"u-title"},[n("span",{staticClass:"u-name"},[t._v(t._s(e.name))]),n("span",{staticClass:"u-desc",class:"v"+e.level},[t._v(t._s(e.nameDesc||e.jobDesc))]),n("span",{staticClass:"u-age"},[t._v(t._s(e.age))])]),t._l(e.descs,(function(e,a){return n("p",{key:a},[t._v(t._s(e&&e.desc))])}))],2)})),0):t._e()]:n("el-alert",{attrs:{title:"没有相关资料",type:"info","show-icon":""}})],2)],1)},i=[],s=(n("d3b7"),n("4e82"),n("159b"),n("bc3a")),r=n.n(s),o=n("65c2"),c=o["__node"]+"bps/story/";function u(t,e){return r.a.get(c+t+"/"+e).catch((function(t){console.log(t)}))}var l=n("46d4"),d={name:"Story",props:[],data:function(){return{active:"introduction",data:"",loading:!1}},computed:{xf:function(){return this.$route.query.subtype||"通用"},force:function(){return l[this.xf]["force"]},isSchool:function(){return!!this.force}},methods:{loadData:function(){var t=this;this.loading=!0,u(this.active,this.force).then((function(e){var n=e.data.data;n&&("introduction"==t.active?(n.descs.sort((function(t,e){return t.part-e.part})),t.data=n.descs):(n.sort((function(t,e){return t.index-e.index})),n.forEach((function(t){t.descs.sort((function(t,e){return t.part-e.part}))})),t.data=n))})).finally((function(){t.loading=!1}))}},mounted:function(){this.loadData()},watch:{xf:function(){this.loadData()}},components:{}},f=d,v=(n("38b6"),n("2877")),h=Object(v["a"])(f,a,i,!1,null,null,null);e["default"]=h.exports},"38b6":function(t,e,n){"use strict";n("dd66")},"4e82":function(t,e,n){"use strict";var a=n("23e7"),i=n("59ed"),s=n("7b0b"),r=n("50c4"),o=n("577e"),c=n("d039"),u=n("addb"),l=n("a640"),d=n("04d1"),f=n("d998"),v=n("2d00"),h=n("512ce"),p=[],b=p.sort,_=c((function(){p.sort(void 0)})),m=c((function(){p.sort(null)})),g=l("sort"),w=!c((function(){if(v)return v<70;if(!(d&&d>3)){if(f)return!0;if(h)return h<603;var t,e,n,a,i="";for(t=65;t<76;t++){switch(e=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:n=3;break;case 68:case 71:n=4;break;default:n=2}for(a=0;a<47;a++)p.push({k:e+a,v:n})}for(p.sort((function(t,e){return e.v-t.v})),a=0;a<p.length;a++)e=p[a].k.charAt(0),i.charAt(i.length-1)!==e&&(i+=e);return"DGBEFHACIJK"!==i}})),y=_||!m||!g||!w,C=function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:o(e)>o(n)?1:-1}};a({target:"Array",proto:!0,forced:y},{sort:function(t){void 0!==t&&i(t);var e=s(this);if(w)return void 0===t?b.call(e):b.call(e,t);var n,a,o=[],c=r(e.length);for(a=0;a<c;a++)a in e&&o.push(e[a]);o=u(o,C(t)),n=o.length,a=0;while(a<n)e[a]=o[a++];while(a<c)delete e[a++];return e}})},"512ce":function(t,e,n){var a=n("342f"),i=a.match(/AppleWebKit\/(\d+)\./);t.exports=!!i&&+i[1]},addb:function(t,e){var n=Math.floor,a=function(t,e){var r=t.length,o=n(r/2);return r<8?i(t,e):s(a(t.slice(0,o),e),a(t.slice(o),e),e)},i=function(t,e){var n,a,i=t.length,s=1;while(s<i){a=s,n=t[s];while(a&&e(t[a-1],n)>0)t[a]=t[--a];a!==s++&&(t[a]=n)}return t},s=function(t,e,n){var a=t.length,i=e.length,s=0,r=0,o=[];while(s<a||r<i)s<a&&r<i?o.push(n(t[s],e[r])<=0?t[s++]:e[r++]):o.push(s<a?t[s++]:e[r++]);return o};t.exports=a},d998:function(t,e,n){var a=n("342f");t.exports=/MSIE|Trident/.test(a)},dd66:function(t,e,n){}}]);
//# sourceMappingURL=chunk-7efaa54d.e304d3ff.js.map