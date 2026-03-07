<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock, Message, ArrowRight, SuccessFilled } from '@element-plus/icons-vue'
import { useUserStore } from '../../store/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  email: ''
})

const loading = ref(false)
const registerSuccess = ref(false)

const handleRegister = async () => {
  if (!registerForm.value.username || !registerForm.value.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return
  }

  loading.value = true
  try {
    const userInfo = {
      username: registerForm.value.username,
      name: registerForm.value.username,
      email: registerForm.value.email
    }

    await userStore.register(userInfo)
    registerSuccess.value = true

    setTimeout(() => {
      ElMessage.success('注册成功！请登录')
      registerSuccess.value = false
      router.push('/login')
    }, 1500)
  } catch (error) {
    ElMessage.error(error || '注册失败')
  } finally {
    loading.value = false
  }
}

const handleToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <h1>用户注册</h1>
        <p>创建一个新账号开始购物</p>
      </div>

      <div v-if="registerSuccess" class="success-message">
        <el-icon :size="48"><SuccessFilled /></el-icon>
        <h2>注册成功！</h2>
        <p>正在为您跳转到登录页面...</p>
      </div>

      <el-form
        v-else
        :model="registerForm"
        label-position="top"
        class="register-form"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码（至少6位）"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item label="确认密码">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item label="手机号">
          <el-input
            v-model="registerForm.phone"
            placeholder="请输入手机号"
            :prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item label="电子邮箱">
          <el-input
            v-model="registerForm.email"
            placeholder="请输入电子邮箱"
            :prefix-icon="Message"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox>
            我已阅读并同意
            <el-button type="text">用户协议</el-button>
            和
            <el-button type="text">隐私政策</el-button>
          </el-checkbox>
        </el-form-item>

        <el-button
          type="primary"
          size="large"
          :loading="loading"
          @click="handleRegister"
          style="width: 100%;"
        >
          立即注册
          <el-icon><ArrowRight /></el-icon>
        </el-button>
      </el-form>

      <div class="register-footer">
        <p>已有账号？<el-button type="text" @click="handleToLogin">立即登录</el-button></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.register-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  padding: 40px;
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.register-header p {
  color: #666;
  font-size: 14px;
}

.success-message {
  text-align: center;
  padding: 40px 20px;
}

.success-message h2 {
  font-size: 24px;
  color: #67c23a;
  margin: 20px 0 10px 0;
}

.success-message p {
  color: #666;
  font-size: 14px;
}

.register-form {
  margin-bottom: 20px;
}

.register-footer {
  text-align: center;
  margin-top: 20px;
}

.register-footer p {
  color: #999;
  font-size: 14px;
}

.register-footer p .el-button {
  color: #409eff;
  padding: 0;
}
</style>
