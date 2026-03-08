<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock, Phone, Edit } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const userInfo = ref({
  username: userStore.userInfo?.username || '',
  name: userStore.userInfo?.name || '',
  email: userStore.userInfo?.email || '',
  phone: userStore.userInfo?.phone || ''
})

const editMode = ref(false)

const handleEdit = () => {
  editMode.value = true
}

const handleSave = () => {
  // 保存个人信息
  userStore.userInfo = {
    ...userStore.userInfo,
    ...userInfo.value
  }
  ElMessage.success('个人信息已更新')
  editMode.value = false
}

const handleCancel = () => {
  // 恢复原始信息
  userInfo.value = {
    username: userStore.userInfo?.username || '',
    name: userStore.userInfo?.name || '',
    email: userStore.userInfo?.email || '',
    phone: userStore.userInfo?.phone || ''
  }
  editMode.value = false
}

const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.logout()
    router.push('/login')
  }).catch(() => {})
}

const handlePasswordChange = () => {
  ElMessage.info('密码修改功能开发中')
}
</script>

<template>
  <div class="profile">
    <div class="page-header">
      <h1>个人资料</h1>
    </div>

    <div class="profile-content">
      <div class="profile-card">
        <div class="profile-header">
          <el-avatar :size="100">
            {{ userStore.userInfo?.name?.charAt(0) }}
          </el-avatar>
          <div class="profile-name">
            <h2>{{ userStore.userInfo?.name }}</h2>
            <p>{{ userStore.userInfo?.email }}</p>
          </div>
        </div>

        <div class="profile-stats">
          <div class="stat-item">
            <h3>{{ userStore.orders?.length || 0 }}</h3>
            <p>我的订单</p>
          </div>
          <div class="stat-item">
            <h3>{{ userStore.favorites?.length || 0 }}</h3>
            <p>我的收藏</p>
          </div>
          <div class="stat-item">
            <h3>{{ userStore.addresses?.length || 0 }}</h3>
            <p>收货地址</p>
          </div>
        </div>
      </div>

      <div class="profile-form">
        <div class="section">
          <div class="section-header">
            <h3>基本信息</h3>
            <el-button type="primary" size="small" @click="handleEdit">
              <el-icon><Edit /></el-icon>
              编辑
            </el-button>
          </div>

          <el-form label-position="top">
            <el-form-item label="用户名">
              <el-input
                v-model="userInfo.username"
                :disabled="!editMode"
                placeholder="请输入用户名"
              />
            </el-form-item>

            <el-form-item label="昵称">
              <el-input
                v-model="userInfo.name"
                :disabled="!editMode"
                placeholder="请输入昵称"
              />
            </el-form-item>

            <el-form-item label="电子邮箱">
              <el-input
                v-model="userInfo.email"
                :disabled="!editMode"
                placeholder="请输入电子邮箱"
              />
            </el-form-item>

            <el-form-item label="手机号">
              <el-input
                v-model="userInfo.phone"
                :disabled="!editMode"
                placeholder="请输入手机号"
              />
            </el-form-item>
          </el-form>

          <div class="form-actions" v-if="editMode">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <h3>修改密码</h3>
          </div>

          <el-form label-position="top">
            <el-form-item label="当前密码">
              <el-input
                type="password"
                placeholder="请输入当前密码"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>

            <el-form-item label="新密码">
              <el-input
                type="password"
                placeholder="请输入新密码"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>

            <el-form-item label="确认新密码">
              <el-input
                type="password"
                placeholder="请再次输入新密码"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>
          </el-form>

          <el-button type="primary" @click="handlePasswordChange">
            修改密码
          </el-button>
        </div>

        <div class="section">
          <div class="section-header">
            <h3>账户安全</h3>
          </div>

          <div class="security-info">
            <div class="info-item">
              <el-icon><User /></el-icon>
              <div>
                <p class="label">用户名</p>
                <p class="value">{{ userInfo.username }}</p>
              </div>
            </div>
            <div class="info-item">
              <el-icon><Phone /></el-icon>
              <div>
                <p class="label">手机号</p>
                <p class="value">{{ userInfo.phone }}</p>
              </div>
            </div>
            <div class="info-item">
              <el-icon><Lock /></el-icon>
              <div>
                <p class="label">密码</p>
                <p class="value">******</p>
              </div>
            </div>
          </div>

          <el-button type="danger" @click="handleLogout">
            退出登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
}

.page-header {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.page-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.profile-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 20px;
}

.profile-card {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.profile-header {
  margin-bottom: 30px;
}

.profile-name h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.profile-name p {
  color: #666;
  font-size: 14px;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stat-item {
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.stat-item h3 {
  font-size: 28px;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 5px;
}

.stat-item p {
  color: #666;
  font-size: 14px;
}

.profile-form {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section {
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #eee;
}

.section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.security-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.info-item .el-icon {
  font-size: 24px;
  color: #409eff;
}

.info-item .label {
  color: #999;
  font-size: 14px;
  margin-bottom: 0;
}

.info-item .value {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
  }
}
</style>
