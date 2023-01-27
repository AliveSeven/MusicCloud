import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入过滤器函数
import mixins from './utils/mixins'
// 导入vuex
import store from './store'
// step1：引入 axios
// import Axios from 'axios'
// step2：把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求,
// 不需要每次都 import一下 axios了，直接使用 $axios 即可
// Vue.prototype.$axios = Axios
// step3：使每次请求都会带一个 /api 前缀 
// Axios.defaults.baseURL = '/api'

router.afterEach((to, from, next) => {
  // 让页面回到顶部
  document.querySelector('.index-contain .main').scrollTop = 0;
});

// css全局导入
import './css/artists.css'
import './css/artist.css'
import './assets/style/ele.css'
import "./assets/style/index.css"
import "./assets/icon/iconfont.css"
import './assets/iconfont/colorfont.css'
import './assets/iconfont/iconfont.css'
// 导入进度条样式
import 'nprogress/nprogress.css'

// 使用懒加载加快网站打开速度
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  preLoad: 1.3,
  error: import('./assets/images/error.svg'), //加载失败显示的图片
  // loading: require('./assets/images/loading.gif'), 
  // loading: 'https://m1.im5i.com/2022/08/31/UqnBNq.gif',
  loading:'https://pic1.imgdb.cn/item/63344ce316f2c2beb1649065.gif', // 加载中显示的图片
  attempt: 3, 
})

//导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 这是给ElementUI组件库组件设置默认参数（cdn加速和生产环境配置有区别）
Vue.prototype.$ELEMENT = {
  size: 'small',
  zIndex: 3000
};

// 全局混入过滤器函数
Vue.mixin(mixins)

Vue.config.productionTip = false
Vue.prototype.$Bus = new Vue()

/**
* 全局读取loacaStorage
*/
import { setItem, getItem, removeItem } from "./utils/utils.js";
Vue.prototype.setItem = setItem;
Vue.prototype.getItem = getItem;
Vue.prototype.removeItem = removeItem;

new Vue({
  render: h => h(App),
  el: '#app',
  router,
  store,
}).$mount('#app')
