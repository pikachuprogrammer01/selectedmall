import { defineStore } from 'pinia'
import storage from '@/utils/storage'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: storage.get('cartItems', [])
  }),
  actions: {
    // 添加到购物车
    addToCart(product) {
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

      storage.set('cartItems', this.cartItems)
    },

    // 从购物车移除
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.productId !== productId)
      storage.set('cartItems', this.cartItems)
    },

    // 更新商品数量
    updateCartCount({ productId, count }) {
      const item = this.cartItems.find(item => item.productId === productId)
      if (item) {
        item.count = count
        storage.set('cartItems', this.cartItems)
      }
    },

    // 清空购物车
    clearCart() {
      this.cartItems = []
      storage.remove('cartItems')
    }
  }
})
