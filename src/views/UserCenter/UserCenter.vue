<script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import {
    User,
    Goods,
    Star,
    Location,
    Setting,
  } from "@element-plus/icons-vue";
  import { useUserStore } from "@/store/user.js";
  import { useOrderStore } from "@/store/order.js";

  const router = useRouter();
  const userStore = useUserStore();
  const orderStore = useOrderStore();

  const currentMenu = ref("profile");

  const menuItems = [
    { name: "profile", icon: User, label: "个人资料" },
    { name: "orders", icon: Goods, label: "我的订单" },
    { name: "favorites", icon: Star, label: "我的收藏" },
    { name: "addresses", icon: Location, label: "收货地址" },
    { name: "settings", icon: Setting, label: "设置" },
  ];

  const menuItemsForNonLogin = [
    { name: "login", icon: User, label: "登录" },
    { name: "register", icon: User, label: "注册" },
  ];

  const handleMenuClick = (menuName) => {
    currentMenu.value = menuName;
    router.push({ name: menuName });
  };

  const handleLogout = () => {
    userStore.logout();
    router.push("/login");
  };

  const hasOrders = computed(() => {
    return orderStore.orders.length > 0;
  });

  const hasFavorites = computed(() => {
    return userStore.userInfo?.favorites?.length > 0 || false;
  });

  const hasAddresses = computed(() => {
    return userStore.userInfo?.addresses?.length > 0 || false;
  });
</script>

<template>
  <div class="user-center">
    <div class="page-header">
      <h1>用户中心</h1>
    </div>

    <div class="user-center-content">
      <div class="user-info" v-if="userStore.isLoggedIn">
        <div class="user-avatar">
          <el-avatar :size="80">
            {{ userStore.userInfo?.name?.charAt(0) }}
          </el-avatar>
        </div>
        <div class="user-details">
          <h2>{{ userStore.userInfo?.name }}</h2>
          <p>{{ userStore.userInfo?.email }}</p>
          <el-button type="danger" size="small" @click="handleLogout">
            退出登录
          </el-button>
        </div>
      </div>

      <div class="user-info" v-else>
        <el-empty description="请登录后查看" />
        <div class="login-actions">
          <el-button type="primary" @click="handleMenuClick('login')">
            立即登录
          </el-button>
        </div>
      </div>

      <div class="user-menu" v-if="userStore.isLoggedIn">
        <div
          v-for="item in menuItems"
          :key="item.name"
          class="menu-item"
          :class="{ active: currentMenu === item.name }"
          @click="handleMenuClick(item.name)"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </div>
      </div>

      <div class="user-menu" v-else>
        <div
          v-for="item in menuItemsForNonLogin"
          :key="item.name"
          class="menu-item"
          :class="{ active: currentMenu === item.name }"
          @click="handleMenuClick(item.name)"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </div>
      </div>

      <div class="user-content">
        <div v-if="currentMenu === 'profile' && userStore.isLoggedIn">
          <h3>个人资料</h3>
          <el-empty description="个人信息功能开发中" />
        </div>

        <div v-if="currentMenu === 'orders' && userStore.isLoggedIn">
          <h3>我的订单</h3>
          <el-empty :description="hasOrders ? '' : '暂无订单'" />
        </div>

        <div v-if="currentMenu === 'favorites' && userStore.isLoggedIn">
          <h3>我的收藏</h3>
          <el-empty :description="hasFavorites ? '' : '暂无收藏商品'" />
        </div>

        <div v-if="currentMenu === 'addresses' && userStore.isLoggedIn">
          <h3>收货地址</h3>
          <el-empty :description="hasAddresses ? '' : '暂无收货地址'" />
        </div>

        <div v-if="currentMenu === 'settings' && userStore.isLoggedIn">
          <h3>设置</h3>
          <el-empty description="设置功能开发中" />
        </div>
      </div>
    </div>
    <BackToTop />
  </div>
</template>

<style scoped>
  .user-center {
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

  .user-center-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 20px;
  }

  .user-info {
    background: #fff;
    border-radius: 8px;
    padding: 30px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .user-avatar {
    margin-bottom: 20px;
  }

  .user-details h2 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #333;
  }

  .user-details p {
    color: #666;
    margin-bottom: 20px;
  }

  .user-menu {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .menu-item:last-child {
    margin-bottom: 0;
  }

  .menu-item:hover {
    background: #f5f5f5;
  }

  .menu-item.active {
    background: #ecf5ff;
    color: #409eff;
    font-weight: 600;
  }

  .user-content {
    background: #fff;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-height: 400px;
  }

  .user-content h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }

  .login-actions {
    margin-top: 30px;
  }

  @media (max-width: 768px) {
    .user-center-content {
      grid-template-columns: 1fr;
    }
  }
</style>
