<script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { ElMessage, ElMessageBox } from "element-plus";
  import favoriteMessage from "@/constant/favorite.js";
  import { useFavoriteStore } from "@/store/favorite.js";
  import ProductCard from "@/components/ProductCard/ProductCard.vue";

  const router = useRouter();

  // 收藏商品数据
  const favoritesStore = useFavoriteStore();
  const favorites = computed(() => favoritesStore.getFavorites());

  const selectedIds = ref([]);

  const selectedProducts = computed(() => {
    return favorites.value.filter((fav) => selectedIds.value.includes(fav.id));
  });

  const totalAmount = computed(() => {
    return selectedProducts.value.reduce(
      (total, item) => total + item.price,
      0,
    );
  });

  const handleSelectProduct = (id) => {
    const index = selectedIds.value.indexOf(id);
    if (index > -1) {
      selectedIds.value.splice(index, 1);
    } else {
      selectedIds.value.push(id);
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      selectedIds.value = favorites.value.map((fav) => fav.id);
    } else {
      selectedIds.value = [];
    }
  };

  const handleRemoveFavorite = (id) => {
    ElMessageBox.confirm(favoriteMessage.COMFIRM_REMOVE, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        favorites.value = favorites.value.filter((fav) => fav.id !== id);
        selectedIds.value = selectedIds.value.filter((item) => item !== id);
        ElMessage.success(favoriteMessage.SUCCESS_REMOVE);
      })
      .catch(() => {});
  };

  const handleRemoveSelected = () => {
    if (selectedIds.value.length === 0) {
      ElMessage.warning(favoriteMessage.SELECT_REMOVE);
      return;
    }

    ElMessageBox.confirm(
      `确定要移除选中的 ${selectedIds.value.length} 个商品吗？`,
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      },
    )
      .then(() => {
        favorites.value = favorites.value.filter(
          (fav) => !selectedIds.value.includes(fav.id),
        );
        selectedIds.value = [];
        ElMessage.success(favoriteMessage.SUCCESS_REMOVE);
      })
      .catch(() => {});
  };

  const handleAddToCart = () => {
    if (selectedIds.value.length === 0) {
      ElMessage.warning(favoriteMessage.SELECT_ADD);
      return;
    }

    ElMessage.success(favoriteMessage.SUCCESS_ADD);
  };

  const goToProductDetail = (product) => {
    router.push({
      path: `/productDetail/${product.id}`,
    });
  };
</script>

<template>
  <div class="favorite">
    <div class="page-header">
      <div class="header-left">
        <el-button type="text" @click="router.back()">
          <el-icon><ArrowLeft /></el-icon>
          返回
        </el-button>
        <h1>我的收藏</h1>
        <span class="count">共 {{ favorites.length || 0 }} 件商品</span>
      </div>

      <div class="header-actions">
        <el-button
          v-if="selectedIds.length > 0"
          type="danger"
          @click="handleRemoveSelected"
        >
          <el-icon><Delete /></el-icon>
          批量移除 ({{ selectedIds.length }})
        </el-button>
      </div>
    </div>

    <div class="favorite-content" v-if="favorites.length > 0">
      <div class="favorite-list">
        <div
          class="favorite-item"
          v-for="product in favorites"
          :key="product.id"
        >
          <el-checkbox
            v-model="product.checked"
            :model-value="selectedIds.includes(product.id)"
            @change="handleSelectProduct(product.id)"
          />

          <div class="product-info">
            <ProductCard
              @click="goToProductDetail(product)"
              :product="product"
            />
            <el-button
              type="danger"
              text
              size="small"
              @click="handleRemoveFavorite(product.id)"
            >
              <el-icon><Delete /></el-icon>
              移除
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <el-empty v-else description="暂无收藏商品" />

    <!-- 底部操作栏 -->
    <div class="bottom-bar" v-if="favorites.length > 0">
      <div class="select-all">
        <el-checkbox
          :model-value="
            favorites.length > 0 && selectedIds.length === favorites.length
          "
          @change="handleSelectAll"
        >
          全选
        </el-checkbox>
      </div>

      <div class="action-buttons">
        <div class="total-info">
          <span>已选 {{ selectedIds.length }} 件，合计:</span>
          <span class="total-price">¥{{ totalAmount }}</span>
        </div>

        <el-button
          type="primary"
          size="large"
          :disabled="selectedIds.length === 0"
          @click="handleAddToCart"
        >
          加入购物车
        </el-button>
      </div>
    </div>

    <BackToTop />
  </div>
</template>

<style scoped>
  .favorite {
    min-height: 100vh;
    background: #f5f5f5;
    padding-bottom: 80px;
  }

  .page-header {
    background: #fff;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .header-left h1 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .count {
    color: #999;
    font-size: 14px;
  }

  .header-actions {
    display: flex;
    gap: 10px;
  }

  .favorite-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .favorite-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .favorite-item {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    gap: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .product-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transform: translateY(100%);
    transition: transform 0.3s;
  }

  .product-price {
    color: #ff4d4f;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 20px;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
  }

  .select-all {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .action-buttons {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .total-info {
    font-size: 16px;
    color: #666;
  }

  .total-info .total-price {
    font-size: 28px;
    font-weight: bold;
    color: #ff4d4f;
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    .favorite-item {
      flex-direction: column;
    }

    .product-overlay {
      flex-direction: row;
      transform: translateY(0);
    }

    .bottom-bar {
      flex-direction: column;
      gap: 15px;
    }

    .action-buttons {
      width: 100%;
      justify-content: space-between;
    }
  }
</style>
