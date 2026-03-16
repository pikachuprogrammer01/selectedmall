import { defineStore } from "pinia";
import storage from "@/utils/storage.js";
import ordersMessage from "@/constant/orders.js";

export const useOrderStore = defineStore(ordersMessage.ORDER, {
  state: () => ({
    orders: storage.get(ordersMessage.ORDERS) || []
  }),
  actions: {
    // 添加订单
    async addOrder (orderInfo) {
      const order = {
        orderId: ordersMessage.ORD + Date.now(),
        ...orderInfo,
        status: ordersMessage.TOBEPAID,
        createdAt: new Date().toISOString()
      };

      this.orders.unshift(order);

      storage.set(ordersMessage.ORDERS, this.orders);

      return order;
    },


    // 获取订单
    getOrders () {
      return this.orders || [];
    },


    // 获取订单总数
    getOrdersTotal () {
      return this.orders.length;
    },

    // 获取订单ById
    getOrderById (orderId) {
      return this.orders.find(order => order.orderId === orderId);
    },

    // 获取待支付订单
    getToBePaidOrders () {
      return this.orders.filter(
        order => order.status === ordersMessage.TOBEPAID
      );
    },

    // 获取待支付订单总数
    getToBePaidOrdersTotal () {
      return this.orders.filter(
        order => order.status === ordersMessage.TOBEPAID
      ).length;
    },

    // 修改订单
    updateOrder (orderIds, orderInfo) {
      const ids = Array.isArray(orderIds) ? orderIds : [orderIds]

      this.orders.forEach(order => {
        if (ids.includes(order.orderId)) {
          Object.assign(order, orderInfo)
          order.updatedAt = new Date().toISOString()
        }
      })

      storage.set(ordersMessage.ORDERS, this.orders)
    },

    // 清空订单
    clearOrders () {
      this.orders = [];
      storage.remove(ordersMessage.ORDERS);
    }
  }
});