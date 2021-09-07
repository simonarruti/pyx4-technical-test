/*
===============
Element UI documentation: https://element.eleme.io/#/en-US/component/quickstart
===============
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/scss/main.scss'

// Element UI Components ans Prototypes extensions
import {
  Button,
  Row,
  Col,
  Card,
  Divider,
  Popover,
  Input,
  Loading,
  Pagination,
  Message,
  MessageBox,
  Empty
} from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Divider)
Vue.use(Popover)
Vue.use(Input)
Vue.use(Loading)
Vue.use(Pagination)
Vue.use(Empty)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
