import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

 
//重写console.log方法，判断是否开启日志调试模式，否则就不输出
console.log = (function(oriLogFunc){
  let debug = false;
  return function(str){
    if (debug){//判断配置文件是否开启日志调试
      let args = arguments;
      for(let i = 0;i<args.length;i++) {
      	oriLogFunc.call(console, args[i]);
      }
    }
  }
})(console.log);

const app = new Vue({
	store,
	...App
})


app.$mount()
