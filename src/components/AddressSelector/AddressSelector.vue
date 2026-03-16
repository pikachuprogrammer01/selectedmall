<script setup>
  import { ref, onMounted, watch } from "vue";
  import { useUserStore } from "@/store/user.js";
  const props = defineProps({
    addressList: {
      type: Array,
      default: () => [],
    },
  });

  const emit = defineEmits(["select"]);

  const userStore = useUserStore();
  const selectedAddressId = ref(null);

  const selectAddress = (address) => {
    selectedAddressId.value = address.id;
    emit("select", address);
  };

  /* 选择地址 */
  onMounted(() => {
    if (!props.addressList.length) return;

    const defaultAddress =
      props.addressList.find((item) => item.isDefault) || props.addressList[0];

    selectedAddressId.value = defaultAddress.id;

    emit("select", defaultAddress);
  });

  watch(
    () => userStore.addressList,
    (list) => {
      if (!list.length) return;

      const defaultAddress = list.find((item) => item.isDefault) || list[0];

      selectedAddressId.value = defaultAddress.id;

      emit("select", defaultAddress);
    },
    { immediate: true },
  );
</script>

<template>
  <div class="address-list">
    <div
      v-for="item in addressList"
      :key="item.id"
      class="address-card"
      :class="{ active: selectedAddressId === item.id }"
      @click="selectAddress(item)"
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
          {{ item.region?.names?.join(",") }} {{ item.detail }}
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
</template>

<style scoped>
  .address-card {
    border: 2px solid #eee;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .address-card:hover {
    border-color: #409eff;
  }

  .address-card.active {
    border-color: #409eff;
    background: #ecf5ff;
  }
</style>
