// LocalStorage 工具类
class Storage {
  constructor() {
    this.storage = window.localStorage
  }

  // ⭐ 获取当前用户ID
  getUserId () {
    try {
      const userInfo = JSON.parse(this.storage.getItem('userInfo'))
      return userInfo?.id
    } catch {
      return null
    }
  }

  // ⭐ 生成带用户作用域的 key
  getKey (key) {
    const userId = this.getUserId()
    // 不存在用户 or 不需要隔离的数据（比如用户列表）直接用原key
    const globalKeys = ['userInfo', 'token', 'userList']
    if (!userId || globalKeys.includes(key)) return key
    return `${key}_${userId}`
  }

  // 保存数据
  set (key, value) {
    try {
      const realKey = this.getKey(key)
      this.storage.setItem(realKey, JSON.stringify(value))
      return true
    } catch (e) {
      console.error('保存数据失败:', e)
      return false
    }
  }

  // 获取数据
  get (key, defaultValue = null) {
    try {
      const realKey = this.getKey(key)
      const value = this.storage.getItem(realKey)
      return value ? JSON.parse(value) : defaultValue
    } catch (e) {
      console.error('获取数据失败:', e)
      return defaultValue
    }
  }

  // 删除数据
  remove (key) {
    const realKey = this.getKey(key)
    this.storage.removeItem(realKey)
  }

  // 清空数据
  clear () {
    this.storage.clear()
  }
}

export default new Storage()
