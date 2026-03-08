<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Location, Phone, Clock, Pointer, SuccessFilled, Goods, Document } from '@element-plus/icons-vue'
import { useOrderStore } from '@/store/order'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const orderStore = useOrderStore()
const userStore = useUserStore()

const orderId = computed(() => route.query.id)

// 订单状态映射
const statusMap = {
  '待支付': 'warning',
  '待发货': 'primary',
  '待收货': 'info',
  '已完成': 'success',
  '已取消': 'danger'
}

// 订单详情
const orderDetail = ref(null)

// 加载订单详情
const loadOrderDetail = () => {
  if (orderId.value) {
    orderDetail.value = orderStore.orders.find(order => order.orderId === orderId.value)
  }
}

// 查看商品详情
const handleViewProduct = (product) => {
  router.push({
    path: '/productDetail',
    query: { id: product.productId }
  })
}

// 再次购买
const handleBuyAgain = () => {
  ElMessage.success('已加入购物车')
}

// 申请退款
const handleRefund = () => {
  ElMessageBox.confirm('确定要申请退款吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (orderDetail.value) {
      orderDetail.value.status = '已取消'
    }
    ElMessage.success('申请已提交')
  }).catch(() => {})
}

// 确认收货
const handleConfirmReceipt = () => {
  ElMessageBox.confirm('确定已收到商品？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (orderDetail.value) {
      orderDetail.value.status = '已完成'
    }
    ElMessage.success('确认收货成功')
  }).catch(() => {})
}

// 取消订单
const handleCancel = () => {
  ElMessageBox.confirm('确定要取消订单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (orderDetail.value) {
      orderDetail.value.status = '已取消'
    }
    ElMessage.success('订单已取消')
  }).catch(() => {})
}

onMounted(() => {
  loadOrderDetail()
  if (!orderId.value) {
    ElMessage.warning('订单不存在')
    router.push('/orders')
  }
})
</script>

<template>
  <div class="order-detail" v-if="orderDetail">
    <div class="back-btn" @click="router.back()">
      <el-icon><ArrowLeft /></el-icon>
      返回订单列表
    </div>

    <div class="detail-container">
      <!-- 订单信息 -->
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

      <!-- 收货地址 -->
      <div class="section">
        <div class="section-header">
          <el-icon><Location /></el-icon>
          <span>收货地址</span>
        </div>

        <div class="address-info">
          <div class="address-main">
            <div class="address-name">
              {{ orderDetail.address.name }} {{ orderDetail.address.phone }}
              <el-tag v-if="orderDetail.address.isDefault" type="primary" size="small">默认</el-tag>
            </div>
            <div class="address-detail">
              {{ orderDetail.address.province }} {{ orderDetail.address.city }} {{ orderDetail.address.district }} {{ orderDetail.address.detail }}
            </div>
          </div>
        </div>
      </div>

      <!-- 订单商品 -->
      <div class="section">
        <div class="section-header">
          <el-icon><Goods /></el-icon>
          <span>商品信息</span>
        </div>

        <div class="product-list">
          <div
            v-for="item in orderDetail.items"
            :key="item.productId"
            class="product-item"
          >
            <img :src="item.image" :alt="item.name" @click="handleViewProduct(item)" />
            <div class="product-info">
              <h3 @click="handleViewProduct(item)">{{ item.name }}</h3>
              <p class="item-quantity">数量: {{ item.count }}</p>
              <p class="item-price">¥{{ item.price }}</p>
            </div>
            <div class="item-subtotal">¥{{ item.price * item.count }}</div>
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
            <span>¥{{ orderDetail.totalAmount }}</span>
          </div>
          <div class="amount-row">
            <span>运费</span>
            <span>¥0.00</span>
          </div>
          <div class="amount-row total">
            <span>实付款</span>
            <span class="total-price">¥{{ orderDetail.totalAmount }}</span>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
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
  font-size: 14px;
}

.back-btn:hover {
  color: #409eff;
}

.detail-container {
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

.order-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.info-row {
  display: flex;
  gap: 15px;
}

.info-row .label {
  color: #666;
  width: 80px;
}

.info-row .value {
  font-weight: 600;
  color: #333;
}

.address-info {
  display: flex;
  align-items: center;
  gap: 20px;
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
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 4px;
  cursor: pointer;
}

.product-info {
  flex: 1;
  margin-right: 20px;
}

.product-info h3 {
  font-size: 16px;
  margin-bottom: 5px;
  cursor: pointer;
}

.item-quantity {
  color: #999;
  font-size: 14px;
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

.action-section {
  text-align: right;
  padding: 20px 0;
}

@media (max-width: 768px) {
  .order-info {
    grid-template-columns: 1fr;
  }

  .product-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .product-item img {
    width: 100%;
    height: 200px;
  }

  .product-info {
    margin-right: 0;
    margin-top: 15px;
  }

  .action-section {
    text-align: center;
  }
}
</style>
