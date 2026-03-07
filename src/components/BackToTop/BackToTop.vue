<script setup>
import { ref } from 'vue'
import { ArrowUp } from '@element-plus/icons-vue'

const isVisible = ref(false)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <transition name="fade">
    <div
      v-show="isVisible"
      class="back-to-top"
      @click="scrollToTop"
    >
      <el-icon :size="24"><ArrowUp /></el-icon>
    </div>
  </transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 30px;
  bottom: 100px;
  width: 50px;
  height: 50px;
  background: #409eff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
  transition: all 0.3s;
  z-index: 999;
}

.back-to-top:hover {
  background: #66b1ff;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.6);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
