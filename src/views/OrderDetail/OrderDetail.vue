<script setup>
  import { computed, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { ArrowLeft, Goods, Document } from "@element-plus/icons-vue";
  import { ElMessage, ElMessageBox } from "element-plus";
  import { useOrderStore } from "@/store/order";
  import { useUserStore } from "@/store/user";
  import { useCartStore } from "@/store/cart";
  import Address from "@/views/Address/Address.vue";

  const router = useRouter();
  const route = useRoute();

  const orderStore = useOrderStore();
  const userStore = useUserStore();
  const cartStore = useCartStore();

  const orderId = computed(() => Number(route.params.id));

  const orderDetail = computed(() =>
    orderStore.orders.find((order) => order.orderId === orderId.value),
  );

  const productIds = computed(() => {
    if (!orderDetail.value) return [];
    return orderDetail.value.items.map((item) => item.id);
  });

  const statusMap = {
    待支付: "warning",
    待发货: "primary",
    待收货: "info",
    已完成: "success",
    已取消: "danger",
  };

  const updateStatus = (status) => {
    if (!orderDetail.value) return;

    const updated = {
      ...orderDetail.value,
      status,
    };

    orderStore.updateOrder(orderId.value, updated);
  };

  const handleViewProduct = (product) => {
    router.push(`/productDetail/${product.id}`);
  };

  const handleBuyAgain = () => {
    cartStore.addToCart(productIds.value);
    ElMessage.success("已加入购物车");
  };

  const handlePay = () => {
    updateStatus("待发货");
    ElMessage.success("支付成功");
  };

  const handleCancel = () => {
    ElMessageBox.confirm("确定要取消订单吗？", "提示", {
      type: "warning",
    })
      .then(() => {
        updateStatus("已取消");
        ElMessage.success("订单已取消");
      })
      .catch(() => {});
  };

  const handleConfirmReceipt = () => {
    ElMessageBox.confirm("确定已收到商品？", "提示", {
      type: "warning",
    })
      .then(() => {
        updateStatus("已完成");
        ElMessage.success("确认收货成功");
      })
      .catch(() => {});
  };

  const handleRefund = () => {
    ElMessageBox.confirm("确定要申请退款吗？", "提示", {
      type: "warning",
    })
      .then(() => {
        updateStatus("已取消");
        ElMessage.success("申请已提交");
      })
      .catch(() => {});
  };

  onMounted(() => {
    if (!orderDetail.value) {
      ElMessage.warning("订单不存在");
      router.push("/orders");
    }
  });
</script>

<template>
  <div class="order-detail" v-if="orderDetail">
    <div class="back-btn" @click="router.back()">
      <el-icon><ArrowLeft /></el-icon>
      返回订单列表
    </div>

    <div class="detail-container">
      <div class="section">
        <div class="section-header">
          <el-icon><Document /></el-icon>
          <span>订单信息</span>
        </div>

        <div class="order-info">
          <div class="info-row">
            <span class="label">订单号:</span>
            <span class="value">{{ orderDetail.orderId }}</span>
          </div>

          <div class="info-row">
            <span class="label">订单状态:</span>
            <el-tag :type="statusMap[orderDetail.status]">
              {{ orderDetail.status }}
            </el-tag>
          </div>

          <div class="info-row">
            <span class="label">下单时间:</span>
            <span class="value">{{ orderDetail.createdAt }}</span>
          </div>

          <div class="info-row">
            <span class="label">支付方式:</span>
            <span class="value">在线支付</span>
          </div>
        </div>
      </div>

      <Address
        v-if="userStore.addressList && orderDetail.status === '待支付'"
      />

      <div class="section">
        <div class="section-header">
          <el-icon><Goods /></el-icon>
          <span>商品信息</span>
        </div>

        <div class="product-list">
          <div
            v-for="item in orderDetail.items"
            :key="item.id"
            class="product-item"
          >
            <img
              :src="item.image"
              :alt="item.title"
              @click="handleViewProduct(item)"
            />

            <div class="product-info">
              <h3 @click="handleViewProduct(item)">
                {{ item.title }}
              </h3>

              <p class="item-quantity">数量: {{ item.count }}</p>

              <p class="item-price">¥{{ item.price }}</p>
            </div>

            <div class="item-subtotal">¥{{ item.price * item.count }}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <el-icon><Document /></el-icon>
          <span>订单金额</span>
        </div>

        <div class="amount-details">
          <div class="amount-row">
            <span>商品总价</span>
            <span>¥{{ orderDetail.totalAmount }}</span>
          </div>

          <div class="amount-row">
            <span>运费</span>
            <span>¥0.00</span>
          </div>

          <div class="amount-row total">
            <span>实付款</span>
            <span class="total-price"> ¥{{ orderDetail.totalAmount }} </span>
          </div>
        </div>
      </div>

      <div class="action-section">
        <el-button
          v-if="orderDetail.status === '待支付'"
          type="primary"
          size="large"
          @click="handleRefund"
        >
          申请退款
        </el-button>

        <el-button
          v-if="orderDetail.status === '待支付'"
          type="primary"
          size="large"
          @click="handlePay"
        >
          去支付
        </el-button>

        <el-button
          v-if="orderDetail.status === '待发货'"
          type="danger"
          size="large"
          @click="handleCancel"
        >
          取消订单
        </el-button>

        <el-button
          v-if="orderDetail.status === '待收货'"
          type="success"
          size="large"
          @click="handleConfirmReceipt"
        >
          确认收货
        </el-button>

        <el-button
          v-if="orderDetail.status === '已完成'"
          type="primary"
          size="large"
          @click="handleBuyAgain"
        >
          再次购买
        </el-button>
      </div>
    </div>
  </div>

  <el-empty v-else description="订单不存在" />
</template>

<style scoped>
  .order-detail {
    min-height: 100vh;
    background: #f5f5f5;
    padding: 20px;
  }

  .back-btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 20px;
    color: #666;
  }

  .detail-container {
    max-width: 1200px;
    margin: auto;
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
  }

  .order-info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .info-row {
    display: flex;
    gap: 15px;
  }

  .label {
    width: 80px;
    color: #666;
  }

  .product-item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
  }

  .product-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 15px;
    border-radius: 4px;
    cursor: pointer;
  }

  .product-info {
    flex: 1;
  }

  .item-price {
    color: #ff4d4f;
    font-weight: bold;
  }

  .item-subtotal {
    font-size: 18px;
    font-weight: bold;
    color: #ff4d4f;
  }

  .amount-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }

  .total {
    font-size: 20px;
    font-weight: bold;
  }

  .total-price {
    color: #ff4d4f;
    font-size: 28px;
  }

  .action-section {
    text-align: right;
  }
</style>
