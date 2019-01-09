require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([1],{195:function(t,e,i){"use strict";var s=n(i(4)),a=n(i(196));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,s.default)(a.default))},196:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(198),a=i.n(s),n=i(207),l=!1;var u=function(t){l||i(197)},o=i(0)(a.a,n.a,u,null,null);o.options.__file="..\\..\\..\\..\\用户目录\\我的文档\\HBuilderProjects\\ysv8\\pages\\user\\index.vue",o.esModule&&Object.keys(o.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),e.default=o.exports},197:function(t,e){},198:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var s=l(i(2)),a=l(i(199)),n=l(i(203));function l(t){return t&&t.__esModule?t:{default:t}}e.default={components:{login:a.default,uniBadge:n.default},data:function(){return{islogin:!1,userdata:s.default.userdata,bucketcdn:s.default.bucketcdn}},methods:{gonav:function(e){t.navigateTo({url:"/pages/"+e})},websiteadd:function(e){t.navigateTo({url:"/pages/user/web?url=https://"+s.default.lang+".ysv8.com/website"})},timestr:function(t){return s.default.timeStamp2String(t)},autotext:function(t){return s.default.langfun(t)},setislogin:function(t){var e=JSON.parse(t);this.islogin=t,"200"==e.code?(this.islogin=!0,this.userdata=e.my,s.default.localStorage.setItem("user",JSON.stringify(e.my))):this.islogin=!1},out:function(){this.islogin=!1,s.default.ysv8hex}},onLoad:function(t){var e=this;t.data||setTimeout(function(){e.$refs.login.getdata()})}}}).call(e,i(1).default)},199:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(201),a=i.n(s),n=i(202),l=!1;var u=function(t){l||i(200)},o=i(0)(a.a,n.a,u,null,null);o.options.__file="..\\..\\..\\..\\用户目录\\我的文档\\HBuilderProjects\\ysv8\\components\\ysv8\\login.vue",o.esModule&&Object.keys(o.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions."),e.default=o.exports},200:function(t,e){},201:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var s,a=i(2),n=(s=a)&&s.__esModule?s:{default:s};e.default={name:"login",props:["islogin"],data:function(){return{add:!1,btext:"登录",stext:"注册",regid:"login"}},methods:{formSubmit:function(e){var i=this,s=e.detail.value;t.request({method:"POST",url:n.default.www+"user/"+this.regid+".api",data:s,success:function(e){var s=e.data;"200"==s.code?(void 0!==s.hex&&(n.default.ysv8hex=s.hex,n.default.localStorage.setItem("ysv8hex",s.hex)),i.getdata()):t.showModal({content:s.info,showCancel:!1})},fail:function(e){t.showModal({content:e.errMsg,showCancel:!1})},complete:function(){}})},getdata:function(){var e=this;t.request({method:"POST",url:n.default.www+"user/get.api",data:{YSV8_HEX:n.default.ysv8hex},success:function(t){var i=t.data;e.$emit("Changed",JSON.stringify(i))},fail:function(e){t.showModal({content:e.errMsg,showCancel:!1})},complete:function(){}})},setadd:function(){this.add?(this.add=!1,this.btext="登录",this.stext="注册",this.regid="login"):(this.add=!0,this.stext="登录",this.btext="注册",this.regid="add")},safepw:function(){t.navigateTo({url:"/pages/user/web?url=https://"+n.default.lang+".ysv8.com/cp/aq"})},formReset:function(t){}}}}).call(e,i(1).default)},202:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",[i("view",{staticClass:"uni-padding-wrap"},[i("form",{attrs:{eventid:"Ksd-2"},on:{submit:t.formSubmit,reset:t.formReset}},[i("view",[i("view",{staticClass:"uni-title"},[t._v("账号")]),i("view",{staticClass:"uni-list"},[i("view",{staticClass:"uni-list-cell"},[i("input",{staticClass:"uni-input",attrs:{name:"user",focus:"",placeholder:"账号"}})])])]),i("view",[i("view",{staticClass:"uni-title"},[t._v("密码")]),i("view",{staticClass:"uni-list"},[i("view",{staticClass:"uni-list-cell"},[i("input",{staticClass:"uni-input",attrs:{name:"pass",password:"",placeholder:"密码"}})])])]),t.add?i("view",[i("view",{staticClass:"uni-title"},[t._v("密码重复")]),i("view",{staticClass:"uni-list"},[i("view",{staticClass:"uni-list-cell"},[i("input",{staticClass:"uni-input",attrs:{name:"pass2",password:"",placeholder:"密码重复"}})])])]):t._e(),t.add?i("view",[i("view",{staticClass:"uni-title"},[t._v("电子邮箱")]),i("view",{staticClass:"uni-list"},[i("view",{staticClass:"uni-list-cell"},[i("input",{staticClass:"uni-input",attrs:{name:"email",placeholder:"邮箱",value:"@qq.com"}})])])]):t._e(),i("view",{staticClass:"uni-btn-v uni-common-mt"},[i("button",{staticClass:"btn-submit",attrs:{type:"primary",formType:"submit"}},[t._v(t._s(t.btext))]),i("view",{staticClass:"row c"},[i("view",{staticClass:"col"},[i("view",{staticClass:"col_6"},[i("view",{staticClass:"mui-btn mui-btn-block mui-btn-success",attrs:{id:"mima",eventid:"Oip-0"},on:{click:t.safepw}},[t._v("动态密码")])]),i("view",{staticClass:"col_6"},[i("view",{staticClass:"btn-submit",attrs:{type:"primary",eventid:"scF-1"},on:{click:t.setadd}},[t._v(t._s(t.stext))])])])])],1)])],1)])};s._withStripped=!0;var a={render:s,staticRenderFns:[]};e.a=a},203:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(205),a=i.n(s),n=i(206),l=!1;var u=function(t){l||i(204)},o=i(0)(a.a,n.a,u,null,null);o.options.__file="..\\..\\..\\..\\用户目录\\我的文档\\HBuilderProjects\\ysv8\\components\\uni-badge.vue",o.esModule&&Object.keys(o.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] uni-badge.vue: functional components are not supported with templates, they should use render functions."),e.default=o.exports},204:function(t,e){},205:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:String,default:""},size:{type:String,default:"normal"}},computed:{setClass:function(){var t=["uni-badge-"+this.type,"uni-badge-size-"+this.size];return!0===this.inverted&&t.push("uni-badge-inverted"),t.join(" ")}},methods:{onClick:function(){this.$emit("click")}}}},206:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.text?i("text",{staticClass:"uni-badge",class:t.setClass,attrs:{eventid:"wpg-0"},on:{click:function(e){t.onClick()}}},[t._v(t._s(t.text))]):t._e()};s._withStripped=!0;var a={render:s,staticRenderFns:[]};e.a=a},207:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",[t.islogin?[i("view",{staticClass:"uni-list"},[i("view",{staticClass:"uni-list-cell",attrs:{"hover-class":"uni-list-cell-hover"}},[i("view",{staticClass:"uni-media-list"},[i("view",{staticClass:"uni-media-list-logo"},[t.userdata.avatar?i("image",{attrs:{src:t.bucketcdn+t.userdata.avatar+"_80"}}):t._e()]),i("view",{staticClass:"uni-media-list-body"},[i("view",{staticClass:"uni-media-list-text-top"},[t._v(t._s(t.userdata.user))]),i("view",{staticClass:"uni-media-list-text-bottom uni-ellipsis"},[t._v(t._s(t.userdata.ps))])])])])]),i("view",{staticClass:"uni-list"},[i("view",{staticClass:"uni-list-cell"},[t.userdata.website?i("view",{staticClass:"uni-media-list",attrs:{eventid:"wEl-1"},on:{tap:function(e){t.gonav("myweb/index?website="+t.userdata.website)}}},[i("view",{staticClass:"uni-media-list-logo2"},[t._v("\n\t\t\t\t\t我的网站\n\t\t\t\t\t")]),i("view",{staticClass:"uni-media-list-body r"},[i("uni-badge",{attrs:{text:t.userdata.website,type:"danger",mpcomid:"W2A-0"}})],1)]):i("view",{staticClass:"uni-media-list",attrs:{eventid:"kg3-0"},on:{tap:function(e){t.websiteadd()}}},[i("view",{staticClass:"uni-media-list-logo"},[t._v("\n\t\t\t\t\t\t创建网站\n\t\t\t\t\t\t\n\t\t\t\t\t")]),i("view",{staticClass:"uni-media-list-body r"},[i("uni-badge",{attrs:{text:"G100",type:"danger",mpcomid:"uwU-1"}})],1)])])]),i("view",{staticClass:"uni-list"},[i("view",{staticClass:"uni-list-cell"},[i("view",{staticClass:"uni-media-list"},[i("view",{staticClass:"uni-media-list-logo"},[t._v("ID")]),i("view",{staticClass:"uni-media-list-body r"},[i("uni-badge",{attrs:{text:t.userdata.id,type:"danger",mpcomid:"Rxu-2"}})],1)])])]),i("view",{staticClass:"uni-list"},[i("view",{staticClass:"uni-list-cell"},[i("view",{staticClass:"uni-media-list"},[i("view",{staticClass:"uni-media-list-logo"},[t._v("金币")]),i("view",{staticClass:"uni-media-list-body r"},[i("uni-badge",{attrs:{text:t.userdata.gold,type:"danger",mpcomid:"QRb-3"}})],1)])])]),i("view",{staticClass:"uni-list"},[i("view",{staticClass:"uni-list-cell"},[i("view",{staticClass:"uni-media-list"},[i("view",{staticClass:"uni-media-list-logo"},[t._v("积分")]),i("view",{staticClass:"uni-media-list-body r"},[i("uni-badge",{attrs:{text:t.userdata.credits,type:"danger",mpcomid:"9hA-4"}})],1)])])]),i("view",{staticClass:"uni-list"},[i("view",{staticClass:"uni-list-cell"},[i("view",{staticClass:"uni-media-list"},[i("view",{staticClass:"uni-media-list-logo"},[t._v("等级")]),i("view",{staticClass:"uni-media-list-body r"},[i("uni-badge",{attrs:{text:t.userdata.group,type:"danger",mpcomid:"Dtd-5"}})],1)])])]),i("view",{staticClass:"uni-list"},[i("view",{staticClass:"uni-list-cell"},[i("view",{staticClass:"uni-media-list"},[i("view",{staticClass:"uni-media-list-logo"},[t._v("邮箱")]),i("view",{staticClass:"uni-media-list-body r"},[i("uni-badge",{attrs:{text:t.userdata.email,type:"danger",mpcomid:"d8b-6"}})],1)])])]),i("button",{staticClass:"btn-submit",attrs:{type:"primary",eventid:"68W-2"},on:{click:t.out}},[t._v("退出")])]:i("login",{ref:"login",attrs:{islogin:t.islogin,eventid:"k3s-3",mpcomid:"0rT-7"},on:{Changed:function(e){t.setislogin(e)}}})],2)};s._withStripped=!0;var a={render:s,staticRenderFns:[]};e.a=a}},[195]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/index.js.map