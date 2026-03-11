<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { Refresh, ArrowDown, ArrowUp } from "@element-plus/icons-vue";
  import ProductCard from "@/components/ProductCard/ProductCard.vue";
  import { useProductStore } from "@/store/product.js";

  const router = useRouter();
  const route = useRoute();

  const keyword = ref(route.query.keyword || "");

  // 模拟商品数据
  const productsStore = useProductStore();

  // 分页
  const currentPage = ref(1);
  const pageSize = ref(8);

  // 排序
  const sortBy = ref("default");
  const sortOrder = ref("asc");

  // 筛选后的商品
  const filteredProducts = computed(() => {
    let result = productsStore.products.filter(
      (p) =>
        p.title.includes(keyword.value) || p.categories.includes(keyword.value),
    );

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

  const total = computed(() => filteredProducts.value.length);

  // 分页后的商品
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredProducts.value.slice(start, end);
  });

  const handleSearch = () => {
    router.push({
      path: "/search",
      query: { keyword: keyword.value },
    });
  };

  const handleReset = () => {
    keyword.value = "";
    sortBy.value = "default";
    sortOrder.value = "asc";
    router.push("/search");
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
  <div class="search-result">
    <div class="search-header">
      <h1>搜索结果</h1>
      <p class="search-keyword">关键词: "{{ keyword }}"</p>
      <p class="search-count">找到 {{ total }} 个商品</p>
    </div>

    <div class="search-content">
      <div class="search-bar">
        <el-input
          v-model="keyword"
          placeholder="输入商品名称或分类..."
          size="large"
          clearable
          @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </template>
        </el-input>
      </div>

      <div class="search-options">
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
        <el-button @click="handleReset">
          <el-icon><Refresh /></el-icon>
          重置
        </el-button>
      </div>

      <div class="product-grid" v-if="paginatedProducts.length > 0">
        <ProductCard
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          @click="router.push({ path: `/productDetail/${product.id}` })"
        />
      </div>

      <el-empty v-else description="没有找到相关商品" />
    </div>

    <div class="pagination" v-if="total > pageSize">
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
  .search-result {
    min-height: 100vh;
    background: #f5f5f5;
    padding-bottom: 40px;
  }

  .search-header {
    background: #fff;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .search-header h1 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }

  .search-keyword {
    color: #409eff;
    margin-bottom: 5px;
  }

  .search-count {
    color: #666;
    font-size: 14px;
  }

  .search-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .search-bar {
    margin-bottom: 20px;
  }

  .search-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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
