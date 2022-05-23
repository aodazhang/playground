<template>
  <transition mode="out-in">
    <slot></slot>
  </transition>
</template>

<style lang="scss" scoped>
.v-enter-from,
.v-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
</style>
