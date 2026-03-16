<script setup>
  import { ref, watch, onMounted } from "vue";

  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({
        codes: [],
        names: [],
      }),
    },
  });

  const emit = defineEmits(["update:modelValue", "change"]);

  const cascaderRef = ref(null);
  const selected = ref([]);

  const options = ref([]);

  // 回显
  watch(
    () => props.modelValue,
    (val) => {
      if (val?.codes) {
        selected.value = val.codes;
      }
    },
    { immediate: true },
  );

  // 选择变化
  const handleChange = (val) => {
    const nodes = cascaderRef.value.getCheckedNodes();

    const names = nodes[0]?.pathLabels || [];
    const codes = nodes[0]?.pathValues || val;

    const result = {
      codes,
      names,
    };

    emit("update:modelValue", result);
    emit("change", result);
  };

  // 格式化数据
  const formatData = (data) =>
    data.map((province) => ({
      value: province.code,
      label: province.name,
      children: province.children.map((city) => ({
        value: city.code,
        label: city.name,
        children: city.children.map((area) => ({
          value: area.code,
          label: area.name,
        })),
      })),
    }));

  // 加载行政区
  onMounted(async () => {
    const res = await fetch(
      "https://cdn.jsdelivr.net/gh/modood/Administrative-divisions-of-China/dist/pcas-code.json",
    );
    const data = await res.json();
    options.value = formatData(data);
  });
</script>

<template>
  <el-cascader
    ref="cascaderRef"
    v-model="selected"
    :options="options"
    placeholder="请选择省市区"
    @change="handleChange"
    clearable
  />
</template>

<style scoped>
  .el-cascader {
    width: 100%;
  }
</style>
