(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/overall_stat"],{"4f2c":function(e,t,n){},5376:function(e,t,n){"use strict";n.r(t);var o=n("e7c1"),r=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},"6bb4":function(e,t,n){"use strict";n.r(t);var o=n("a6e7"),r=n("5376");for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n("ea3d");var c,i=n("f0c5"),s=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);t["default"]=s.exports},"6c28":function(e,t,n){"use strict";(function(e){n("8d98");o(n("66fd"));var t=o(n("6bb4"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},a6e7:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var o={uNoNetwork:function(){return n.e("uview-ui/components/u-no-network/u-no-network").then(n.bind(null,"bb3e"))},uSubsection:function(){return n.e("uview-ui/components/u-subsection/u-subsection").then(n.bind(null,"9a8b"))},uLoadmore:function(){return n.e("uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"a8b1"))}},r=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.statRes,(function(t,n){var o=e.__get_orig(t),r=parseFloat(t.data[0]),a=parseFloat(t.data[1]),c=parseFloat(t.data[1]),i=parseFloat(t.data[1]);return{$orig:o,m0:r,m1:a,m2:c,m3:i}})));e.$mp.data=Object.assign({},{$root:{l0:n}})},a=[]},e7c1:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=l(n("a34a")),r=n("2f62"),a=l(n("f670")),c=(u(n("8708")),n("6bd8")),i=n("70da");function s(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function u(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var a=o?Object.getOwnPropertyDescriptor(e,r):null;a&&(a.get||a.set)?Object.defineProperty(n,r,a):n[r]=e[r]}return n.default=e,t&&t.set(e,n),n}function l(e){return e&&e.__esModule?e:{default:e}}function f(e,t,n,o,r,a,c){try{var i=e[a](c),s=i.value}catch(u){return void n(u)}i.done?t(s):Promise.resolve(s).then(o,r)}function g(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var a=e.apply(t,n);function c(e){f(a,o,r,c,i,"next",e)}function i(e){f(a,o,r,c,i,"throw",e)}c(void 0)}))}}function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){v(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(){Promise.all([n.e("common/vendor"),n.e("components/uni-ec-canvas")]).then(function(){return resolve(n("7142"))}.bind(null,n)).catch(n.oe)},p={computed:h({},(0,r.mapState)(["strategistId"])),components:{ecCanvas:m},data:function(){var e={statRes:[],ec:{option:{}},ec2:{option:{}},pixelRatio:1,width:"",lazyLoad:!0,height:"",cWidth:"",cHeight:"",date_limit:0,chartData:{},chartData3:{},tips:"",index:0,list:[{name:"近一月"},{name:"近半年"},{name:"近一年"},{name:"近三年"}],current:0};return e},onLoad:function(){var t=e.getSystemInfoSync();console.log("info"+JSON.stringify(t)),this.width=t.windowWidth+"px",this.height=t.windowHeight+"px",this.cWidth=e.upx2px(666),this.cHeight=e.upx2px(500),this.getCategorySumStats(),this.getIncomeCurve(0),this.getcumulative(0),console.log(c.commonConfig)},methods:{renderChart1:function(e){return g(o.default.mark((function e(){return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},sectionChange:function(e){switch(console.log("sectionchange"),e){case 0:console.log("sectionchange0"),this.current=0,this.getIncomeCurve(0);break;case 1:console.log("sectionchange1"),this.current=1,this.getIncomeCurve(1);break;case 2:console.log("sectionchange2"),this.current=2,this.getIncomeCurve(2);break;case 3:console.log("sectionchange3"),this.current=3,this.getIncomeCurve(3);break;default:console.log("sectionchange9");break}},sectionChange1:function(e){switch(console.log("sectionchange"),e){case 0:console.log("sectionchange0"),this.current=0,this.getcumulative(0);break;case 1:console.log("sectionchange1"),this.current=1,this.getcumulative(1);break;case 2:console.log("sectionchange2"),this.current=2,this.getcumulative(2);break;case 3:console.log("sectionchange3"),this.current=3,this.getcumulative(3);break;default:console.log("sectionchange9");break}},getcumulative:function(e){var t=this;return g(o.default.mark((function n(){var r,a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("getcumulative"),console.log(t.strategistId),n.next=4,(0,i.getProfit_cumulative)(t.strategistId,e);case 4:if(r=n.sent,0==e)for(a=0;a<r.categories.length;a++)r.categories[a]=r.categories[a].substr(5,9);c.lineConfig.xAxis[0].data=r.categories,c.lineConfig.series[0].data=r.series[0].data,t.ec2.option=c.lineConfig;case 9:case"end":return n.stop()}}),n)})))()},getIncomeCurve:function(e){var t=this;return g(o.default.mark((function n(){var r,a,s,u,l;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("getINcomeCurve"),t.date_limit=e,t.strategistId,r=[],n.prev=4,n.next=7,(0,i.getDaysProfit)(t.strategistId,e);case 7:r=n.sent,n.next=12;break;case 10:n.prev=10,n.t0=n["catch"](4);case 12:console.log(r);try{if(r&&!Array.isArray(r)){if(console.log("data here!"),a=r,console.log(r),a.series[0].name="收益",a.series[0].type="bar",0==e)for(s=0;s<a.categories.length;s++)a.categories[s]=a.categories[s].substr(5,9);for(u=0;u<a.series[0].data.length;u++)l=parseFloat(a.series[0].data[u]),a.series[0].data[u]>=0?a.series[0].data[u]={value:l.toFixed(2),itemStyle:{color:"#00C087"}}:a.series[0].data[u]={value:l.toFixed(2),itemStyle:{color:"#ED6160"}};c.commonConfig.series[0].data=a.series[0].data,c.commonConfig.xAxis[0].data=a.categories,t.commonConfig=c.commonConfig,console.log(c.commonConfig),t.ec.option=c.commonConfig}}catch(o){}case 14:case"end":return n.stop()}}),n,null,[[4,10]])})))()},getTouchMove:function(e){console.log("获取TouchMove",e)},getTouchMove1:function(e){console.log("获取TouchMove",e)},getCategorySumStats:function(){var t=this,n=getApp().globalData.serverUrl+"/strategys/overall_stats",o=e.getStorageSync("wx_login_token"),r={token:o,filterData:!0};r.strategist_id=this.strategistId,a.default.request(n,r).then((function(e){if(1==e.status){var n=e.data;t.overall_info=n.overall,t.statRes=[{label:"总收益",data:[n.overall.accumulated_income,n.overall.cumulative_rate+"%"]},{label:"近一月收益",data:[n.overall.earnings.month,n.overall.nearly_month+"%"]},{label:"七日收益",data:[n.overall.earnings.week,n.overall.nearly_week+"%"]}]}}))}}};t.default=p}).call(this,n("543d")["default"])},ea3d:function(e,t,n){"use strict";var o=n("4f2c"),r=n.n(o);r.a}},[["6c28","common/runtime","common/vendor"]]]);