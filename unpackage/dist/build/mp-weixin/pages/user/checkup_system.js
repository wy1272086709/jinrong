(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/checkup_system"],{"1b20":function(t,e,n){"use strict";n.r(e);var r=n("8053"),o=n("5d90");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("9ec4");var a,s=n("f0c5"),u=Object(s["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);e["default"]=u.exports},"309b":function(t,e,n){"use strict";(function(t){n("8d98");r(n("66fd"));var e=r(n("1b20"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"5d0f":function(t,e,n){},"5d90":function(t,e,n){"use strict";n.r(e);var r=n("bef7"),o=n.n(r);for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);e["default"]=o.a},8053:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r}));var r={uDropdown:function(){return n.e("uview-ui/components/u-dropdown/u-dropdown").then(n.bind(null,"8a30"))},uDropdownItem:function(){return n.e("uview-ui/components/u-dropdown-item/u-dropdown-item").then(n.bind(null,"5db2"))},uLineProgress:function(){return n.e("uview-ui/components/u-line-progress/u-line-progress").then(n.bind(null,"96b5"))},uCircleProgress:function(){return n.e("uview-ui/components/u-circle-progress/u-circle-progress").then(n.bind(null,"c06e"))},uToast:function(){return n.e("uview-ui/components/u-toast/u-toast").then(n.bind(null,"7951"))}},o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"9ec4":function(t,e,n){"use strict";var r=n("5d0f"),o=n.n(r);o.a},bef7:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("a34a")),o=n("2f62"),i=n("7936");function a(t){return t&&t.__esModule?t:{default:t}}function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){c(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function d(t,e,n,r,o,i,a){try{var s=t[i](a),u=s.value}catch(c){return void n(c)}s.done?e(u):Promise.resolve(u).then(r,o)}function l(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){d(i,r,o,a,s,"next",t)}function s(t){d(i,r,o,a,s,"throw",t)}a(void 0)}))}}var p={data:function(){return{title:"admin",scrollHeight:"",month_trade_target:0,month_trade_now:0,month_profit_target:0,month_profit_now:0,threeMonth_trade_target:0,threeMonth_trade_now:0,threeMonth_profit_target:0,threeMonth_profit_now:0,max_retracement:0,dropdownIndex:"",value1:"",value2:"2",mask:!0,self_close:!0,user:"asdad",line_percent1:0,line_percent2:0,line_percent3:0,line_percent4:0,circle_percent:0,activeColor:"#FFFFFF",userList:[],hasUpgrade:!1,apply:0,periodDate:""}},onLoad:function(){var e=t.getStorageSync("wx_strategist_list");console.log("res",e);var n=t.getSystemInfoSync();this.scrollHeight=n.windowHeight-t.upx2px(80)+"px",this.userList=JSON.parse(e),console.log("userList:  "+this.userList),this.getDate(this.strategistId),this.strategistId?this.title=this.userList[this.strategistId]:this.title=this.userName},methods:{openDropdown:function(t){console.log("openDropdown+index"+t),this.dropdownIndex=t},closeDropdown:function(t){this.dropdownIndex=""},format:function(t){var e=0;return e=t>100?100:Math.round(t),e},getDate:function(t){var e=this;return l(r.default.mark((function n(){var o,a,s,u,c;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("title",e.title),n.next=3,(0,i.getCheckUpList)(t);case 3:o=n.sent,console.log("data:",o),e.month_trade_target=o.standard.month_tradingCount,e.month_trade_now=o.this_month.trading_count,void 0===e.month_trade_now&&(e.month_trade_now=0),a=0,s=0,u=0,c=0,a=e.month_trade_now/e.month_trade_target*100,e.line_percent1=e.format(a),console.log("now: ",e.month_trade_now),console.log("target",e.month_trade_target),console.log("line1",e.line_percent1),e.month_profit_target=o.standard.month_yield,e.month_profit_now=o.this_month.yield,isNaN(e.month_profit_now)&&(e.month_profit_now=0),e.month_profit_now<=0?e.line_percent2=0:(s=e.month_profit_now/e.month_profit_target*100,e.line_percent2=e.format(s)),e.threeMonth_trade_target=o.standard.period_tradingCount,e.threeMonth_trade_now=o.period.trade_count,u=e.threeMonth_trade_now/e.threeMonth_trade_target*100,e.line_percent3=e.format(u),e.threeMonth_profit_target=o.standard.period_yield,e.threeMonth_profit_now=o.period.yield,e.threeMonth_profit_now<=0?e.line_percent4=0:(c=e.threeMonth_profit_now/e.threeMonth_profit_target*100,e.line_percent4=e.format(c)),e.max_retracement=o.period.drawdown.drawdown_rate,e.circle_percent=e.max_retracement,1==o.period.results&&(e.hasUpgrade=!0),e.apply=o.period.apply,e.periodDate=o.period.date_range;case 33:case"end":return n.stop()}}),n)})))()},tagClick:function(t){console.log("index",t),this.getDate(t),console.log("title:",this.title),this.$refs.uDropdown.close(),this.title=this.userList[t]},upGrade:function(){var t=this;return l(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.hasUpgrade&&0==t.apply?(n=(0,i.getUpgradeLevel)(t.periodDate),t.$refs.uToast.show({title:n.msg})):t.hasUpgrade&&1==t.apply?t.$refs.uToast.show({title:"您已经申请过了，请等待审核!!!"}):t.$refs.uToast.show({title:"没有申请权限，请继续努力!!!"});case 1:case"end":return e.stop()}}),e)})))()}},computed:u(u({},(0,o.mapState)(["strategistId"])),{},{zIndex:function(){return""!==this.dropdownIndex?99999999:""},userName:function(){return this.$store.state&&this.$store.state.userName?this.$store.state.userName:t.getStorageSync("wx_login_username")}})};e.default=p}).call(this,n("543d")["default"])}},[["309b","common/runtime","common/vendor"]]]);