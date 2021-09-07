import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import thoughtsRoutes from '@/routes/thoughts'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/Home')
  },
  {
    name: 'Thoughts',
    path: '/thoughts',
    component: () => import('@/views/thoughts/Main'),
    children: thoughtsRoutes,
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
