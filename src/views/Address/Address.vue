<script setup>
  import { ref } from "vue";
  import { ElMessage, ElMessageBox } from "element-plus";
  import { Edit, Delete, Location, HomeFilled } from "@element-plus/icons-vue";
  import AddressSelector from "@/components/AddressSelector/AddressSelector.vue";
  import { useUserStore } from "@/store/user.js";
  import storage from "@/utils/storage.js";
  import addressMessage from "@/constant/address.js";

  const userStore = useUserStore();

  const addressStore = useUserStore();

  /* dialog */
  const dialogVisible = ref(false);
  const editingAddress = ref(null);
  const formRef = ref();

  const form = ref({
    name: "",
    phone: "",
    region: {
      codes: [],
      names: [],
    },
    detail: "",
    isDefault: false,
  });

  const rules = {
    name: [{ required: true, message: "请输入联系人", trigger: "blur" }],
    phone: [
      { required: true, message: "请输入手机号", trigger: "blur" },
      { min: 11, max: 11, message: "手机号长度为11位", trigger: "blur" },
    ],
    region: [
      {
        validator: (rule, value) => {
          if (!value || !value.codes || value.codes.length === 0) {
            return new Error("请选择地区");
          }
          return true;
        },
        trigger: "change",
      },
    ],
    detail: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
  };

  /* 新增 */
  const addAddress = () => {
    editingAddress.value = null;

    form.value = {
      name: "",
      phone: "",
      region: {
        codes: [],
        names: [],
      },
      detail: "",
      isDefault: false,
    };

    dialogVisible.value = true;
  };

  /* 编辑 */
  const editAddress = (addr) => {
    editingAddress.value = addr;

    form.value = {
      ...addr,
      region: addr.region || {
        codes: [],
        names: [],
      },
    };

    dialogVisible.value = true;
  };

  /* 删除 */
  const deleteAddress = (id) => {
    ElMessageBox.confirm("确定删除该地址吗？", "提示", {
      type: "warning",
    }).then(() => {
      userStore.deleteAddress(id);
      ElMessage.success("删除成功");
    });
  };

  /* 设置默认 */
  const setDefault = (id) => {
    userStore.setDefault(id);
    ElMessage.success("已设为默认地址");
  };

  /* 保存 */
  const saveAddress = () => {
    formRef.value.validate((valid) => {
      if (!valid) return;

      const addr = {
        name: form.value.name,
        phone: form.value.phone,
        region: form.value.region,
        detail: form.value.detail,
        isDefault: form.value.isDefault,
      };

      const address = storage.get(addressMessage.ADDRESS_LIST).find((a) => {
        return (
          a.name === addr.name &&
          a.phone === addr.phone &&
          a.region.codes.join(",") === addr.region.codes.join(",") &&
          a.detail === addr.detail
        );
      });
      if (address && address.id) {
        addr.id = address.id;
      }

      if (editingAddress.value) {
        userStore.updateAddress(addr);
        ElMessage.success("修改成功");
      } else {
        userStore.addAddress(addr);
        ElMessage.success("添加成功");
      }

      dialogVisible.value = false;
    });
  };
</script>

<template>
  <div class="address-page">
    <div class="header">
      <h2>收货地址</h2>

      <el-button type="primary" @click="addAddress">
        <el-icon><Location /></el-icon>
        新增地址
      </el-button>
    </div>

    <!-- 地址列表 -->
    <div class="address-list">
      <div
        v-for="item in addressStore.addressList"
        :key="item.id"
        class="address-card"
      >
        <div class="info">
          <div class="top">
            <span class="name">{{ item.name }}</span>
            <span class="phone">{{ item.phone }}</span>

            <el-tag v-if="item.isDefault" type="primary" size="small">
              默认
            </el-tag>
          </div>

          <div class="detail">
            {{ item.region.names.join(",") }} {{ item.detail }}
          </div>
        </div>

        <div class="actions">
          <el-button text @click.stop="editAddress(item)">
            <el-icon><Edit /></el-icon>
            编辑
          </el-button>

          <el-button text @click.stop="setDefault(item.id)">
            <el-icon><HomeFilled /></el-icon>
            默认
          </el-button>

          <el-button text type="danger" @click.stop="deleteAddress(item.id)">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </div>
      </div>
    </div>

    <!-- dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="editingAddress ? '编辑地址' : '新增地址'"
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
          <AddressSelector v-model="form.region" />
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
        <el-button type="primary" @click="saveAddress"> 保存 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
  .address-page {
    padding: 20px;
    background: #f5f5f5;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .address-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .address-card {
    background: white;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #eee;
  }

  .top {
    display: flex;
    gap: 12px;
    margin-bottom: 8px;
  }

  .name {
    font-weight: bold;
  }

  .phone {
    color: #666;
  }

  .detail {
    color: #666;
  }

  .actions {
    display: flex;
    gap: 10px;
  }
</style>
