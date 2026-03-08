import { defineStore } from 'pinia'
import { ref } from 'vue'
import storage from '@/utils/storage'

// 创建系统用户
function addAdminUser(id, username, password) {
  const userInfo = {
    id,
    username,
    name: 'Admin User',
    email: 'admin@example.com'
  }
  const token = 'mock-token-' + Date.now()
  this.token = token
  const userInfoDetail = ref({
     ...userInfo,
     password,
     token,
  });

  this.userList.push(userInfoDetail) // 将用户信息添加到用户列表中
  return userInfo
}

// 添加用户数据到用户列表
function addUserList(user, password) {
  const id = setID()
  const token = 'mock-token-' + Date.now()
  const name = 'User'
  const userInfo = {
    id,
    username: user.username,
    name,
    email: user.email
  }
  this.userInfo = userInfo
  this.token = token
  
  const userInfoDetail = ref({
    ...userInfo,
    password,
    token,
  })

  this.userList.push(userInfoDetail) // 将用户信息添加到用户列表中
}

// 生成唯一ID并存储
function setID() {
  const ID = new Date.now();
  this.ids.push(ID);
  storage.set('id', ID);

  return ID;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: storage.get('userInfo', null),
    token: storage.get('token', null),
    isLoggedIn: !!storage.get('token', null),
    userList: ref([]),
    ids: ref([]),
  }),
  actions: {
    // 登录
    async login(username, password) {
      // 模拟登录，实际项目中应该调用API
      return new Promise((resolve, reject) => {
        if (!this.userList.some(u => u.username === 'admin' && u.password === '123456' && u.id === 1)) {
          const ID = 1;
          this.ids.push(ID);
          storage.set('id', ID);
          
          const userInfo = addAdminUser.call(this, ID, username, password);
          
          this.isLoggedIn = true
          
          storage.set('token', token)
          storage.set('userInfo', userInfo)

          resolve(userInfo)
          return
        }
        setTimeout(() => {
          // 简单的用户验证
          const user = this.userList.find(u => u.username === username);
          const password = this.userList.find(u => u.password === password);
          if (user && password) {
            addUserList.call(this, user, password);
            
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
          addUserList.call(this, userInfo, userInfo.password);

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
      this.ids = null;
      this.isLoggedIn = false
      storage.remove('token')
      storage.remove('userInfo')
      storage.remove('id')
    },
  }
})
