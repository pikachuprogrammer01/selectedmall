import { defineStore } from 'pinia'

const BASE_URL = import.meta.env.BASE_URL

export const useBannerStore = defineStore('banner', {
  state: () => ({
    banners: [
      {
        id: 1,
        image: BASE_URL + 'banners/banner1.jpg',
      },
      {
        id: 2,
        image: BASE_URL + 'banners/banner2.jpg',
      },
      {
        id: 3,
        image: BASE_URL + 'banners/banner3.jpg',
      },
      {
        id: 4,
        image: BASE_URL + 'banners/banner4.jpg',
      },
      {
        id: 5,
        image: BASE_URL + 'banners/banner5.jpg',
      }]
  }),
  actions: {
  }
})