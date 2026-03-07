<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useCartStore } from "@/store/cart";
  import { useProductStore } from "@/store/product";
  import CategoryMenu from "@/components/CategoryMenu/CategoryMenu.vue";
  import BackToTop from "@/components/BackToTop/BackToTop.vue";
  import { ShoppingCart, Star, Histogram } from "@element-plus/icons-vue";

  const router = useRouter();
  const cartStore = useCartStore();

  // 轮播图数据
  const banners = useBannerStore().banner;

  // 商品数据
  const products = useProductStore().products;

  // 热门商品
  const hotProducts = computed(() => {
    return products.value.slice(0, 4);
  });

  // 新品推荐
  const newProducts = computed(() => {
    return products.value.slice(0, 4);
  });

  // 跳转到商品列表
  const goToProductList = (category) => {
    router.push({
      path: "/productList",
      query: { category: category },
    });
  };

  // 查看商品详情
  const goToProductDetail = (product) => {
    router.push({
      path: "/productDetail",
      query: { id: product.id },
    });
  };

  // 添加到购物车
  const addToCart = (product) => {
    cartStore.addToCart(product);
    ElMessage.success("已添加到购物车");
  };
</script>

<template>
  <div class="home">
    <!-- 轮播图区域 -->
    <div class="banner-section">
      <el-carousel height="400px" arrow="always">
        <el-carousel-item v-for="(banner, index) in banners" :key="index">
          <img
            :src="banner.image"
            :alt="banner.link"
            @click="goToCategory(banner.link)"
          />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="content">
      <!-- 分类菜单 -->
      <div class="category-section">
        <CategoryMenu />
      </div>

      <!-- 热门商品 -->
      <div class="section">
        <div class="section-header">
          <el-icon class="section-icon"><Histogram /></el-icon>
          <h2>热门商品</h2>
        </div>
        <div class="product-grid">
          <div
            v-for="product in hotProducts"
            :key="product.id"
            class="product-card"
          >
            <div class="product-image" @click="goToProductDetail(product)">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-category">{{ product.category }}</p>
              <div class="product-price">¥{{ product.price }}</div>
              <div class="product-actions">
                <el-button
                  type="primary"
                  size="small"
                  @click="goToProductDetail(product)"
                >
                  查看
                </el-button>
                <el-button size="small" @click="addToCart(product)">
                  <el-icon><ShoppingCart /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 新品推荐 -->
      <div class="section">
        <div class="section-header">
          <el-icon class="section-icon"><Star /></el-icon>
          <h2>新品推荐</h2>
        </div>
        <div class="product-grid">
          <div
            v-for="product in newProducts"
            :key="product.id"
            class="product-card"
          >
            <div class="product-image" @click="goToProductDetail(product)">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-category">{{ product.category }}</p>
              <div class="product-price">¥{{ product.price }}</div>
              <div class="product-actions">
                <el-button
                  type="primary"
                  size="small"
                  @click="goToProductDetail(product)"
                >
                  查看
                </el-button>
                <el-button size="small" @click="addToCart(product)">
                  <el-icon><ShoppingCart /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BackToTop />
  </div>
</template>

<style scoped>
  .home {
    min-height: 100vh;
    background: #f5f5f5;
  }

  .banner-section {
    width: 100%;
    margin-bottom: 20px;
  }

  .el-carousel__item {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    color: #333;
  }

  .el-carousel__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .category-section {
    margin-bottom: 40px;
  }

  .section {
    margin-bottom: 60px;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .section-icon {
    font-size: 24px;
    color: #409eff;
  }

  .section-header h2 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }

  .product-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    transition:
      transform 0.3s,
      box-shadow 0.3s;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .product-image {
    width: 100%;
    height: 240px;
    cursor: pointer;
    overflow: hidden;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .product-card:hover .product-image img {
    transform: scale(1.05);
  }

  .product-info {
    padding: 15px;
  }

  .product-info h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .product-category {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }

  .product-price {
    font-size: 20px;
    color: #ff4d4f;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .product-actions {
    display: flex;
    gap: 10px;
  }

  @media (max-width: 768px) {
    .banner-section {
      height: 250px;
    }

    .product-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
  }
</style>
