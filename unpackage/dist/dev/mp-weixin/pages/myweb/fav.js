require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([5],{172:function(e,t,n){"use strict";var r=a(n(4)),o=a(n(173));function a(e){return e&&e.__esModule?e:{default:e}}Page((0,r.default)(o.default))},173:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(175),o=n.n(r),a=n(180),i=!1;var s=function(e){i||n(174)},u=n(0)(o.a,a.a,s,null,null);u.options.__file="..\\..\\..\\..\\用户目录\\我的文档\\HBuilderProjects\\ysv8\\pages\\myweb\\fav.vue",u.esModule&&Object.keys(u.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),u.options.functional&&console.error("[vue-loader] fav.vue: functional components are not supported with templates, they should use render functions."),t.default=u.exports},174:function(e,t){},175:function(e,t,n){"use strict";(function(e){var r;Object.defineProperty(t,"__esModule",{value:!0});var o=u(n(2)),a=u(n(15)),i=u(n(11)),s=u(n(176));function u(e){return e&&e.__esModule?e:{default:e}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.default=(l(r={components:{mediaList:i.default,uniSegmentedControl:s.default},data:function(){return{title:o.default.title,datalook:[],datafav:[],datacom:[],items:["历史","收藏","精华"],current:0,activeColor:"#007aff",styleType:"button"}},methods:{goDetail:function(t){e.navigateTo({url:"t?id="+t.id+"&website="+t.website})},onClickItem:function(e){this.current!==e&&(this.current=e)}},onLoad:function(e){a.default.datalook.reverse();var t=o.default.setdata(a.default.datalook,"down",[],0);1==o.default.isArray(t)&&(this.datalook=t[0]),a.default.datafav.reverse();t=o.default.setdata(a.default.datafav,"down",[],0);1==o.default.isArray(t)&&(this.datafav=t[0]),a.default.datacom.reverse();t=o.default.setdata(a.default.datacom,"down",[],0);1==o.default.isArray(t)&&(this.datacom=t[0]),e.id&&(this.current=Number(e.id)),this.setNaivgationBarTitle(this.items[this.current])}},"methods",{setNaivgationBarTitle:function(t){this.title=t,e.setNavigationBarTitle({title:t})}}),l(r,"onShareAppMessage",function(){return{title:this.title+"_YSV8简单网站",path:"/pages/index/index"}}),r)}).call(t,n(1).default)},176:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(178),o=n.n(r),a=n(179),i=!1;var s=function(e){i||n(177)},u=n(0)(o.a,a.a,s,null,null);u.options.__file="..\\..\\..\\..\\用户目录\\我的文档\\HBuilderProjects\\ysv8\\components\\uni-segmented-control.vue",u.esModule&&Object.keys(u.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),u.options.functional&&console.error("[vue-loader] uni-segmented-control.vue: functional components are not supported with templates, they should use render functions."),t.default=u.exports},177:function(e,t){},178:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"segmented-control",props:{current:{type:Number,default:0},values:{type:Array,default:function(){return[]}},activeColor:{type:String,default:"#007aff"},styleType:{type:String,default:"button"}},data:function(){return{currentIndex:this.current}},watch:{current:function(e){e!==this.currentIndex&&(this.currentIndex=e)}},computed:{wrapStyle:function(){var e="";switch(this.styleType){case"text":e="border:0;";break;default:e="border-color: "+this.activeColor}return e},itemStyle:function(){var e="";switch(this.styleType){case"text":e="color:#000;border-left:0;";break;default:e="color:"+this.activeColor+";border-color:"+this.activeColor+";"}return e},activeStyle:function(){var e="";switch(this.styleType){case"text":e="color:"+this.activeColor+";border-left:0;border-bottom-style:solid;";break;default:e="color:#fff;border-color:"+this.activeColor+";background-color:"+this.activeColor}return e}},methods:{onClick:function(e){this.currentIndex!==e&&(this.currentIndex=e,this.$emit("clickItem",e))}}}},179:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("view",{staticClass:"segmented-control",class:e.styleType,style:e.wrapStyle},e._l(e.values,function(t,r){return n("view",{key:r,staticClass:"segmented-control-item",class:e.styleType,style:r===e.currentIndex?e.activeStyle:e.itemStyle,attrs:{eventid:"kUl-0-"+r},on:{click:function(t){e.onClick(r)}}},[e._v("\n\t\t"+e._s(t)+"\n\t")])}))};r._withStripped=!0;var o={render:r,staticRenderFns:[]};t.a=o},180:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("view",[n("view",{staticClass:"uni-padding-wrap uni-common-mt"},[n("uni-segmented-control",{attrs:{current:e.current,values:e.items,styleType:e.styleType,activeColor:e.activeColor,eventid:"a0a-0",mpcomid:"e2p-0"},on:{clickItem:e.onClickItem}})],1),n("view",{staticClass:"content"},[n("view",{directives:[{name:"show",rawName:"v-show",value:0===e.current,expression:"current === 0"}]},e._l(e.datalook,function(t,r){return n("block",{key:r},[n("media-list",{attrs:{data:t,eventid:"VJT-1-"+r,mpcomid:"iXJ-1-"+r},on:{click:function(n){e.goDetail(t)}}})],1)})),n("view",{directives:[{name:"show",rawName:"v-show",value:1===e.current,expression:"current === 1"}]},e._l(e.datafav,function(t,r){return n("block",{key:r},[n("media-list",{attrs:{data:t,eventid:"ZuH-2-"+r,mpcomid:"Yqy-2-"+r},on:{click:function(n){e.goDetail(t)}}})],1)})),n("view",{directives:[{name:"show",rawName:"v-show",value:2===e.current,expression:"current === 2"}]},e._l(e.datacom,function(t,r){return n("block",{key:r},[n("media-list",{attrs:{data:t,eventid:"aD0-3-"+r,mpcomid:"EuC-3-"+r},on:{click:function(n){e.goDetail(t)}}})],1)}))])])};r._withStripped=!0;var o={render:r,staticRenderFns:[]};t.a=o}},[172]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/myweb/fav.js.map