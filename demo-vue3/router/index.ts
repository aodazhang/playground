/**
 * @description vue-router
 * @author aodazhang 2022.05.12
 * @extends https://router.vuejs.org/zh/installation.html
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "home" */ '@demo-vue3/views/home.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () =>
        import(/* webpackChunkName: "detail" */ '@demo-vue3/views/detail.vue')
    },
    {
      // 重定向路由：https://router.vuejs.org/zh/guide/migration/#%E5%88%A0%E9%99%A4%E4%BA%86-%EF%BC%88%E6%98%9F%E6%A0%87%E6%88%96%E9%80%9A%E9%85%8D%E7%AC%A6%EF%BC%89%E8%B7%AF%E7%94%B1
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0, left: 0 }
  }
})

export default router
