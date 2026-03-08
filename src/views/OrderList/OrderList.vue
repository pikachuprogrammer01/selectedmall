<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Location, Clock, Pointer, SuccessFilled } from '@element-plus/icons-vue'
import { useOrderStore } from '@/store/order'
import { useUserStore } from '@/store/user'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const orderStore = useOrderStore()
const userStore = useUserStore()

// 筛选状态
const filterStatus = ref('all')

// 订单状态选项
const statusOptions = [
  { label: '全部订单', value: 'all' },
  { label: '待支付', value: '待支付' },
  { label: '待发货', value: '待发货' },
  { label: '待收货', value: '待收货' },
  { label: '已完成', value: '已完成' },
  { label: '已取消', value: '已取消' }
]

// 订单状态映射
const statusMap = {
  '待支付': 'warning',
  '待发货': 'primary',
  '待收货': 'info',
  '已完成': 'success',
  '已取消': 'danger'
}

// 筛选后的订单
const filteredOrders = computed(() => {
  if (filterStatus.value === 'all') {
    return orderStore.orders
  }
  return orderStore.orders.filter(order => order.status === filterStatus.value)
})

// 查看订单详情
const handleViewDetail = (order) => {
  router.push({
    path: '/orderDetail',
    query: { id: order.orderId }
  })
}

// 立即支付
const handlePay = (order) => {
  ElMessage.success('支付成功')
  order.status = '待发货'
}

// 申请退款
const handleRefund = (order) => {
  ElMessageBox.confirm('确定要申请退款吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    order.status = '已取消'
    ElMessage.success('申请已提交')
  }).catch(() => {})
}

// 取消订单
const handleCancel = (order) => {
  ElMessageBox.confirm('确定要取消订单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    order.status = '已取消'
    ElMessage.success('订单已取消')
  }).catch(() => {})
}

// 再次购买
const handleBuyAgain = (order) => {
  ElMessage.success('已加入购物车')
}
</script>

<template>
  <div class="order-list">
    <div class="page-header">
      <h1>我的订单</h1>
    </div>

    <div class="order-content">
      <!-- 状态筛选 -->
      <div class="status-filter">
        <el-radio-group v-model="filterStatus">
          <el-radio
            v-for="option in statusOptions"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </div>

      <!-- 订单列表 -->
      <div class="order-list" v-if="filteredOrders.length > 0">
        <div class="order-card" v-for="order in filteredOrders" :key="order.orderId">
          <div class="order-header">
            <div class="order-id">
              订单号: {{ order.orderId }}
              <el-tag :type="statusMap[order.status]" size="small">
                <el-icon><Clock /></el-icon>
                {{ order.status }}
              </el-tag>
            </div>
            <div class="order-time">{{ order.createdAt }}</div>
          </div>

          <div class="order-items">
            <div
              v-for="item in order.items"
              :key="item.productId"
              class="order-item"
            >
              <img :src="item.image" :alt="item.name" />
              <div class="item-info">
                <h3>{{ item.name }}</h3>
                <p class="item-quantity">数量: {{ item.count }}</p>
                <p class="item-price">¥{{ item.price * item.count }}</p>
              </div>
            </div>
          </div>

          <div class="order-footer">
            <div class="order-total">
              <span>实付款:</span>
              <span class="total-price">¥{{ order.totalAmount }}</span>
            </div>

            <div class="order-actions">
              <el-button
                v-if="order.status === '待支付'"
                type="primary"
                @click="handlePay(order)"
              >
                立即支付
              </el-button>

              <el-button
                v-if="order.status === '待发货'"
                @click="handleCancel(order)"
              >
                取消订单
              </el-button>

              <el-button
                v-if="order.status === '已完成'"
                @click="handleBuyAgain(order)"
              >
                再次购买
              </el-button>

              <el-button type="primary" @click="handleViewDetail(order)">
                查看详情
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <el-empty v-else description="暂无订单" />
    </div>
  </div>
</template>

<style scoped>
.order-list {
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

.status-filter {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
}

.order-id {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
  font-weight: 600;
}

.order-time {
  color: #999;
  font-size: 14px;
}

.order-items {
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.order-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 4px;
}

.item-info {
  flex: 1;
  margin-right: 20px;
}

.item-info h3 {
  font-size: 16px;
  margin-bottom: 5px;
}

.item-quantity,
.item-price {
  color: #666;
  font-size: 14px;
}

.item-price {
  color: #ff4d4f;
  font-weight: bold;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-total {
  display: flex;
  align-items: center;
  gap: 10px;
}

.total-price {
  font-size: 20px;
  font-weight: bold;
  color: #ff4d4f;
}

.order-actions {
  display: flex;
  gap: 10px;
}

@media (max-width: 768px) {
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .order-footer {
    flex-direction: column;
    align-items: flex-end;
    gap: 15px;
  }

  .order-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
