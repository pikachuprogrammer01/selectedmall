// LocalStorage 工具类
class Storage {
  constructor() {
    this.storage = window.localStorage
  }

  // 保存数据
  set(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value))
      return true
    } catch (e) {
      console.error('保存数据失败:', e)
      return false
    }
  }

  // 获取数据
  get(key, defaultValue = null) {
    try {
      const value = this.storage.getItem(key)
      return value ? JSON.parse(value) : defaultValue
    } catch (e) {
      console.error('获取数据失败:', e)
      return defaultValue
    }
  }

  // 删除数据
  remove(key) {
    this.storage.removeItem(key)
  }

  // 清空数据
  clear() {
    this.storage.clear()
  }
}

export default new Storage()
