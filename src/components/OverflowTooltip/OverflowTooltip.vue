<script setup>
  import { defineProps, ref, nextTick } from "vue";

  const props = defineProps({
    text: {
      type: String,
      default: "",
    },
  });

  const visible = ref(false);
  const textRef = ref(null);
  const wrapper = ref(null);
  const tooltipStyle = ref({ top: "0px", left: "0px" });

  const handleMouseEnter = async () => {
    await nextTick();
    const el = textRef.value;

    if (el.scrollWidth > el.clientWidth) {
      visible.value = true;

      // 计算 tooltip 位置
      const rect = wrapper.value.getBoundingClientRect();
      tooltipStyle.value = {
        top: rect.top + 6 + "px", // tooltip 距底部 6px
        left: rect.left + rect.width / 2 + "px",
        transform: "translateX(-50%) translateY(-100%)",
        position: "fixed",
      };
    }
  };

  const handleMouseLeave = () => {
    visible.value = false;
  };
</script>

<template>
  <div
    class="overflow-tooltip"
    ref="wrapper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <p ref="textRef" class="text">{{ text }}</p>

    <!-- tooltip 挂载到 body，避免被父容器裁切 -->
    <teleport to="body">
      <div v-if="visible" :style="tooltipStyle" class="tooltip">
        {{ text }}
      </div>
    </teleport>
  </div>
</template>

<style scoped>
  .overflow-tooltip {
    height: 40px; /* 根据需要调整 */
    cursor: pointer;

    /* 文字居中 */
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    overflow: hidden;
  }

  .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    text-align: center;
  }

  .tooltip {
    background: #303133;
    color: #fff;
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 4px;
    max-width: 300px;
    word-break: break-word;
    z-index: 9999;
    pointer-events: none; /* 鼠标不阻挡 */
  }
</style>
