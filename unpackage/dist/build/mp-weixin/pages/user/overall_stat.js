(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/overall_stat"],{"244a":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return r}));var r={qiunDataCharts:function(){return Promise.all([a.e("common/vendor"),a.e("uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts")]).then(a.bind(null,"188c"))},uButton:function(){return a.e("uview-ui/components/u-button/u-button").then(a.bind(null,"a306"))}},n=function(){var t=this,e=t.$createElement,a=(t._self._c,t.__map(t.statRes,(function(e,a){var r=t.__get_orig(e),n=parseFloat(e.data[0]),o=parseFloat(e.data[1]),i=parseFloat(e.data[1]),c=parseFloat(e.data[1]);return{$orig:r,m0:n,m1:o,m2:i,m3:c}}))),r={extra:{tooltip:{showArrow:!1,borderWidth:1,borderRadius:8,borderColor:"#333",bgColor:"#333",bgOpacity:.9,fontColor:"#fff",splitLine:!1}}},n={backgroundColor:0==t.date_limit?"#676D81":"rgba(255,255,255, 0.1)",color:0==t.date_limit?"#FFFFFF":"#C6C6C6"},o={backgroundColor:1==t.date_limit?"#676D81":"rgba(255,255,255, 0.1)",color:1==t.date_limit?"#FFFFFF":"#C6C6C6"},i={backgroundColor:2==t.date_limit?"#676D81":"rgba(255,255,255, 0.1)",color:2==t.date_limit?"#FFFFFF":"#C6C6C6"},c={backgroundColor:3==t.date_limit?"#676D81":"rgba(255,255,255, 0.1)",color:3==t.date_limit?"#FFFFFF":"#C6C6C6"};t.$mp.data=Object.assign({},{$root:{l0:a,a0:r,a1:n,a2:o,a3:i,a4:c}})},o=[]},"4f2c":function(t,e,a){},5376:function(t,e,a){"use strict";a.r(e);var r=a("e7c1"),n=a.n(r);for(var o in r)"default"!==o&&function(t){a.d(e,t,(function(){return r[t]}))}(o);e["default"]=n.a},"6bb4":function(t,e,a){"use strict";a.r(e);var r=a("244a"),n=a("5376");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("ea3d");var i,c=a("f0c5"),u=Object(c["a"])(n["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);e["default"]=u.exports},"6c28":function(t,e,a){"use strict";(function(t){a("8d98");r(a("66fd"));var e=r(a("6bb4"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},e7c1:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=c(a("a34a")),n=a("2f62"),o=c(a("f670")),i=(c(a("ef6c")),c(a("4995")),a("70da"));function c(t){return t&&t.__esModule?t:{default:t}}function u(t,e,a,r,n,o,i){try{var c=t[o](i),u=c.value}catch(s){return void a(s)}c.done?e(u):Promise.resolve(u).then(r,n)}function s(t){return function(){var e=this,a=arguments;return new Promise((function(r,n){var o=t.apply(e,a);function i(t){u(o,r,n,i,c,"next",t)}function c(t){u(o,r,n,i,c,"throw",t)}i(void 0)}))}}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function d(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){f(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function f(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var g={computed:d({},(0,n.mapState)(["strategistId"])),data:function(){return{statRes:[],pixelRatio:1,width:"",height:"",cWidth:"",cHeight:"",date_limit:0,chartData:{},chartData1:{},tips:"",index:0}},onLoad:function(){var e=t.getSystemInfoSync();console.log("info"+JSON.stringify(e)),this.width=e.windowWidth+"px",this.height=e.windowHeight+"px",this.cWidth=t.upx2px(666),this.cHeight=t.upx2px(500),this.getCategorySumStats(),this.getIncomeCurve(0)},methods:{getIncomeCurve:function(t){var e=this;return s(r.default.mark((function a(){var n,o,c;return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.date_limit=t,e.strategistId,n=[],a.prev=3,a.next=6,(0,i.getDaysProfit)(e.strategistId,t);case 6:n=a.sent,a.next=11;break;case 9:a.prev=9,a.t0=a["catch"](3);case 11:console.log(n);try{if(n&&!Array.isArray(n)){for(console.log("data",JSON.parse(JSON.stringify(n))),o=JSON.parse(JSON.stringify(n)),o.series[0].name="收益(红色表示亏损,绿色表示盈利)",c=0;c<o.series[0].data.length;c++)o.series[0].data[c]>=0?o.series[0].data[c]={value:Math.abs(o.series[0].data[c]),color:"#0BF4FD"}:o.series[0].data[c]={value:Math.abs(o.series[0].data[c]),color:"#EE4368"};e.chartData=o}}catch(r){e.chartData=[]}return a.prev=13,a.next=16,(0,i.getProfit_cumulative)(e.strategistId,t);case 16:e.chartData1=a.sent,a.next=22;break;case 19:a.prev=19,a.t1=a["catch"](13),e.chartData1=[];case 22:case"end":return a.stop()}}),a,null,[[3,9],[13,19]])})))()},getCategorySumStats:function(){var e=this,a=getApp().globalData.serverUrl+"/strategys/overall_stats",r=t.getStorageSync("wx_login_token"),n={token:r,filterData:!0};n.strategist_id=this.strategistId,o.default.request(a,n).then((function(t){if(1==t.status){var a=t.data;e.overall_info=a.overall,e.statRes=[{label:"总收益",data:[a.overall.accumulated_income,a.overall.cumulative_rate+"%"]},{label:"近一月收益",data:[a.overall.earnings.month,a.overall.nearly_month+"%"]},{label:"七日收益",data:[a.overall.earnings.week,a.overall.nearly_week+"%"]}]}}))}}};e.default=g}).call(this,a("543d")["default"])},ea3d:function(t,e,a){"use strict";var r=a("4f2c"),n=a.n(r);n.a}},[["6c28","common/runtime","common/vendor"]]]);