(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/money_detail"],{"096b":function(t,n,e){"use strict";e.r(n);var o=e("7538"),a=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=a.a},"49f1":function(t,n,e){"use strict";e.r(n);var o=e("4c0d"),a=e("096b");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);e("75d0");var r,i=e("f0c5"),s=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);n["default"]=s.exports},"4c0d":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}));var o={uLoadmore:function(){return e.e("uview-ui/components/u-loadmore/u-loadmore").then(e.bind(null,"a8b1"))}},a=function(){var t=this,n=t.$createElement;t._self._c},u=[]},7538:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e("6754"),a=1,u=1,r={data:function(){return{strategyInfo:{sName:"N5_S-2018-01 btcusdt.BINANCE",status:1},tableData:[],width:"",height:"",moneyList:[{label:"初始资金",num:5e4,nid:1},{label:"当前资金",num:5e4,nid:2},{label:"累计收益",num:5e4,nid:3}],status:"loadmore"}},computed:{statusColor:function(){var t=this.strategyInfo.status;return 2==t?"color:rgba(38,214,80,1)":1==t?"color:#ec9217":4==t?"color:rgba(254,65,87,1)":"color:#7CFC00"},statusText:function(){var t=this.strategyInfo.status;return 2==t?"运行中":1==t?"暂停":4==t?"已停止":"已过期"}},onLoad:function(){var n=t.getSystemInfoSync(),e=(n.windowWidth,n.windowHeight);this.height=e-195-60+"px";var a=(0,o.getMoneyLogList)(1,10);this.tableData=a.list,u=a.totalpage},onReachBottom:function(){var t=this;setTimeout((function(){if(a>u)t.status="nomore";else{t.status="loading",a++;var n=(0,o.getMoneyLogList)(a,10),e=n.list;e.length>0&&(t.tableData=t.tableData.concat(e))}}),500)},methods:{getMoneyLogList:function(t,n){}}};n.default=r}).call(this,e("543d")["default"])},"75d0":function(t,n,e){"use strict";var o=e("f086"),a=e.n(o);a.a},e1e6:function(t,n,e){"use strict";(function(t){e("8d98");o(e("66fd"));var n=o(e("49f1"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},f086:function(t,n,e){}},[["e1e6","common/runtime","common/vendor"]]]);