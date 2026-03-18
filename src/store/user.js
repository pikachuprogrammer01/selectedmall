import { defineStore } from 'pinia'
import { ref } from 'vue'
import storage from '@/utils/storage.js'
import { useCartStore } from '@/store/cart.js'
import { useFavoriteStore } from '@/store/favorite.js'
import { useOrderStore } from '@/store/order.js'
import cartMessage from '@/constant/cart.js'
import favoriteMessage from '@/constant/favorite.js'
import ordersMessage from '@/constant/orders.js'
import USER from '@/constant/user.js'
import addressMessage from '@/constant/address.js'

// 添加用户数据到用户列表
function addUserList (user, password) {
  const id = Date.now();
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
  storage.set(USER.USER_LIST, this.userList)

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

/**
 * 初始化用户数据
 */
function initUserData () {
  const cartStore = useCartStore()
  const favoriteStore = useFavoriteStore()
  const orderStore = useOrderStore()

  cartStore.cartItems = storage.get(cartMessage.CART_ITEMS, [])
  favoriteStore.favorites = storage.get(favoriteMessage.FAVORITES, [])
  orderStore.orders = storage.get(ordersMessage.ORDERS, [])
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: storage.get(USER.USERINFO),
    token: storage.get(USER.TOKEN),
    isLoggedIn: !!storage.get(USER.TOKEN),
    userList: storage.get(USER.USER_LIST) || [{
      id: USER.ADMIN_ID,
      username: USER.ADMIN_USERNAME,
      name: USER.ADMIN_NAME,
      email: 'admin@example.com',
      phone: '13888888888',
      password: USER.INIT_ADMIN_PASSWORD
    }],
    addressList: storage.get(addressMessage.ADDRESS_LIST) || [{
      id: 1,
      name: '张三',
      phone: '13888888888',
      region: {
        codes: ['110000', '110100', '110101'],
        names: ['北京市', '北京市', '东城区']
      },
      detail: '北京市东城区东直门',
      isDefault: true
    }],
  }),
  actions: {
    // 登录
    async login (username, password) {
      // 管理员登录
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
        }

        this.isLoggedIn = true
        this.userInfo = userInfo
        storage.set(USER.USERINFO, userInfo)

        initUserData()

        return '登录成功'
      }

      // 模拟延迟
      await new Promise(r => setTimeout(r, 500))

      const user = this.userList.find(
        u => u.username === username && u.password === password
      )

      if (user) {
        const token = USER.MOCK_TOKEN + Date.now()

        this.token = token
        storage.set(USER.TOKEN, token)

        this.isLoggedIn = true
        this.userInfo = user
        storage.set(USER.USERINFO, user)

        initUserData()

        return '登录成功'
      }

      return '用户名或密码错误'
    },

    // 注册
    async register (userInfo) {
      // 判断用户是否已存在
      const exist = this.userList.some(
        u => u.id === userInfo.id
      )

      if (exist) {
        return '用户已存在'
      }

      // 添加用户
      const id = Date.now()
      const newUser = {
        id,
        username: userInfo.username,
        name: USER.USER_NAME,
        email: userInfo.email,
        phone: userInfo.phone,
        password: userInfo.password
      }

      this.userList.push(newUser)
      storage.set(USER.USER_LIST, this.userList)
      return '注册成功，请登录'
    },

    // 移除注册异常用户
    removeUser (userId = this.userList[this.userList.length - 1].id) {
      this.userList = this.userList.filter(u => u.id !== userId)
      storage.set(USER.USER_LIST, this.userList)
    },

    // 登出
    logout () {
      this.userInfo = null
      this.token = null
      this.isLoggedIn = false

      storage.remove(USER.USERINFO)
      storage.remove(USER.TOKEN)
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
    },

    // 添加地址
    addAddress (address) {
      const id = Date.now();
      address.id = id
      this.addressList.push(address)

      storage.set(addressMessage.ADDRESS_LIST, this.addressList)
    },

    // 删除地址
    deleteAddress (addressId) {
      this.addressList = this.addressList.filter(address => address.id !== addressId)
      storage.set(addressMessage.ADDRESS_LIST, this.addressList)
    },

    // 更新地址
    updateAddress (address) {
      const index = this.addressList.findIndex(a => a.id === address.id)

      if (index !== -1) {

        Object.assign(this.addressList[index], address)
        this.setDefault(this.addressList[index].id);
      }
    },

    // 设置默认地址
    setDefault (id) {
      const targetId = Number(id)
      const exist = this.addressList.some(a => a.id === targetId)

      if (!exist) return
      this.addressList = this.addressList.map(addr => ({
        ...addr,
        isDefault: addr.id === targetId
      }))

      storage.set(addressMessage.ADDRESS_LIST, this.addressList)
    },
  }
})
