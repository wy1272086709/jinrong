(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user_index_new"],{"11dd":function(e,t,n){"use strict";n.r(t);var r=n("90f3"),o=n("813f");for(var s in o)"default"!==s&&function(e){n.d(t,e,(function(){return o[e]}))}(s);n("f373");var i,a=n("f0c5"),u=Object(a["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);t["default"]=u.exports},2347:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n("a34a")),o=n("2f62"),s=n("7936");function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){return g(e)||f(e,t)||c(e,t)||u()}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e,t){if(e){if("string"===typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function f(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,s=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done);r=!0)if(n.push(i.value),t&&n.length===t)break}catch(u){o=!0,s=u}finally{try{r||null==a["return"]||a["return"]()}finally{if(o)throw s}}return n}}function g(e){if(Array.isArray(e))return e}function d(e,t,n,r,o,s,i){try{var a=e[s](i),u=a.value}catch(c){return void n(c)}a.done?t(u):Promise.resolve(u).then(r,o)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var s=e.apply(t,n);function i(e){d(s,r,o,i,a,"next",e)}function a(e){d(s,r,o,i,a,"throw",e)}i(void 0)}))}}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w={data:function(){return{strategIst:"",job:"",avatarUrl:"",manual_res:{earnings_yesterday:0,allowance:"",profit:""},quantify_res:{earnings_yesterday:0,allowance:"",profit:""},statRes:{},userListHeight:"",showMsg:!1,current:0,lineHeight:"",userList:{}}},computed:m(m({},(0,o.mapState)(["hasLogin","strategistId"])),{},{userName:function(){return this.$store.state&&this.$store.state.userName?this.$store.state.userName:e.getStorageSync("wx_login_username")},canSwithStrategIst:function(){return!(Object.keys(this.userList).length<=0)}}),onPullDownRefresh:function(){this.initPageInfo(!0)},onShow:function(){this.initPageInfo()},onLoad:function(){console.log("1");var t=e.getStorageSync("wx_strategist_list");console.log("str:"+t);var n=t?JSON.parse(t):{};this.userList=n,console.log("this.userList",this.userList);var r=e.getSystemInfoSync();this.scrollHeight=r.windowHeight-e.upx2px(76)-80+"px",this.userListHeight=r.windowHeight-30-26+"px"},methods:{changeTabs:function(e){console.log(e),this.current=e,this.statRes=0==e?this.manual_res:this.quantify_res},open:function(){this.$refs.calendar.open()},initPageInfo:function(){var t=this;return h(r.default.mark((function n(){var o,i,u,c,l,f,g,d,h,p;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o=0,o=0==t.current?1:0,i=(0,s.getStrategIstIncome)(t.strategistId,1).catch((function(e){return e})),u=(0,s.getStrategIstIncome)(t.strategistId,0).catch((function(e){return e})),n.next=6,Promise.all([i,u]);case 6:c=n.sent,l=a(c,2),f=l[0],g=l[1],d=f.strategist_name,h=f.level_name,p=f.date_range,void 0!==d?(t.strategIst=d,t.job=h,e.setStorageSync("date_range",p),t.manual_res={earnings_yesterday:f.earnings_yesterday,profit:f.profit,allowance:f.allowance},t.quantify_res={earnings_yesterday:g.earnings_yesterday,profit:g.profit,allowance:g.allowance},t.statRes=o?t.manual_res:t.quantify_res):(t.strategIst="",t.job="",console.log("error.reason1:"+JSON.stringify(f)+",error reason2:"+JSON.stringify(g)));case 12:case"end":return n.stop()}}),n)})))()},switchStrategist:function(t){this.$store.commit("setStrategistId",t);var n=this;e.showTabBar({success:function(){console.log("showTabBar success!"),n.$refs["showLeft"].close()},animation:!0}),this.initPageInfo()},showUserList:function(){var t=this;Object.keys(this.userList).length<=0||e.hideTabBar({animation:!0,success:function(){console.log("hideTabBar success!"),t.showDrawer("showLeft")}})},showDrawer:function(e){this.$refs[e].open()},closeDrawer:function(t){e.showTabBar({success:function(){console.log("showTabBar success!")},animation:!0}),console.log("close closeDrawer")},onCancel:function(){},logout:function(){this.showMsg=!0},confirmLogout:function(){console.log("用户点击了确定!");var t=this;e.showTabBar({success:function(){console.log("showTabBar success!"),t.$refs["showLeft"].close()},animation:!0}),t.$store.commit("logout"),e.removeStorageSync("wx_login_username"),e.removeStorageSync("wx_login_password"),e.removeStorageSync("wx_strategist_list"),e.reLaunch({url:"/pages/user/login_v2"})},gotoDetailPage:function(t){var n=["/pages/user/income_detail","/pages/user/income_balance","/pages/user/bond","/pages/user/checkup_system"];e.navigateTo({url:n[t],complete:function(e){console.log("res")}}),console.log(t)}}};t.default=w}).call(this,n("543d")["default"])},5292:function(e,t,n){"use strict";(function(e){n("8d98");r(n("66fd"));var t=r(n("11dd"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"813f":function(e,t,n){"use strict";n.r(t);var r=n("2347"),o=n.n(r);for(var s in r)"default"!==s&&function(e){n.d(t,e,(function(){return r[e]}))}(s);t["default"]=o.a},"90f3":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return r}));var r={uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"a306"))},uSubsection:function(){return n.e("uview-ui/components/u-subsection/u-subsection").then(n.bind(null,"9a8b"))},uCellGroup:function(){return n.e("uview-ui/components/u-cell-group/u-cell-group").then(n.bind(null,"2b24"))},uCellItem:function(){return n.e("uview-ui/components/u-cell-item/u-cell-item").then(n.bind(null,"67d8"))},uGap:function(){return n.e("uview-ui/components/u-gap/u-gap").then(n.bind(null,"5e8d"))},uniDrawer:function(){return n.e("components/uni-drawer/uni-drawer").then(n.bind(null,"4cea"))},uModal:function(){return n.e("uview-ui/components/u-modal/u-modal").then(n.bind(null,"db88"))}},o=function(){var e=this,t=e.$createElement;e._self._c},s=[]},d145:function(e,t,n){},f373:function(e,t,n){"use strict";var r=n("d145"),o=n.n(r);o.a}},[["5292","common/runtime","common/vendor"]]]);