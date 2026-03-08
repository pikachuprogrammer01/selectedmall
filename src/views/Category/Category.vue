<script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import CategoryMenu from "@/components/CategoryMenu/CategoryMenu.vue";
  import ProductCard from "@/components/ProductCard/ProductCard.vue";
  import { ArrowLeft, Grid } from "@element-plus/icons-vue";
  import { useProductStore } from "@/store/product.js";

  const router = useRouter();
  const currentCategory = ref("全部商品");

  const categories = ref([
    { name: "全部商品", icon: "Grid" },
    { name: "手机数码", icon: "Cellphone" },
    { name: "电脑办公", icon: "Monitor" },
    { name: "家用电器", icon: "House" },
    { name: "服装鞋帽", icon: "T-shirt" },
    { name: "美妆护肤", icon: "Brush" },
    { name: "食品饮料", icon: "IceCream" },
    { name: "运动户外", icon: "FirstAidKit" },
    { name: "图书音像", icon: "Reading" },
  ]);

  // 模拟商品数据
  const productsStore = useProductStore();

  const filteredProducts = computed(() => {
    if (currentCategory.value === "全部商品") {
      return productsStore.products;
    }
    return productsStore.products.filter(
      (p) => p.category === currentCategory.value,
    );
  });

  const handleCategoryChange = (category) => {
    currentCategory.value = category;
  };

  const goToProductDetail = (product) => {
    router.push({
      path: "/productDetail",
      query: { id: product.id },
    });
  };
</script>

<template>
  <div class="category">
    <div class="category-header">
      <el-button type="text" @click="router.push('/')">
        <el-icon><ArrowLeft /></el-icon>
        返回首页
      </el-button>
      <h1>{{ currentCategory }}</h1>
    </div>

    <div class="category-content">
      <div class="category-menu">
        <div
          v-for="cat in categories"
          :key="cat.name"
          class="category-item"
          :class="{ active: currentCategory === cat.name }"
          @click="handleCategoryChange(cat.name)"
        >
          <el-icon><component :is="cat.icon" /></el-icon>
          <span>{{ cat.name }}</span>
        </div>
      </div>

      <div class="product-list">
        <div class="section-title">
          <el-icon><Grid /></el-icon>
          <span>商品列表</span>
          <span class="count">({{ filteredProducts }}件商品)</span>
        </div>

        <div class="product-grid">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @click="goToProductDetail(product)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .category {
    min-height: 100vh;
    background: #f5f5f5;
  }

  .category-header {
    background: #fff;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .category-content {
    max-width: 1200px;
    margin: 20px auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 20px;
  }

  .category-menu {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
  }

  .category-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
    margin-bottom: 5px;
  }

  .category-item:last-child {
    margin-bottom: 0;
  }

  .category-item:hover {
    background: #f5f5f5;
  }

  .category-item.active {
    background: #ecf5ff;
    color: #409eff;
    font-weight: 600;
  }

  .product-list {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }

  .section-title .count {
    margin-left: auto;
    font-size: 14px;
    color: #999;
    font-weight: normal;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    .category-content {
      grid-template-columns: 1fr;
    }

    .category-menu {
      display: none;
    }
  }
</style>
