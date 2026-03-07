import { defineStore } from 'pinia'
import storage from '../utils/storage'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: storage.get('userInfo', null),
    token: storage.get('token', null),
    isLoggedIn: !!storage.get('token', null)
  }),
  actions: {
    // 登录
    async login({ username, password }) {
      // 模拟登录，实际项目中应该调用API
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 简单的用户验证
          if (username === 'admin' && password === '123456') {
            const userInfo = {
              id: 1,
              username: username,
              name: 'Admin User',
              email: 'admin@example.com'
            }
            const token = 'mock-token-' + Date.now()
            this.userInfo = userInfo
            this.token = token
            this.isLoggedIn = true
            storage.set('token', token)
            storage.set('userInfo', userInfo)
            resolve(userInfo)
          } else {
            reject('用户名或密码错误')
          }
        }, 500)
      })
    },

    // 注册
    async register(userInfo) {
      // 模拟注册，实际项目中应该调用API
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const token = 'mock-token-' + Date.now()
          this.userInfo = userInfo
          this.token = token
          this.isLoggedIn = true
          storage.set('token', token)
          storage.set('userInfo', userInfo)
          resolve(userInfo)
        }, 500)
      })
    },

    // 登出
    logout() {
      this.userInfo = null
      this.token = null
      this.isLoggedIn = false
      storage.remove('token')
      storage.remove('userInfo')
    },

    // 是否登录
    isLogin() {
      return storage.get('token') && storage.get('userInfo') ? true : false
    }
  }
})
