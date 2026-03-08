<script setup>
  import { ref, computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useUserStore } from "@/store/user";
  import { useCartStore } from "@/store/cart";

  // 导入图标组件
  import {
    HomeFilled,
    Search,
    ShoppingBag,
    User,
    ArrowDown,
    SwitchButton,
    Goods,
    Grid,
  } from "@element-plus/icons-vue";

  const router = useRouter();
  const route = useRoute();
  const userStore = useUserStore();
  const cartStore = useCartStore();

  const isMenuOpen = ref(false);

  // 计算购物车商品数量
  const cartCount = computed(() => {
    return cartStore.cartItems.reduce((total, item) => total + item.count, 0);
  });

  // 路由导航
  const navigateTo = (path) => {
    router.push(path);
    isMenuOpen.value = false;
  };

  // 登出
  const handleLogout = () => {
    userStore.logout();
    navigateTo("/login");
  };

  // 搜索
  const handleSearch = () => {
    router.push("/search");
  };
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-top">
        <div class="logo" @click="navigateTo('/')">
          <el-icon><HomeFilled /></el-icon>
          <span>Selected Mall</span>
        </div>

        <div class="search-bar" @click="handleSearch">
          <el-input
            placeholder="搜索商品..."
            :prefix-icon="Search"
            size="large"
            clearable
            @keyup.enter="handleSearch"
          />
        </div>

        <div class="header-actions">
          <el-button type="primary" size="large" @click="navigateTo('/cart')">
            <el-icon class="search-icon"><ShoppingBag /></el-icon>
            <span class="cart-count" v-if="cartCount > 0"
              >({{ cartCount }})</span
            >
          </el-button>

          <div class="user-menu">
            <template v-if="userStore.isLoggedIn">
              <el-dropdown @command="handleMenuCommand">
                <span class="user-info">
                  <el-avatar :size="40">{{
                    userStore.userInfo?.name?.charAt(0)
                  }}</el-avatar>
                  <span>{{ userStore.userInfo?.name }}</span>
                  <el-icon class="el-icon--right"><ArrowDown /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="profile">
                      <el-icon><User /></el-icon> 个人中心
                    </el-dropdown-item>
                    <el-dropdown-item command="orders">
                      <el-icon><ShoppingBag /></el-icon> 我的订单
                    </el-dropdown-item>
                    <el-dropdown-item command="logout" divided>
                      <el-icon><SwitchButton /></el-icon> 退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <template v-else>
              <el-button
                type="primary"
                size="large"
                @click="navigateTo('/login')"
              >
                登录
              </el-button>
            </template>
          </div>
        </div>
      </div>

      <nav class="header-nav">
        <div class="nav-item" @click="navigateTo('/')">
          <el-icon><Home /></el-icon>
          <span>首页</span>
        </div>
        <div class="nav-item" @click="navigateTo('/category')">
          <el-icon><Grid /></el-icon>
          <span>商品分类</span>
        </div>
        <div class="nav-item" @click="navigateTo('/productList')">
          <el-icon><Goods /></el-icon>
          <span>全部商品</span>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  .header {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .header-top {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px 0;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 24px;
    font-weight: bold;
    color: #409eff;
  }

  .search-bar {
    flex: 1;
    max-width: 500px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .cart-count {
    margin-left: 5px;
  }

  .user-menu {
    display: flex;
    align-items: center;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background 0.3s;
  }

  .user-info:hover {
    background: #f5f5f5;
  }

  .header-nav {
    display: flex;
    gap: 40px;
    border-top: 1px solid #eee;
    padding: 15px 0;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: color 0.3s;
  }

  .nav-item:hover {
    color: #409eff;
  }

  @media (max-width: 768px) {
    .header-top {
      flex-wrap: wrap;
    }

    .search-bar {
      order: 3;
      max-width: 100%;
    }

    .header-actions {
      order: 4;
      margin-left: auto;
    }

    .header-nav {
      display: none;
    }
  }
</style>
