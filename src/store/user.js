import { defineStore } from 'pinia'
import { ref } from 'vue'
import storage from '@/utils/storage.js'
import USER from '@/constant/user.js'

// 添加用户数据到用户列表
function addUserList (user, password) {
  const id = USER.ADMIN_ID++;
  const token = (USER.MOCK_TOKEN + Date.now());
  const name = USER.USER_NAME
  const userInfo = {
    id,
    username: user.username,
    name,
    email: user.email
  }

  const userInfoDetail = ref({
    ...userInfo,
    password,
    token,
  })

  this.userList.push(userInfoDetail.value) // 将用户信息添加到用户列表中

  return token
}

/**
 * 判断系统用户的用户名与密码是否正确
 * @param username 用户名
 * @param password 密码
 * @returns 如果是系统用户且用户名与密码正确则返回 true ,否则返回 false
 */
function isAdminLogin (that, username, password) {
  const admin = that.userList.find(u => u.id === USER.ADMIN_ID);
  let flag = admin ? true : false;
  if (flag) {
    return admin.username === username && admin.password == password
  }
  return flag;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: storage.get(USER.USERINFO),
    token: storage.get(USER.TOKEN),
    isLoggedIn: !!storage.get(USER.TOKEN),
    userList: [{
      id: USER.ADMIN_ID,
      username: USER.ADMIN_USERNAME,
      name: USER.ADMIN_NAME,
      email: 'admin@example.com',
      phone: '13888888888',
      password: USER.INIT_ADMIN_PASSWORD
    }],
  }),
  actions: {
    // 登录
    async login (username, password) {
      // 模拟登录，实际项目中应该调用API
      return new Promise((resolve, reject) => {
        // 如果是系统用户则保存 token
        if (isAdminLogin(this, username, password)) {
          const token = USER.MOCK_TOKEN + Date.now()
          this.token = token
          storage.set(USER.TOKEN, token)

          const userInfo = {
            id: USER.ADMIN_ID,
            username: USER.ADMIN_USERNAME,
            name: USER.ADMIN_NAME,
            email: 'admin@example.com',
            phone: '13888888888',
          };

          this.isLoggedIn = true;

          this.userInfo = userInfo;
          storage.set(USER.USERINFO, userInfo);

          resolve('登录成功')
          return
        }
        setTimeout(() => {
          // 简单的用户验证
          const user = this.userList.find(u => u.username === username && u.password === password);
          if (user) {
            this.token = USER.MOCK_TOKEN + Date.now()
            storage.set(USER.TOKEN, token)

            this.isLoggedIn = true

            this.userInfo = userInfo
            storage.set(USER.USERINFO, userInfo)

            resolve('登录成功')
          } else {
            resolve('用户名或密码错误')
          }
        }, 500)
      }).catch(err => reject(err))
    },

    // 注册
    async register (userInfo) {
      // 模拟注册，实际项目中应该调用API
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const that = this;
          const token = addUserList.call(that, userInfo, userInfo.password);
          this.token = token
          storage.set(USER.TOKEN, token)
          this.isLoggedIn = true

          this.userInfo = userInfo
          storage.set(USER.USERINFO, userInfo)

          resolve(userInfo)
        }, 500)
      })
    },

    // 登出
    logout () {
      this.userInfo = null
      this.token = null
      this.isLoggedIn = false
      storage.remove(USER.TOKEN)
      storage.remove(USER.USERINFO)
      storage.remove(USER.USERID)
    },

    // 更新用户信息
    updateUser (user) {
      const index = this.userList.findIndex(u => u.id === user.id);
      if (index !== -1) {
        Object.assign(this.userList[index], user);
        if (this.userInfo && this.userInfo.id === user.id) {
          Object.assign(this.userInfo, user);
          storage.set(USER.USERINFO, this.userInfo);
        }
      }
    },

    // 更新用户密码
    updateUserPassword (userId, newPassword) {
      const index = this.userList.findIndex(u => u.id === userId);
      if (index !== -1) {
        this.userList[index].password = newPassword;
        if (this.userInfo && this.userInfo.id === userId) {
          this.userInfo.password = newPassword;
          storage.set(USER.USERINFO, this.userInfo);
        }
      }
    }
  }
})
