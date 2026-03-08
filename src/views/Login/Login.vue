<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { User, Lock, Message, ArrowRight } from "@element-plus/icons-vue";
  import { useUserStore } from "@/store/user";
  import { ElMessage } from "element-plus";

  const router = useRouter();
  const userStore = useUserStore();

  const loginForm = ref({
    username: "admin",
    password: "123456",
    remember: false,
  });

  const ruleFormRef = ref();
  const registerForm = ref({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
  });

  const loading = ref(false);
  const activeTab = ref("login");

  const handleLogin = async () => {
    loading.value = true;
    try {
      ruleFormRef.value.validate(async (valid) => {
        if (valid) {
          await userStore.login(
            loginForm.value.username,
            loginForm.value.password,
            loginForm.value.remember,
          );
          ElMessage.success("登录成功！");
          ruleFormRef.value.resetFields();
          router.push("/");
        } else {
          ElMessage.error("请完善用户名和密码");
          return false;
        }
      });
    } catch (error) {
      ElMessage.error(error || "登录失败");
    } finally {
      loading.value = false;
    }
  };

  /**
   * 手机号校验
   */
  const validatePhone = (rule, value, callback) => {
    const phoneReg = /^1[3-9]\d{9}$/;

    if (!value) {
      callback(new Error("请输入手机号"));
    } else if (!phoneReg.test(value)) {
      callback(new Error("请输入正确的手机号"));
    } else {
      callback();
    }
  };

  /**
   * 确认密码校验
   */
  const validateConfirmPassword = (rule, value, callback) => {
    if (!value) {
      callback(new Error("请再次输入密码"));
    } else if (value !== registerForm.value.password) {
      callback(new Error("两次输入密码不一致"));
    } else {
      callback();
    }
  };

  const rules = {
    username: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 20, message: "用户名长度3-20位", trigger: "blur" },
    ],

    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, message: "密码至少6位", trigger: "blur" },
    ],

    confirmPassword: [{ validator: validateConfirmPassword, trigger: "blur" }],

    phone: [{ validator: validatePhone, trigger: "blur" }],
  };

  /**
   * 注册提交
   */
  const handleRegister = async () => {
    loading.value = true;
    try {
      ruleFormRef.value.validate((valid) => {
        if (valid) {
          ElMessage.success("注册成功！");
          ruleFormRef.value.resetFields();
          userStore.register({
            username: registerForm.value.username,
            password: registerForm.value.password,
            phone: registerForm.value.phone,
            email: registerForm.value.email,
          });
          router.push("/login");
        } else {
          ElMessage.error("请完善注册信息");
          return false;
        }
      });
    } catch (error) {
      ElMessage.error(error || "注册失败");
    } finally {
      loading.value = false;
    }
  };

  const goToRegister = () => {
    router.push("/register");
  };

  const handleForgotPassword = () => {
    ElMessage.info("请联系管理员重置密码");
  };
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Selected Mall</h1>
        <p>欢迎回来，请登录您的账号</p>
      </div>

      <el-tabs v-model="activeTab" class="login-tabs">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" label-position="top">
            <el-form-item label="用户名">
              <el-input
                v-model.trim="loginForm.username"
                placeholder="请输入用户名"
                :prefix-icon="User"
              />
            </el-form-item>

            <el-form-item label="密码">
              <el-input
                v-model.trim="loginForm.password"
                type="password"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                show-password
                @keyup.enter="handleLogin"
              />
            </el-form-item>

            <el-form-item>
              <div class="form-options">
                <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
                <el-button type="text" @click="handleForgotPassword">
                  忘记密码？
                </el-button>
              </div>
            </el-form-item>

            <el-button
              type="primary"
              size="large"
              :loading="loading"
              @click="handleLogin"
              style="width: 100%"
            >
              登录
              <el-icon><ArrowRight /></el-icon>
            </el-button>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="快速注册" name="register">
          <el-form
            label-position="top"
            ref="ruleFormRef"
            :model="registerForm"
            :rules="rules"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model.trim="registerForm.username"
                placeholder="请输入用户名"
                :prefix-icon="User"
              />
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                v-model.trim="registerForm.password"
                type="password"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>

            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                v-model.trim="registerForm.confirmPassword"
                type="password"
                placeholder="请再次输入密码"
                :prefix-icon="Lock"
                show-password
              />
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model.trim="registerForm.phone"
                type="tel"
                maxlength="11"
                placeholder="请输入手机号"
                :prefix-icon="Message"
              />
            </el-form-item>

            <el-button
              type="primary"
              size="large"
              @click="handleRegister"
              style="width: 100%"
            >
              注册
            </el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div class="login-footer">
        <p>
          还没有账号？<el-button type="text" @click="goToRegister"
            >立即注册</el-button
          >
        </p>
        <p>演示账号: admin / 123456</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .login-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .login-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 450px;
    padding: 40px;
  }

  .login-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .login-header h1 {
    font-size: 32px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
  }

  .login-header p {
    color: #666;
    font-size: 14px;
  }

  .login-tabs {
    margin-bottom: 20px;
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .login-footer {
    text-align: center;
    margin-top: 20px;
  }

  .login-footer p {
    color: #999;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .login-footer p .el-button {
    color: #409eff;
    padding: 0;
  }
</style>
