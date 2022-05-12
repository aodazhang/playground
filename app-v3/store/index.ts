/**
 * @description pinia
 * @author aodazhang 2022.05.12
 * @extends https://pinia.vuejs.org/introduction.html
 */
import { createPinia, defineStore } from 'pinia'

const store = createPinia()

const commonStore = defineStore('common', {
  state: () => ({
    env: PROJECT_ENV,
    version: PROJECT_VERSION,
    buildTime: PROJECT_BUILDTIME,
    name: '',
    title: ''
  }),

  actions: {
    async init() {
      setTimeout(() => {
        this.$patch({ name: '测试用户_01', title: '测试标题_01' })
      }, 1000)
    }
  }
})

export { commonStore }
export default store
