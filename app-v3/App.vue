<template>
  <router-view v-slot="{ Component, route }">
    <animation-move>
      <keep-alive :exclude="exclude">
        <component :is="Component" :key="route.name" />
      </keep-alive>
    </animation-move>
  </router-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AnimationMove from './components/animation-move.vue'

// 禁用keep-alive特性的页面
const exclude = ref(['DetailPage'])
</script>
