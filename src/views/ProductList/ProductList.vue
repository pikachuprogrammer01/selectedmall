<script setup>
  import { ref, computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { Filter, ArrowDown, ArrowUp } from "@element-plus/icons-vue";
  import { useProductStore } from "../../store/product";

  const router = useRouter();
  const route = useRoute();

  // 当前分类
  const currentCategory = computed(() => route.query.category || "全部商品");

  // 排序方式
  const sortBy = ref("default");
  const sortOrder = ref("asc");

  // 模拟商品数据
  const products = useProductStore().value.products;

  // 分页
  const currentPage = ref(1);
  const pageSize = ref(8);
  const total = computed(() => filteredProducts.value.length);

  // 筛选后的商品
  const filteredProducts = computed(() => {
    let result =
      currentCategory.value === "全部商品"
        ? products.value
        : products.value.filter((p) => p.category === currentCategory.value);

    // 排序
    if (sortBy.value !== "default") {
      result = [...result].sort((a, b) => {
        let valA = a[sortBy.value];
        let valB = b[sortBy.value];

        if (sortOrder.value === "asc") {
          return valA > valB ? 1 : valA < valB ? -1 : 0;
        } else {
          return valA < valB ? 1 : valA > valB ? -1 : 0;
        }
      });
    }

    return result;
  });

  // 分页后的商品
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredProducts.value.slice(start, end);
  });

  const goToProductDetail = (product) => {
    router.push({
      path: "/productDetail",
      query: { id: product.id },
    });
  };

  const handleSortChange = (value) => {
    sortBy.value = value;
  };

  const handleSortOrderChange = () => {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  };

  const handlePageChange = (page) => {
    currentPage.value = page;
  };
</script>

<template>
  <div class="product-list">
    <div class="product-list-header">
      <h1>{{ currentCategory }}</h1>
      <div class="sort-options">
        <el-button-group>
          <el-button
            :type="sortBy === 'default' ? 'primary' : 'default'"
            @click="handleSortChange('default')"
          >
            综合排序
          </el-button>
          <el-button
            :type="sortBy === 'price' ? 'primary' : 'default'"
            @click="handleSortChange('price')"
          >
            价格
            <el-icon class="sort-icon">
              <ArrowUp v-if="sortOrder === 'asc'" />
              <ArrowDown v-else />
            </el-icon>
          </el-button>
        </el-button-group>
      </div>
    </div>

    <div class="product-list-content">
      <div class="product-grid">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          @click="goToProductDetail(product)"
        />
      </div>
    </div>

    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next, jumper"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped>
  .product-list {
    min-height: 100vh;
    background: #f5f5f5;
    padding-bottom: 40px;
  }

  .product-list-header {
    background: #fff;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-list-header h1 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }

  .sort-options {
    display: flex;
    gap: 10px;
  }

  .product-list-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .sort-icon {
    margin-left: 5px;
  }
</style>
