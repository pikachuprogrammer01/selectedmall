import { defineStore } from 'pinia'
import storage from '@/utils/storage'
import ordersMessage from '@/constant/orders'

export const useOrderStore = defineStore(ordersMessage.ORDER, {
  state: () => ({
    orders: storage.get(ordersMessage.ORDERS, [])
  }),
  actions: {
    // 添加订单
    async addOrder (orderInfo) {
      return new Promise((resolve, reject) => {
        try {
          const order = {
            orderId: ordersMessage.ORD + Date.now(),
            ...orderInfo,
            status: ordersMessage.TOBEPAID,
            createdAt: new Date().toISOString()
          }
          this.orders.unshift(order)
          storage.set(ordersMessage.ORDERS, this.orders)
          resolve(order)
        } catch (e) {
          reject(e)
        }
      })
    },

    // 清空订单
    clearOrders () {
      this.orders = []
      storage.remove(ordersMessage.ORDERS)
    }
  }
})
