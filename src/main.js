import Vue from 'vue'
import App from './App.vue'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import infiniteScroll from 'vue-infinite-scroll'

import '@/styles/index.less' // global css
import '@/styles/base.css'

import '@/utils/rem'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(infiniteScroll)

new Vue({
  render: h => h(App),
}).$mount('#app')
