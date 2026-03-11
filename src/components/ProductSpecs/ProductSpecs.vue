<script setup>
  import { computed } from "vue";
  import specMap from "@/constant/specsMap.js";

  const props = defineProps({
    specs: {
      type: Array,
      default: () => [],
    },
  });

  /* 生成规格描述 */
  const specList = computed(() => {
    return props.specs.map((item) => ({
      label: specMap[item.key] || item.key,
      value: item.value,
    }));
  });
</script>

<template>
  <el-descriptions title="商品规格" :column="2" border>
    <el-descriptions-item
      v-for="spec in specList"
      :key="spec.label"
      :label="spec.label"
    >
      {{ spec.value }}
    </el-descriptions-item>
  </el-descriptions>
</template>
