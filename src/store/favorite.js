import { defineStore } from 'pinia'
import storage from '@/utils/storage.js'
import favoriteMessage from '@/constant/favorite.js'

export const useFavoriteStore = defineStore(favoriteMessage.FAVORITE, {
  state: () => ({
    favorites: storage.get(favoriteMessage.FAVORITES, [])
  }),
  actions: {
    // 添加到收藏
    addToFavorites (product) {
      const exists = this.favorites.find(item => item.id === product.id)
      if (!exists) {
        this.favorites.push(product)
        storage.set(favoriteMessage.FAVORITES, this.favorites)
      }
    },

    // 从收藏移除
    removeFromFavorites (productId) {
      this.favorites = this.favorites.filter(item => item.id !== productId)
      storage.set(favoriteMessage.FAVORITES, this.favorites)
    },

    // 清空收藏
    clearFavorites () {
      this.favorites = []
      storage.remove(favoriteMessage.FAVORITES)
    },

    // 获取收藏
    getFavorites () {
      return this.favorites
    }
  }
})
