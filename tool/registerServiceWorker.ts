/**
 * @description 页面pwa注册
 * @author aodazhang 2022.05.12
 */
/* eslint-disable */
import { register } from 'register-service-worker'

if (PROJECT_ENV === 'prod') {
  register('./sw.js', {
    registrationOptions: { scope: './' },
    ready() {
      console.log('serviceWorker已加载')
    },
    registered() {
      console.log('serviceWorker已注册')
    },
    cached() {
      console.log('serviceWorker已缓存')
    },
    updatefound() {
      console.log('serviceWorker发现更新')
    },
    updated() {
      console.log('serviceWorker已更新，需刷新页面')
    },
    offline() {
      console.log('serviceWorker已离线')
    },
    error(error) {
      console.error('serviceWorker异常', error)
    }
  })
}
