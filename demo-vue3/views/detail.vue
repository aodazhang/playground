<template>
  <div>
    <h1>Detail</h1>
    <p>标题：{{ title }}</p>
    <button @click="router.go(-1)">返回</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DetailPage'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref('详情页')
</script>
