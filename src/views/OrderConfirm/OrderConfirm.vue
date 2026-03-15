<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import {
    Edit,
    Location,
    Phone,
    Document,
    Delete,
  } from "@element-plus/icons-vue";
  import { useCartStore } from "@/store/cart";
  import { useUserStore } from "@/store/user";
  import { ElMessage } from "element-plus";

  const router = useRouter();
  const cartStore = useCartStore();
  const userStore = useUserStore();

  // 收货地址
  const addressList = ref([
    {
      id: 1,
      name: "张三",
      phone: "13800138000",
      province: "北京市",
      city: "北京市",
      district: "朝阳区",
      detail: "某某街道123号",
      isDefault: true,
    },
    {
      id: 2,
      name: "张三",
      phone: "13800138000",
      province: "北京市",
      city: "北京市",
      district: "海淀区",
      detail: "某某街道456号",
      isDefault: false,
    },
  ]);

  const selectedAddress = computed(() => {
    return (
      addressList.value.find((addr) => addr.isDefault) || addressList.value[0]
    );
  });

  // 选中地址
  const handleSelectAddress = (address) => {
    addressList.value.forEach((addr) => (addr.isDefault = false));
    address.isDefault = true;
    selectedAddress.value = address;
  };

  // 添加地址
  const handleAddAddress = () => {
    router.push("/address");
  };

  // 修改地址
  const handleEditAddress = (address) => {
    router.push({ path: "/address", query: { id: address.id } });
  };

  // 订单商品
  const orderItems = computed(() => {
    return cartStore.cartItems.filter((item) => item.checked);
  });

  // 订单金额
  const totalAmount = computed(() => {
    return orderItems.value.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  });

  // 订单备注
  const remark = ref("");

  // 提交订单
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

    try {
      const orderData = {
        address: selectedAddress.value,
        items: orderItems.value,
        totalAmount: totalAmount.value,
        remark: remark.value,
      };

      await cartStore.addOrder(orderData);
      ElMessage.success("订单提交成功");
      router.push("/orders");
    } catch (e) {
      ElMessage.error("订单提交失败");
    }
  };

  onMounted(() => {
    if (orderItems.value.length === 0) {
      ElMessage.warning("购物车为空");
      router.push("/cart");
    }
  });
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
            :class="{ selected: selectedAddress.id === address.id }"
            @click="handleSelectAddress(address)"
          >
            <div class="address-main">
              <div class="address-name">
                {{ address.name }} {{ address.phone }}
                <el-tag v-if="address.isDefault" type="primary" size="small"
                  >默认</el-tag
                >
              </div>
              <div class="address-detail">
                {{ address.province }} {{ address.city }} {{ address.district }}
                {{ address.detail }}
              </div>
            </div>

            <div class="address-actions">
              <el-button
                type="primary"
                text
                @click="handleEditAddress(address)"
              >
                <el-icon><Edit /></el-icon>
                修改
              </el-button>
              <el-button
                type="danger"
                text
                @click="handleDeleteAddress(address.id)"
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

      <!-- 订单商品 -->
      <div class="section">
        <div class="section-header">
          <el-icon><Document /></el-icon>
          <span>订单商品</span>
        </div>

        <div class="product-list">
          <div
            class="product-item"
            v-for="item in orderItems"
            :key="item.productId"
          >
            <img :src="item.image" :alt="item.name" />
            <div class="product-info">
              <h3>{{ item.name }}</h3>
              <p class="product-quantity">数量: {{ item.count }}</p>
            </div>
            <div class="product-price">¥{{ item.price * item.count }}</div>
          </div>
        </div>
      </div>

      <!-- 订单金额 -->
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

      <!-- 订单备注 -->
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

      <!-- 提交订单 -->
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
    background: #fff;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .page-header h1 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }

  .order-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section {
    background: #fff;
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
    color: #333;
  }

  .address-list {
    margin-bottom: 20px;
  }

  .address-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border: 2px solid #eee;
    border-radius: 8px;
    margin-bottom: 15px;
    cursor: pointer;
    transition: all 0.3s;
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
    margin-bottom: 8px;
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
    margin-right: 15px;
    border-radius: 4px;
  }

  .product-info {
    flex: 1;
    margin-right: 20px;
  }

  .product-info h3 {
    font-size: 16px;
    margin-bottom: 5px;
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

  .amount-details {
    border-top: 1px solid #eee;
    padding-top: 15px;
  }

  .amount-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    color: #666;
  }

  .amount-row.total {
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid #eee;
  }

  .total-price {
    color: #ff4d4f;
    font-size: 28px;
  }

  .submit-section {
    text-align: right;
    padding: 20px 0;
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
      gap: 15px;
    }

    .address-actions {
      width: 100%;
      justify-content: flex-end;
    }
  }
</style>
