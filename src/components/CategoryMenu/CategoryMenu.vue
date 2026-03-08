<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const categories = ref([
    {
      name: "手机数码",
      icon: "Cellphone",
    },
    {
      name: "电脑办公",
      icon: "Monitor",
    },
    {
      name: "家用电器",
      icon: "House",
    },
    {
      name: "服装鞋帽",
      icon: "T-shirt",
    },
    {
      name: "美妆护肤",
      icon: "Brush",
    },
    {
      name: "食品饮料",
      icon: "IceCream",
    },
    {
      name: "运动户外",
      icon: "FirstAidKit",
    },
    {
      name: "图书音像",
      icon: "Reading",
    },
  ]);

  const handleCategory = (categoryName) => {
    router.push({
      path: "/productList",
      query: { category: categoryName },
    });
  };
</script>

<template>
  <div class="category-menu">
    <div class="category-list">
      <div
        v-for="category in categories"
        :key="category.name"
        class="category-item"
        @click="handleCategory(category.name)"
      >
        <el-icon :size="28"><component :is="category.icon" /></el-icon>
        <span>{{ category.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .category-menu {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .category-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .category-item:hover {
    background: #f5f5f5;
    transform: translateY(-2px);
  }

  .category-item span {
    font-size: 14px;
    color: #333;
    text-align: center;
  }

  @media (max-width: 768px) {
    .category-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
