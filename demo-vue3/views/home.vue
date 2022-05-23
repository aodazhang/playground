<template>
  <div>
    <h1>page_1</h1>
    <p>构建时间：{{ buildTime }}</p>
    <p>标题：{{ title }}</p>
    <p>姓名：{{ name }}</p>
    <img
      src="http://5b0988e595225.cdn.sohucs.com/images/20190423/5105ccb94a1a4b3cb97ad6a94221b6c5.jpeg"
    />
    <button @click="router.push({ name: 'detail' })">详情</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage'
}
</script>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { commonStore } from '@demo-vue3/store'

const router = useRouter()
const common = commonStore()
const { buildTime, title, name } = storeToRefs(common)

common.init()
</script>

<style lang="scss" scoped>
img {
  width: 200px;
  height: 200px;
}
</style>
