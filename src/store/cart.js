import { defineStore } from 'pinia'
import storage from '@/utils/storage.js'
import cartMessage from '@/constant/cart.js'

export const useCartStore = defineStore(cartMessage.CART, {
  state: () => ({
    cartItems: storage.get(cartMessage.CART_ITEMS, [])
  }),
  actions: {
    // 添加到购物车
    addToCart (product) {
      const existingItem = this.cartItems.find(item =>
        item.productId === product.id
      )

      if (existingItem) {
        existingItem.count += 1
      } else {
        this.cartItems.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          count: 1
        })
      }

      storage.set(cartMessage.CART_ITEMS, this.cartItems)
    },

    // 从购物车移除
    removeFromCart (productId) {
      this.cartItems = this.cartItems.filter(item => item.productId !== productId)
      storage.set(cartMessage.CART_ITEMS, this.cartItems)
    },

    // 更新商品数量
    updateCartCount ({ productId, count }) {
      const item = this.cartItems.find(item => item.productId === productId)
      if (item) {
        item.count = count
        storage.set(cartMessage.CART_ITEMS, this.cartItems)
      }
    },

    // 清空购物车
    clearCart () {
      this.cartItems = []
      storage.remove(cartMessage.CART_ITEMS)
    }
  }
})
