import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import toast from 'components/common/toast'

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)
//通过原型的方法创建$bus，同时也要给一个Vue实例，Vue实例是可以做时间总线的
Vue.prototype.$bus = new Vue
//安装toast插件
Vue.use(toast)
//按需引入MintUI 和样式
import 'mint-ui/lib/style.css'
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
