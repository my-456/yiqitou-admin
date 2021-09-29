import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home/index.vue'
import Layout from '@/views/layout/'
// import { resolve } from 'core-js/fn/promise'
// import Store from '../store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/info',
        name: 'Info',
        component: resolve => (require(['@/views/info/'], resolve))
      },
      {
        path: '/detail',
        name: 'Detail',
        component: resolve => (require(['@/views/info/'], resolve))
      },
      {
        path: '/publish',
        name: 'Publish',
        component: resolve => (require(['@/views/publish/'], resolve))
      },
      {
        path: '/image',
        name: 'Image',
        component: resolve => (require(['@/views/image/'], resolve))
      },
      {
        path: '/comment',
        name: 'Comment',
        component: resolve => (require(['@/views/comment/'], resolve))
      },
      {
        path: '/settings',
        name: 'Setting',
        component: resolve => (require(['@/views/settings/'], resolve))
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫：所有的页面导航都会经过这里
// 守卫页面的导航的
// to:要去的路由信息
// from：来自哪里的路由信息
// next: 放行方法
// router.beforeEach((to, form, next) => {
//   console.log('页面进来了')
//   console.log(to, form)
//   if (to.path !== '/login') {
//     if (Store.state.user !== '') {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     // 允许通过
//     next()
//   }
// })
export default router
