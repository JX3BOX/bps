(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04410214"],{"028d":function(t,e,n){"use strict";n("6c84")},"33a5":function(t){t.exports=JSON.parse('{"0":"江湖","1":"天策","2":"万花","3":"纯阳","4":"七秀","5":"少林","6":"藏剑","7":"丐帮","8":"明教","9":"五毒","10":"唐门","18":"苍云","19":"长歌","20":"霸刀","21":"蓬莱","22":"凌雪","23":"衍天","24":"药宗","26":"刀宗"}')},"51eb":function(t,e,n){"use strict";var i=n("825a"),a=n("485a"),r=TypeError;t.exports=function(t){if(i(this),"string"===t||"default"===t)t="string";else if("number"!==t)throw r("Incorrect hint");return a(this,t)}},5530:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n("b64b"),n("a4d3"),n("4de4"),n("d3b7"),n("e439"),n("14d9"),n("159b"),n("dbb4");var i=n("ade3");function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){Object(i["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}},"6c84":function(t,e,n){},8172:function(t,e,n){var i=n("e065"),a=n("57b9");i("toPrimitive"),a()},"91d4":function(t){t.exports=JSON.parse('{"0":"通用","10002":"洗髓经","10003":"易筋经","10014":"紫霞功","10015":"太虚剑意","10021":"花间游","10026":"傲血战意","10028":"离经易道","10062":"铁牢律","10080":"云裳心经","10081":"冰心诀","10144":"问水诀","10145":"山居剑意","10175":"毒经","10176":"补天诀","10224":"惊羽诀","10225":"天罗诡道","10242":"焚影圣诀","10243":"明尊琉璃体","10268":"笑尘诀","10389":"铁骨衣","10390":"分山劲","10447":"莫问","10448":"相知","10464":"北傲诀","10533":"凌海诀","10585":"隐龙诀","10615":"太玄经","10626":"灵素","10627":"无方","10698":"孤锋诀"}')},ade3:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var i=n("53ca");n("8172"),n("efec"),n("a4d3"),n("e01a"),n("d3b7"),n("d9e2"),n("a9e3");function a(t,e){if("object"!==Object(i["a"])(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var a=n.call(t,e||"default");if("object"!==Object(i["a"])(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}function r(t){var e=a(t,"string");return"symbol"===Object(i["a"])(e)?e:String(e)}function o(t,e,n){return e=r(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},bcff:function(t,e,n){"use strict";n.r(e);n("b0c0");var i=function(){var t=this,e=t._self._c;return e("AppLayout",[e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"v-collection"},[e("el-tabs",{attrs:{type:"card"},on:{"tab-click":t.changeTab},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(t.types,(function(n,i){return e("el-tab-pane",{key:i,attrs:{label:n.label,name:n.key}},[e("router-link",{staticClass:"u-tab-icon",attrs:{slot:"label",to:{name:"kungfu",query:{tab:n.key,subtype:t.subtype}}},slot:"label"},[e("i",{class:n.icon}),t._v(" "+t._s(n.label)+" ")]),e("div",{staticClass:"m-collection-box"},[e("div",{staticClass:"m-collection-header",domProps:{innerHTML:t._s(n.desc)}})]),t.data&&t.data.length?e("ul",{staticClass:"m-collection-list"},t._l(t.data,(function(n,i){return e("li",{key:i,staticClass:"u-item"},[e("a",{attrs:{href:t.getItemLink(n),target:"_blank"}},[e("img",{staticClass:"u-icon",attrs:{src:t.iconLink(n.icon,t.client)}}),e("span",{staticClass:"u-name"},[t._v(t._s(n.name))]),e("span",{staticClass:"u-xf"},[t._v(" ("+t._s(t.getBelongTo(n))+") ")]),e("span",{staticClass:"u-desc"},[t._v(t._s(n.desc))]),e("span",{staticClass:"u-remark"},[t._v(t._s(n.content))])])])})),0):e("el-empty",{attrs:{description:"当前心法暂无此类技能","image-size":180}})],1)})),1),e("div",{staticClass:"m-ladder-contributor"},[e("div",{staticClass:"u-label"},[t._v("❤️ 感谢以下人员的贡献")]),t.authors&&t.authors.length?e("div",{staticClass:"u-list"},t._l(t.authors,(function(n,i){return e("a",{key:i,staticClass:"u-author",attrs:{target:"_blank",href:t._f("authorLink")(n.ID)}},[e("img",{attrs:{src:t._f("showAvatar")(n.user_avatar),alt:n.display_name}}),t._v(" "+t._s(n.display_name)+" ")])})),0):t._e()])],1)])},a=[],r=n("5530"),o=(n("d3b7"),n("4de4"),n("d81d"),n("caad"),n("14d9"),n("793d")),c=n("c2be"),s=n("85e4"),u=n("46d4"),l=n("9eb6"),d=n("ed39"),b=n("33a5"),f=n("91d4"),p={name:"Collection",props:[],components:{AppLayout:o["a"]},data:function(){return{types:[],icons:{jianshang:"el-icon-sugar",diyu:"el-icon-dessert",wudi:"el-icon-ice-cream",kongzhi:"el-icon-hot-water",jiekong:"el-icon-cold-drink",qusan:"el-icon-watermelon",jianliao:"el-icon-grape",daduan:"el-icon-cherry",weiyi:"el-icon-apple",jixing:"el-icon-milk-tea",jiansu:"el-icon-lollipop",chaofeng:"el-icon-ice-cream-round",huifu:"el-icon-ice-drink"},type:"jianshang",authors:[],relation:l["mount_relation"],data:[],loading:!1}},computed:{subtype:function(){return this.$route.query.subtype},school:function(){var t;return null!==(t=u[this.subtype])&&void 0!==t&&t.school||"通用"===this.subtype?0:""},mount:function(){var t;return(null===(t=u[this.subtype])||void 0===t?void 0:t.id)||0},client:function(){return this.$store.state.client},contributors:function(){return"std"==this.$store.state.client?"bps_collection_authors":"bps_collection_authors_origin"}},watch:{type:function(t){this.loadData()},subtype:function(t){this.loadData()}},methods:{loadData:function(){var t=this;this.loading=!0;var e={group:this.type,client:this.client};""!==this.school&&(e.school=this.school),Object(d["c"])(e).then((function(e){t.data=e.data.data.filter((function(e){return(null===e||void 0===e?void 0:e.mount)==t.mount||!(null!==e&&void 0!==e&&e.mount)}))})).finally((function(){t.loading=!1}))},loadGroup:function(){var t=this;Object(d["b"])().then((function(e){t.types=e.data.data.map((function(e){return Object(r["a"])(Object(r["a"])({},e),{},{icon:t.icons[e.name],key:e.name})})).filter((function(t){return!["chuanci","chuantou","guanti"].includes(t.name)}))}))},getItemLink:function(t){return Object(s["getLink"])(t.type||"skill",t.id)},changeTab:function(t){this.$router.push({query:{tab:t.name,subtype:this.subtype}})},iconLink:s["iconLink"],getBelongTo:function(t){var e=t.school,n=t.mount;return n?f[n]:b[e]}},filters:{showXfIcon:function(t){return u[t]&&Object(s["iconLink"])(u[t]["icon"],this.c)},authorLink:s["authorLink"],showAvatar:s["showAvatar"]},mounted:function(){var t=this;this.loadGroup(),this.loadData(),Object(c["a"])(this.contributors).then((function(e){e&&Object(c["d"])(e).then((function(e){t.authors=e||[]}))})),this.$route.query.tab&&(this.type=this.$route.query.tab)}},h=p,m=(n("028d"),n("2877")),v=Object(m["a"])(h,i,a,!1,null,null,null);e["default"]=v.exports},c2be:function(t,e,n){"use strict";n.d(e,"d",(function(){return r})),n.d(e,"a",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"b",(function(){return o}));var i=n("41cb");function a(t){return Object(i["b"])().get("/api/breadcrumb/".concat(t)).then((function(t){return t.data.data.breadcrumb.html}))}function r(t){return Object(i["a"])().get("/api/cms/user/list/info",{params:{list:t}}).then((function(t){return t.data.data}))}function o(t){return Object(i["a"])().get("/api/cms/bps/dps/group",{params:t})}function c(t){return Object(i["a"])().get("/api/cms/bps/dps/group/".concat(t))}},dbb4:function(t,e,n){var i=n("23e7"),a=n("83ab"),r=n("56ef"),o=n("fc6a"),c=n("06cf"),s=n("8418");i({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(t){var e,n,i=o(t),a=c.f,u=r(i),l={},d=0;while(u.length>d)n=a(i,e=u[d++]),void 0!==n&&s(l,e,n);return l}})},e439:function(t,e,n){var i=n("23e7"),a=n("d039"),r=n("fc6a"),o=n("06cf").f,c=n("83ab"),s=!c||a((function(){o(1)}));i({target:"Object",stat:!0,forced:s,sham:!c},{getOwnPropertyDescriptor:function(t,e){return o(r(t),e)}})},efec:function(t,e,n){var i=n("1a2d"),a=n("cb2d"),r=n("51eb"),o=n("b622"),c=o("toPrimitive"),s=Date.prototype;i(s,c)||a(s,c,r)}}]);
//# sourceMappingURL=chunk-04410214.f26c93e5.js.map