import { defineStore } from 'pinia'
import storage from '@/utils/storage'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: storage.get('orders', [])
  }),
  actions: {
    // 添加订单
    async addOrder(orderInfo) {
      return new Promise((resolve, reject) => {
        try {
          const order = {
            orderId: 'ORD' + Date.now(),
            ...orderInfo,
            status: '待支付',
            createdAt: new Date().toISOString()
          }
          this.orders.unshift(order)
          storage.set('orders', this.orders)
          resolve(order)
        } catch (e) {
          reject(e)
        }
      })
    },

    // 清空订单
    clearOrders() {
      this.orders = []
      storage.remove('orders')
    }
  }
})
