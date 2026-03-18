<script setup>
  import { ref, computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { Edit, Location, Document, Delete } from "@element-plus/icons-vue";
  import { ElMessage } from "element-plus";
  import { useCartStore } from "@/store/cart.js";
  import { useUserStore } from "@/store/user.js";
  import { useOrderStore } from "@/store/order.js";
  import { useProductStore } from "@/store/product.js";
  import AddressDialog from "@/components/AddressDialog/AddressDialog.vue";

  const router = useRouter();
  const route = useRoute();

  const cartStore = useCartStore();
  const userStore = useUserStore();
  const orderStore = useOrderStore();
  const productStore = useProductStore();

  const addressList = computed(() => userStore.addressList || []);

  const selectedAddress = computed(() => {
    return (
      addressList.value.find((addr) => addr.isDefault) || addressList.value[0]
    );
  });

  const handleSelectAddress = (address) => {
    userStore.setDefault(address.id);
  };

  const handleDeleteAddress = (id) => {
    userStore.deleteAddress(id);
  };

  const dialogVisible = ref(false);
  const editingAddress = ref(null);

  // 添加地址
  const handleAddAddress = () => {
    editingAddress.value = null;
    dialogVisible.value = true;
  };

  // 编辑地址
  const handleEditAddress = (address) => {
    editingAddress.value = address;
    dialogVisible.value = true;
  };

  // 保存地址
  const handleSaveAddress = (data) => {
    if (editingAddress.value) {
      userStore.updateAddress({
        ...data,
        id: editingAddress.value.id,
      });
    } else {
      userStore.addAddress(data);
    }
  };

  const orderItems = computed(() => {
    // 购物车结算：ids=1,2,3
    const ids = route.query.ids ? route.query.ids.split(",") : null;

    // 商品详情购买：id=1
    const productId = route.query.id;
    const quantity = cartStore.getProductCountById(productId) || 1;

    if (ids) {
      return cartStore.cartItems
        .filter((item) => ids.includes(String(item.id)))
        .map((item) => ({
          ...item,
          count: item.count,
        }));
    }

    // 先从购物车找
    let product = cartStore.cartItems.find((item) => item.id == productId);

    // 如果购物车没有，从商品库找
    if (!product) {
      product = productStore.products.find((item) => item.id == productId);
    }

    if (!product) return [];

    return [
      {
        ...product,
        count: quantity,
      },
    ];
  });

  const productIds = computed(() => {
    return orderItems.value.map((item) => item.id);
  });
  //

  const totalAmount = computed(() => {
    const result = orderItems.value.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
    return result.toFixed(2);
  });

  const remark = ref("");

  const handleSubmit = async () => {
    if (!userStore.isLoggedIn) {
      ElMessage.warning("请先登录");
      router.push("/login");
      return;
    }

    if (orderItems.value.length === 0) {
      ElMessage.warning("请选择要购买的商品");
      return;
    }

    if (!selectedAddress.value) {
      ElMessage.warning("请选择收货地址");
      return;
    }

    try {
      const orderData = {
        address: selectedAddress.value,
        items: orderItems.value,
        productIds: productIds.value,
        totalAmount: totalAmount.value,
        remark: remark.value,
      };

      await orderStore.addOrder(orderData);

      ElMessage.success("订单提交成功");

      router.push("/orders");
    } catch (err) {
      ElMessage.error("订单提交失败");
    }
  };
</script>
<template>
  <div class="order-confirm">
    <div class="page-header">
      <h1>确认订单</h1>
    </div>

    <div class="order-content">
      <!-- 收货地址 -->
      <div class="section">
        <div class="section-header">
          <el-icon><Location /></el-icon>
          <span>收货地址</span>
        </div>

        <div class="address-list">
          <div
            v-for="address in addressList"
            :key="address.id"
            class="address-item"
            :class="{ selected: selectedAddress?.id === address.id }"
            @click="handleSelectAddress(address)"
          >
            <div class="address-main">
              <div class="address-name">
                {{ address.name }} {{ address.phone }}
                <el-tag v-if="address.isDefault" type="primary" size="small">
                  默认
                </el-tag>
              </div>

              <div class="address-detail">
                {{ address.region?.names?.join(",") }} {{ address.detail }}
              </div>
            </div>

            <div class="address-actions">
              <el-button text @click.stop="handleEditAddress(address)">
                <el-icon><Edit /></el-icon>
                修改
              </el-button>

              <el-button
                text
                type="danger"
                @click.stop="handleDeleteAddress(address.id)"
              >
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
            </div>
          </div>
        </div>

        <div class="add-address">
          <el-button type="primary" @click="handleAddAddress">
            <el-icon><Edit /></el-icon>
            添加新地址
          </el-button>
        </div>
      </div>

      <!-- 商品 -->
      <div class="section">
        <div class="section-header">
          <el-icon><Document /></el-icon>
          <span>订单商品</span>
        </div>

        <div class="product-list">
          <div class="product-item" v-for="item in orderItems" :key="item.id">
            <img :src="item.image" :alt="item.title" />

            <div class="product-info">
              <h3>{{ item.title }}</h3>
              <p class="product-quantity">数量: {{ item.count }}</p>
            </div>

            <div class="product-price">
              <span>价格：</span>¥{{ (item.price * item.count).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>

      <!-- 金额 -->
      <div class="section">
        <div class="section-header">
          <el-icon><Document /></el-icon>
          <span>订单金额</span>
        </div>

        <div class="amount-details">
          <div class="amount-row">
            <span>商品总价</span>
            <span>¥{{ totalAmount }}</span>
          </div>

          <div class="amount-row">
            <span>运费</span>
            <span>¥0.00</span>
          </div>

          <div class="amount-row total">
            <span>实付款</span>
            <span class="total-price">¥{{ totalAmount }}</span>
          </div>
        </div>
      </div>

      <!-- 备注 -->
      <div class="section">
        <div class="section-header">
          <el-icon><Document /></el-icon>
          <span>订单备注</span>
        </div>

        <el-input
          v-model="remark"
          type="textarea"
          :rows="4"
          placeholder="请输入备注信息（选填）"
        />
      </div>

      <!-- 提交 -->
      <div class="submit-section">
        <el-button
          type="primary"
          size="large"
          @click="handleSubmit"
          style="width: 200px"
        >
          提交订单
        </el-button>
      </div>
    </div>

    <!-- 地址弹窗组件 -->
    <AddressDialog
      v-model:visible="dialogVisible"
      :address="editingAddress"
      @save="handleSaveAddress"
    />

    <BackToTop />
  </div>
</template>

<style scoped>
  .order-confirm {
    min-height: 100vh;
    background: #f5f5f5;
    padding: 20px;
  }

  .page-header {
    background: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  .page-header h1 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }

  .order-content {
    max-width: 1200px;
    margin: auto;
  }

  .section {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .address-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .address-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 18px;

    border: 2px solid #eee;
    border-radius: 8px;

    cursor: pointer;
    transition: 0.3s;
  }

  .address-item:hover {
    border-color: #409eff;
  }

  .address-item.selected {
    border-color: #409eff;
    background: #ecf5ff;
  }

  .address-main {
    flex: 1;
  }

  .address-name {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;

    display: flex;
    align-items: center;
    gap: 10px;
  }

  .address-detail {
    color: #666;
    font-size: 14px;
  }

  .address-actions {
    display: flex;
    gap: 10px;
  }

  .add-address {
    margin-top: 15px;
    text-align: center;
  }

  .product-list {
    border-top: 1px solid #eee;
    padding-top: 15px;
  }

  .product-item {
    display: flex;
    align-items: center;

    padding: 15px 0;

    border-bottom: 1px solid #eee;
  }

  .product-item:last-child {
    border-bottom: none;
  }

  .product-item img {
    width: 80px;
    height: 80px;

    object-fit: cover;

    border-radius: 4px;

    margin-right: 15px;
  }

  .product-info {
    flex: 1;
  }

  .product-info h3 {
    font-size: 16px;
    margin-bottom: 6px;
  }

  .product-quantity {
    color: #999;
    font-size: 14px;
  }

  .product-price {
    font-size: 18px;
    font-weight: bold;
    color: #ff4d4f;
  }

  .product-price span {
    color: #666;
    margin-left: 10px;
  }

  .amount-details {
    border-top: 1px solid #eee;
    padding-top: 15px;
  }

  .amount-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    color: #666;
  }

  .amount-row.total {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
    padding-top: 15px;
    border-top: 2px solid #eee;
  }

  .total-price {
    color: #ff4d4f;
    font-size: 26px;
  }

  .submit-section {
    text-align: right;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .order-content {
      padding: 0;
    }

    .section {
      padding: 15px;
    }

    .address-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .address-actions {
      width: 100%;
      justify-content: flex-end;
    }

    .product-item {
      flex-direction: column;
      align-items: flex-start;
    }

    .product-item img {
      margin-bottom: 10px;
    }

    .product-price {
      align-self: flex-end;
    }
  }
</style>
