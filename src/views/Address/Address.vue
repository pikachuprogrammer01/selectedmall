<script setup>
  import { ref } from "vue";
  import { ElMessage, ElMessageBox } from "element-plus";
  import { Location } from "@element-plus/icons-vue";
  import { useUserStore } from "@/store/user.js";
  import AddressDialog from "@/components/AddressDialog/AddressDialog.vue";
  import AddressSelector from "@/components/AddressSelector/AddressSelector.vue";

  const userStore = useUserStore();

  /* dialog */
  const dialogVisible = ref(false);
  const editingAddress = ref(null);

  /* 新增 */
  const addAddress = () => {
    editingAddress.value = null;
    dialogVisible.value = true;
  };

  /* 编辑 */
  const editAddress = (addr) => {
    editingAddress.value = addr;
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
  const saveAddress = (data) => {
    if (editingAddress.value) {
      const index = addressList.value.findIndex(
        (a) => a.id === editingAddress.value.id,
      );

      addressList.value[index] = {
        ...data,
        id: editingAddress.value.id,
      };
    } else {
      addressList.value.push({
        ...data,
        id: Date.now(),
      });
    }
  };

  // 选择的地址
  const selectedAddress = ref(null);
  const handleSelectAddress = (address) => {
    selectedAddress.value = address;
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
    <AddressSelector
      :addressList="userStore.addressList"
      @select="handleSelectAddress"
    />

    <!-- dialog -->
    <AddressDialog
      v-model:visible="dialogVisible"
      :address="editingAddress"
      @save="saveAddress"
    />
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
