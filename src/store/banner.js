import { defineStore } from 'pinia'

export const useBannerStore = defineStore('banner', {
  state: () => ({
    banners: [
      {
        id: 1,
        image: 'banners/banner1.jpg',
      },
      {
        id: 2,
        image: 'banners/banner2.jpg',
      },
      {
        id: 3,
        image: 'banners/banner3.jpg',
      },
      {
        id: 4,
        image: 'banners/banner4.jpg',
      },
      {
        id: 5,
        image: 'banners/banner5.jpg',
      }]
  }),
  actions: {
  }
})