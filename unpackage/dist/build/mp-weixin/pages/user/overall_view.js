(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/overall_view"],{"54e9":function(t,e,o){},"55f7":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o("2f62"),a=i(o("f670"));function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function s(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?r(Object(o),!0).forEach((function(e){l(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function l(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var u={onPullDownRefresh:function(){console.log("refresh..."),this.getCategorySumStats(1)},mounted:function(){var e=t.getSystemInfoSync();e.windowWidth;this.lineHeight=e.statusBarHeight,this.headerHeight=44},onTabItemTap:function(t){console.log("item onTabItemTap 11:",t)},onShow:function(){console.log("onShow ...."),this.pageNo=1,this.getCategorySumStats()},onHide:function(){},computed:s(s({},(0,n.mapState)(["hasLogin","userName","strategistId"])),{},{iconSrc:function(){return this.isOpenEyes?"../../static/image/overall_view/open-eyes.png":"../../static/image/overall_view/closeeye.png"},totalAmount:function(){var t=this.overall_info.total_amount;if(1==this.isOpenEyes)return t.toFixed(2);"string"!=typeof t&&(t+="");var e=t.length;return"*".repeat(e)},strategyIstName:function(){if(this.strategistId){var t=this.userList;return t[this.strategistId]}return this.userName}}),components:{},data:function(){return{show:!1,visible:!1,pageNo:1,totalpage:"",headerHeight:0,lineHeight:"",isOpenEyes:1,initialCapital:0,userList:[],strategyData:[],scrollHeight:"",status:"loadmore",username:"",marginTop:"",showMsg:!1,overall_info:{total_amount:0,accumulated_income:0,cumulative_rate:0,nearly_week:0,nearly_month:0,total_amount_yesterday:0},category_list:[]}},onLoad:function(){if(2==getApp().globalData.platform&&this.setIosBackground(),this.username=this.userName+", 欢迎使用鲲鹏资管管理系统",!this.hasLogin){var e=t.getSystemInfoSync(),o=e.windowWidth,n=750/o,a=e.statusBarHeight;console.log("h",a,a*n),t.showToast({title:"标题",icon:"loading",success:function(){t.reLaunch({url:"/pages/user/login"})},duration:100})}var i=t.getStorageSync("wx_strategist_list");this.userList=i?JSON.parse(i):[];var r=t.getSystemInfoSync(),s=r.windowHeight;console.log("h"+s),this.marginTop=t.upx2px(48)+44+r.statusBarHeight-10+"px",this.scrollHeight=s-t.upx2px(48)-44+10-r.statusBarHeight,console.log("userList",this.userList)},methods:{gotoStrategyGroupDetail:function(e){console.log("gotoStrategyGroupDetail click..."+JSON.stringify(e)),t.navigateTo({url:"/pages/user/category_view?groupId="+e.group_id+"&title="+e.title})},setIosBackground:function(){t.setBackgroundColor({backgroundColorBottom:"#FFFFFF"})},showUserList:function(){var e=this;t.hideTabBar({animation:!0,success:function(){console.log("hideTabBar success!"),e.showDrawer("showLeft")}})},confirm:function(t){console.log("confirm",t)},switchStrategist:function(e){this.$store.commit("setStrategistId",e),this.getCategorySumStats();var o=this;t.showTabBar({success:function(){console.log("showTabBar success!"),o.$refs["showLeft"].close()},animation:!0})},upper:function(){console.log("upper!"),t.showLoading({mask:!0,title:"加载中..."}),this.getCategorySumStats(!0)},lower:function(){},showDrawer:function(t){this.$refs[t].open()},closeDrawer:function(e){t.showTabBar({success:function(){console.log("showTabBar success!")},animation:!0}),console.log("close closeDrawer")},gotoOverallStat:function(){t.navigateTo({url:"/pages/user/overall_stat"})},gotoCategoryView:function(e){console.log("obj",e),t.setStorageSync("gotoCategoryView_data",e),t.switchTab({url:"/pages/user/category_view"})},logoutOrSwitchUser:function(){0==this.userList.length?this.logout():this.showUserList()},logout:function(){this.showMsg=!0},confirmLogout:function(){console.log("用户点击了确定!");var e=this;t.showTabBar({success:function(){console.log("showTabBar success!"),e.$refs["showLeft"].close()},animation:!0}),e.$store.commit("logout"),t.removeStorageSync("wx_login_username"),t.removeStorageSync("wx_login_password"),t.removeStorageSync("wx_strategist_list"),t.reLaunch({url:"/pages/user/login_v2"})},switchShow:function(){1==this.isOpenEyes?(this.isOpenEyes=0,this.addTotalMountVal(0,this.category_list)):(this.isOpenEyes=1,this.addTotalMountVal(1,this.category_list))},cache:function(e,o,n){var a=Date.parse(new Date)/1e3;if(console.log(a+"==="+e),e&&null===o){var i=t.getStorageSync(e),r=i.split("|");return!r[1]||a>=r[1]?(console.log("key已失效"),t.removeStorageSync(e),""):(console.log("key未失效"),r[0])}if(e&&o){var s="";s=n?a+n:a+3600,o=o+"|"+s,t.setStorageSync(e,o)}else console.log("key不能空")},getCategorySumStats:function(e){var o=this,n=getApp().globalData.serverUrl+"/strategys/overall_stats",i=t.getStorageSync("wx_login_token"),r={token:i,filterData:!0};r.strategist_id=this.strategistId,a.default.request(n,r).then((function(n){if(e&&t.stopPullDownRefresh(),1==n.status){var a=n.data;o.overall_info=a.overall;var i=a.category;o.addTotalMountVal(1,i),o.category_list=i,console.log("list:"+JSON.stringify(i)),0!=i.length?o.initialCapital=a.overall.actual_investment:o.initialCapital=0}}))},calculateCapital:function(t){var e=t.length;console.log("arr"),console.log(t);for(var o=0,n=0;n<e;n++)o+=t[n].actual_investment?t[n].actual_investment:0;return parseFloat(o).toFixed(2)},addTotalMountVal:function(t,e){var o=e.length;if(t>0)for(var n=0;n<o;n++){var a=e[n].total_amount;e[n]=s(s({},e[n]),{},{total_amount_val:a})}else{console.log(e);for(var i=0;i<o;i++){var r=e[i].total_amount;r+="";var l=r.length;r="*".repeat(l),e[i]=s(s({},e[i]),{},{total_amount_val:r})}}return e}}};e.default=u}).call(this,o("543d")["default"])},"6c4b":function(t,e,o){"use strict";var n=o("54e9"),a=o.n(n);a.a},"74e7":function(t,e,o){"use strict";o.r(e);var n=o("55f7"),a=o.n(n);for(var i in n)"default"!==i&&function(t){o.d(e,t,(function(){return n[t]}))}(i);e["default"]=a.a},7814:function(t,e,o){"use strict";o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){return n}));var n={uLine:function(){return o.e("uview-ui/components/u-line/u-line").then(o.bind(null,"e989"))},uniDrawer:function(){return o.e("components/uni-drawer/uni-drawer").then(o.bind(null,"4cea"))},uModal:function(){return o.e("uview-ui/components/u-modal/u-modal").then(o.bind(null,"db88"))}},a=function(){var t=this,e=t.$createElement,o=(t._self._c,t.isOpenEyes?null:"*".repeat(String(t.initialCapital).length)),n=t.isOpenEyes?t.overall_info.total_amount_yesterday.toFixed(2):null,a=t.isOpenEyes?null:"*".repeat(String(t.overall_info.total_amount_yesterday.toFixed(2)).length),i=t.isOpenEyes?t.overall_info.accumulated_income.toFixed(2):null,r=t.isOpenEyes?null:"*".repeat(String(t.overall_info.accumulated_income.toFixed(2)).length),s=t.isOpenEyes?t.overall_info.nearly_week.toFixed(2):null,l=t.isOpenEyes?null:"*".repeat(String(t.overall_info.nearly_week.toFixed(2)).length+1),u=t.__map(t.category_list,(function(e,o){var n=t.__get_orig(e),a=e.actual_investment.toFixed(2),i=e.month_profit.toFixed(2),r=e.nearly_month.toFixed(2),s=e.total_profit.toFixed(2),l=e.cumulative_rate.toFixed(2);return{$orig:n,g7:a,g8:i,g9:r,g10:s,g11:l}}));t.$mp.data=Object.assign({},{$root:{g0:o,g1:n,g2:a,g3:i,g4:r,g5:s,g6:l,l0:u}})},i=[]},b6f3:function(t,e,o){"use strict";(function(t){o("8d98");n(o("66fd"));var e=n(o("c4b3"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},c4b3:function(t,e,o){"use strict";o.r(e);var n=o("7814"),a=o("74e7");for(var i in a)"default"!==i&&function(t){o.d(e,t,(function(){return a[t]}))}(i);o("6c4b");var r,s=o("f0c5"),l=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=l.exports}},[["b6f3","common/runtime","common/vendor"]]]);