import { defineStore } from 'pinia'
import storage from '@/utils/storage'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: storage.get('favorites', [])
  }),
  actions: {
    // 添加到收藏
    addToFavorites(product) {
      const exists = this.favorites.find(item => item.id === product.id)
      if (!exists) {
        this.favorites.push(product)
        storage.set('favorites', this.favorites)
      }
    },

    // 从收藏移除
    removeFromFavorites(productId) {
      this.favorites = this.favorites.filter(item => item.id !== productId)
      storage.set('favorites', this.favorites)
    },

    // 清空收藏
    clearFavorites() {
      this.favorites = []
      storage.remove('favorites')
    }
  }
})
