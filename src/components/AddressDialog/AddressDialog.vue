<script setup>
  import { ref, watch } from "vue";
  import AreaSelector from "@/components/AreaSelector/AreaSelector.vue";

  const props = defineProps({
    visible: Boolean,
    address: Object,
  });

  const emit = defineEmits(["update:visible", "save"]);

  const dialogVisible = ref(false);
  const formRef = ref();

  watch(
    () => props.visible,
    (val) => {
      dialogVisible.value = val;
    },
  );

  watch(dialogVisible, (val) => {
    emit("update:visible", val);
  });

  /* 表单 */
  const form = ref({
    name: "",
    phone: "",
    region: [],
    detail: "",
    isDefault: false,
  });

  /* 编辑时回填 */
  watch(
    () => props.address,
    (val) => {
      if (val) {
        form.value = { ...val };
      } else {
        form.value = {
          name: "",
          phone: "",
          region: [],
          detail: "",
          isDefault: false,
        };
      }
    },
    { immediate: true },
  );

  /* 校验 */
  const rules = {
    name: [{ required: true, message: "请输入联系人", trigger: "blur" }],
    phone: [
      { required: true, message: "请输入手机号", trigger: "blur" },
      {
        pattern: /^1[3-9]\d{9}$/,
        message: "手机号格式不正确",
        trigger: "blur",
      },
    ],
    region: [{ required: true, message: "请选择地区", trigger: "change" }],
    detail: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
  };

  /* 保存 */
  const save = () => {
    formRef.value.validate((valid) => {
      if (!valid) return;

      emit("save", { ...form.value });

      dialogVisible.value = false;
    });
  };
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="address ? '编辑地址' : '新增地址'"
    width="500px"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="联系人" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>

      <el-form-item label="地区" prop="region">
        <AreaSelector v-model="form.region" />
      </el-form-item>

      <el-form-item label="详细地址" prop="detail">
        <el-input v-model="form.detail" type="textarea" :rows="3" />
      </el-form-item>

      <el-form-item label="默认地址">
        <el-switch v-model="form.isDefault" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </el-dialog>
</template>
