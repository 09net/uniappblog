require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([9],{36:function(t,e,i){"use strict";var a=s(i(4)),n=s(i(37));function s(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(n.default))},37:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(39),n=i.n(a),s=i(54),r=!1;var o=function(t){r||i(38)},c=i(0)(n.a,s.a,o,null,null);c.options.__file="..\\..\\..\\..\\用户目录\\我的文档\\HBuilderProjects\\ysv8\\pages\\myweb\\index.vue",c.esModule&&Object.keys(c.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),c.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),e.default=c.exports},38:function(t,e){},39:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var a=c(i(10)),n=c(i(2)),s=c(i(11)),r=c(i(9)),o=c(i(8));function c(t){return t&&t.__esModule?t:{default:t}}function l(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,i){return function a(n,s){try{var r=e[n](s),o=r.value}catch(t){return void i(t)}if(!r.done)return Promise.resolve(o).then(function(t){a("next",t)},function(t){a("throw",t)});t(o)}("next")})}}e.default={components:{mediaList:s.default,uniDrawer:r.default,uniLoadMore:o.default},onNavigationBarButtonTap:function(t){this.rightDrawerVisible=!this.rightDrawerVisible},data:function(){return{title:n.default.title,rightDrawerVisible:!1,showImg:!1,loadingText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},ajaxi:!0,scrollLeft:0,isClickChange:!1,tabIndex:1,newsitems:[],imgcdn:n.default.imgcdn,bucketcdn:n.default.bucketcdn,active:"index",method:"index",mode:0,website:n.default.website,www:n.default.www,tabBars:[{name:"精华",id:"topall"},{name:"综合",id:"index"}]}},onShareAppMessage:function(){return{title:this.title+"_YSV8简单网站",path:"/pages/myweb/index"}},onLoad:function(t){var e=this;t.mode&&(this.mode=t.mode),t.website&&(this.website=t.website),this.www="https://"+this.website+".44api.com/",this.newsitems=this.randomfn(),setTimeout(function(){e.getlist(),e.showImg=!0},400)},methods:{closeRightDrawer:function(){this.rightDrawerVisible=!1},showRightDrawer:function(){this.rightDrawerVisible=!0},share:function(){t.showToast({title:"分享"})},autotext:function(t){return n.default.langfun(t)},buttonbar:function(e,i){i?t.redirectTo({url:"/pages/"+e}):t.redirectTo({url:e})},openright:function(){this.rightDrawerVisible=!this.rightDrawerVisible},setNaivgationBarTitle:function(e){this.title=e,t.setNavigationBarTitle({title:e})},gonav:function(e){this.rightDrawerVisible=!1,t.navigateTo({url:"/pages/"+e})},gonav2:function(e){this.rightDrawerVisible=!1,t.navigateTo({url:e+"?website="+this.website})},goDetail:function(e){t.navigateTo({url:"t?id="+e.id+"&website="+e.website})},close:function(e,i){var a=this;t.showModal({content:"是否删除本条信息？",success:function(t){t.confirm&&a.newsitems[e].data.splice(i,1)}})},loadMore:function(t){var e=this;setTimeout(function(){e.getlist()},500)},getlist:function(){var e=this,i=this.tabIndex;0===this.newsitems[i].loadingType&&(this.newsitems[i].loadingType=1,this.ajaxi++,n.default.isNumber(this.tabBars[i].id)?this.active="blog/f":this.active="index",t.request({method:"POST",url:this.www+this.active+"/"+this.tabBars[i].id+"/"+this.mode+"/"+this.newsitems[i].pagtime+".api?upuid="+n.default.upuid,data:{YSV8_HEX:n.default.ysv8hex},success:function(t){var a=t.data;"bucketcdn"in a&&(e.bucketcdn=a.bucketcdn,n.default.localStorage.setItem("bucketcdn",a.bucketcdn)),"imgcdn"in a&&(e.imgcdn=a.imgcdn,n.default.localStorage.setItem("imgcdn",a.imgcdn)),"title"in a&&e.setNaivgationBarTitle(a.title),"forum"in a&&e.ajaxi&&(a.forum.unshift({name:"精华",id:"topall"},{name:"综合",id:"index"}),a.forum=n.default.forum(a.forum),e.tabBars=a.forum,e.ajaxi=!1,e.randomfn());var s=n.default.setdata(a.data,"down",e.newsitems[i].data,e.newsitems[i].pagtime);1==n.default.isArray(s)&&(e.newsitems[i].data=s[0],e.newsitems[i].pagtime=s[1]),setTimeout(function(){s[2]<10?e.newsitems[i].loadingType=2:e.newsitems[i].loadingType=0},500)},fail:function(a){t.showModal({content:"网络故障",showCancel:!1}),e.newsitems[i].loadingType=0},complete:function(){}}))},changeTab:function(e){var i=this;return l(a.default.mark(function n(){var s,r,o,c,l,u,d,f,b;return a.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(s=e.target.current,!i.isClickChange){a.next=5;break}return i.tabIndex=s,i.isClickChange=!1,a.abrupt("return");case 5:return a.next=7,i.getElSize("tab-bar");case 7:r=a.sent,o=r?r.scrollLeft:o,c=0,l=0;case 11:if(!(l<s)){a.next=19;break}return a.next=14,i.getElSize(i.tabBars[l].id);case 14:(u=a.sent)&&"width"in u&&(c+=u.width);case 16:l++,a.next=11;break;case 19:return d=t.getSystemInfoSync().windowWidth,a.next=22,i.getElSize(i.tabBars[s].id);case 22:f=a.sent,b=f.width,c+b-o>d&&(i.scrollLeft=c+b-d),c<o&&(i.scrollLeft=c),i.isClickChange=!1,i.tabIndex=s,setTimeout(function(){i.getlist()},400);case 29:case"end":return a.stop()}},n,i)}))()},getElSize:function(e){return new Promise(function(i,a){t.createSelectorQuery().select("#div"+e).fields({size:!0,scrollOffset:!0},function(t){i(t)}).exec()})},tapTab:function(t){var e=this;return l(a.default.mark(function i(){var n,s;return a.default.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(e.tabIndex!==t.target.dataset.current){i.next=4;break}return i.abrupt("return",!1);case 4:return i.next=6,e.getElSize("tab-bar");case 6:n=i.sent,s=n?n.scrollLeft:s,e.scrollLeft=s,e.isClickChange=!0,e.tabIndex=t.target.dataset.current;case 11:setTimeout(function(){e.getlist()},400);case 12:case"end":return i.stop()}},i,e)}))()},randomfn:function(){for(var t=[],e=0;e<50;e++)t.push({loadingType:0,data:[],pagtime:0});return t}}}}).call(e,i(1).default)},54:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"uni-tab-bar"},[i("scroll-view",{staticClass:"uni-swiper-tab",attrs:{id:"tab-bar","scroll-x":"","scroll-left":t.scrollLeft}},t._l(t.tabBars,function(e,a){return i("view",{key:e.id,class:["swiper-tab-list",t.tabIndex==a?"active":""],attrs:{id:"div"+e.id,"data-current":a,eventid:"Mno-0-"+a},on:{tap:t.tapTab}},[t._v(t._s(e.name))])})),i("swiper",{staticClass:"swiper-box",attrs:{current:t.tabIndex,duration:"300",eventid:"9vs-3"},on:{change:t.changeTab}},t._l(t.newsitems,function(e,a){return i("swiper-item",{key:a,attrs:{mpcomid:"BnU-2-"+a}},[i("scroll-view",{staticClass:"list",attrs:{"scroll-y":"",eventid:"0vF-2-"+a},on:{scrolltolower:function(e){t.loadMore(a)}}},[t._l(e.data,function(e,n){return i("block",{key:n},[i("media-list",{attrs:{data:e,eventid:"VSl-1-"+a+"-"+n,mpcomid:"YKA-0-"+a+"-"+n},on:{close:function(e){t.close(a,n)},click:function(i){t.goDetail(e)}}})],1)}),i("view",{staticClass:"uni-tab-bar-loading"},[i("uni-load-more",{attrs:{loadingType:e.loadingType,contentText:t.loadingText,mpcomid:"IUj-1-"+a}})],1)],2)],1)})),i("uni-drawer",{attrs:{visible:t.rightDrawerVisible,mode:"right",website:t.website,eventid:"8CH-4",mpcomid:"LZs-3"},on:{close:t.closeRightDrawer}}),i("view",{staticClass:"foot"},[i("view",{staticClass:"row"},[i("view",{staticClass:"col"},[i("view",{staticClass:"col_20",attrs:{eventid:"aVT-5"},on:{tap:function(e){t.buttonbar("index?mode=0",!1)}}},[i("view",{staticClass:"uni-tabbar__bd"},[i("view",{staticClass:"uni-tabbar__label",class:"0"==t.mode?"tar_active":"tar_no"},[t._v("\n          综合\n        ")])])]),i("view",{staticClass:"col_20",attrs:{eventid:"RmL-6"},on:{tap:function(e){t.buttonbar("index?mode=1",!1)}}},[i("view",{staticClass:"uni-tabbar__bd"},[i("view",{staticClass:"uni-tabbar__label",class:"1"==t.mode?"tar_active":"tar_no"},[t._v("\n          图片\n        ")])])]),i("view",{staticClass:"col_20",attrs:{eventid:"8Ny-7"},on:{tap:function(e){t.buttonbar("index?mode=2",!1)}}},[i("view",{staticClass:"uni-tabbar__bd"},[i("view",{staticClass:"uni-tabbar__label",class:"2"==t.mode?"tar_active":"tar_no"},[t._v("\n          附件\n        ")])])]),i("view",{staticClass:"col_20",attrs:{eventid:"SWT-8"},on:{tap:function(e){t.buttonbar("index?mode=3",!1)}}},[i("view",{staticClass:"uni-tabbar__bd"},[i("view",{staticClass:"uni-tabbar__label",class:"3"==t.mode?"tar_active":"tar_no"},[t._v("\n          视频\n        ")])])]),i("view",{staticClass:"col_20",attrs:{eventid:"IQ3-9"},on:{tap:function(e){t.openright()}}},[i("view",{staticClass:"uni-tabbar__bd"},[i("view",{staticClass:"uni-tabbar__label",class:"3"==t.mode?"tar_active":"tar_no"},[t._v("\n          更多\n        ")])])])])])])],1)};a._withStripped=!0;var n={render:a,staticRenderFns:[]};e.a=n}},[36]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/myweb/index.js.map