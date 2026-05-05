<script setup>
  import { computed } from "vue";
  import { useUserStore } from "@/store/user";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const userStore = useUserStore();

  const currentYear = computed(() => new Date().getFullYear());

  const handleNav = (path) => {
    router.push(path);
  };
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>关于我们</h3>
        <p>
          极选商城
          是一个专业的电商平台，致力于为您提供优质的商品和便捷的购物体验。
        </p>
      </div>
      <div class="footer-section">
        <h3>购物指南</h3>
        <ul>
          <li @click="handleNav('/category')">商品分类</li>
          <li @click="handleNav('/productList')">全部商品</li>
          <li @click="handleNav('/productList')">最新上架</li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>客户服务</h3>
        <ul>
          <li @click="handleNav('/cart')">购物车</li>
          <li @click="handleNav('/orders')">我的订单</li>
          <li @click="handleNav('/profile')">个人信息</li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>联系我们</h3>
        <ul>
          <li>电话: 400-888-8888</li>
          <li>邮箱: support@selectedmall.com</li>
          <li>地址: 北京市朝阳区</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© {{ currentYear }} 极选商城. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
  .footer {
    background: #333;
    color: #fff;
    margin-top: auto;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }

  .footer-section h3 {
    font-size: 18px;
    margin-bottom: 20px;
    color: #409eff;
  }

  .footer-section p {
    line-height: 1.8;
    color: #ccc;
  }

  .footer-section ul {
    list-style: none;
  }

  .footer-section li {
    line-height: 2;
    color: #ccc;
    cursor: pointer;
    transition: color 0.3s;
  }

  .footer-section li:hover {
    color: #409eff;
  }

  .footer-bottom {
    background: #2a2a2a;
    text-align: center;
    padding: 20px 0;
    color: #999;
  }

  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }
</style>
