import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// layout
import Layout from '@/layout/layout'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errpage/404'),
    hidden: true
  },
  {
    path: '/500',
    component: () => import('@/views/errpage/500/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    redirect: '/dashboard/index',
    hidden: true
  },
  {
    path: '/icons',
    component: Layout,
    hidden: true,
    redirect: '/charts/index',
    children: [
      {
        path: 'index',
        name: 'Icons',
        component: () => import('@/views/icons'),
        meta: {title: '图标', icon: 'icons'}
      }]
  }
]

export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
