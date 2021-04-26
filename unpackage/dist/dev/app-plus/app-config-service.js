
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/user/login_v2","pages/user/overall_view","pages/user/checkup_system","pages/user/category_view","pages/user/overall_stat","pages/transaction/list","pages/transaction/transaction","pages/user/history_income","pages/user/history_delegate_log","pages/user/detail_page","pages/user/income_balance","pages/user/income_detail","pages/user/user_index_new","pages/user/bond"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#333333","backgroundColor":"#333333"},"tabBar":{"color":"#c2c2c2","selectedColor":"#0bf4fe","borderStyle":"black","backgroundColor":"#333333","list":[{"pagePath":"pages/user/overall_view","iconPath":"./static/image/overall_view/strategy.png","selectedIconPath":"static/image/overall_view/strategy_active.png","text":"策略"},{"pagePath":"pages/transaction/list","iconPath":"static/image/overall_view/trade.png","selectedIconPath":"static/image/overall_view/trade_avtive.png","text":"交易"},{"pagePath":"pages/user/user_index_new","iconPath":"static/image/overall_view/gerenzhongxin.png","selectedIconPath":"static/image/overall_view/gerenzhongxin_avtive.png","text":"个人中心"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"kunpengv2.0","compilerVersion":"3.1.11","entryPagePath":"pages/user/login_v2","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/user/login_v2","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom","disableScroll":true}},{"path":"/pages/user/overall_view","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"鲲鹏资管","enablePullDownRefresh":true,"navigationStyle":"custom","navigationBarTextStyle":"white"}},{"path":"/pages/user/checkup_system","meta":{},"window":{"navigationBarTitleText":"考核指标","enablePullDownRefresh":false}},{"path":"/pages/user/category_view","meta":{},"window":{"navigationBarTitleText":"策略","enablePullDownRefresh":false,"backgroundColor":"#333333","disableScroll":true}},{"path":"/pages/user/overall_stat","meta":{},"window":{"navigationBarTitleText":"总收益统计","enablePullDownRefresh":false}},{"path":"/pages/transaction/list","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"交易列表"}},{"path":"/pages/transaction/transaction","meta":{},"window":{"navigationBarTitleText":"交易","enablePullDownRefresh":false,"disableScroll":true}},{"path":"/pages/user/history_income","meta":{},"window":{"navigationBarTitleText":"往期收益","enablePullDownRefresh":false}},{"path":"/pages/user/history_delegate_log","meta":{},"window":{"navigationBarTitleText":"历史委托","enablePullDownRefresh":false}},{"path":"/pages/user/detail_page","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"backgroundColor":"#333333","disableScroll":true}},{"path":"/pages/user/income_balance","meta":{},"window":{"navigationBarTitleText":"结算详情","disableScroll":true,"enablePullDownRefresh":false}},{"path":"/pages/user/income_detail","meta":{},"window":{"navigationBarTitleText":"收益明细","disableScroll":true,"enablePullDownRefresh":false}},{"path":"/pages/user/user_index_new","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心","backgroundColor":"#333333","enablePullDownRefresh":false}},{"path":"/pages/user/bond","meta":{},"window":{"navigationBarTitleText":"保证金明细","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});