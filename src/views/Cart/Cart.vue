<script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { ArrowRight } from "@element-plus/icons-vue";
  import { useCartStore } from "@/store/cart.js";
  import { ElMessage, ElMessageBox } from "element-plus";

  const router = useRouter();
  const cartStore = useCartStore();

  // 选中的商品ID
  const selectedProducts = ref([]);

  // 购物车商品
  const cartItems = computed(() => cartStore.cartItems || []);

  // 是否选中商品
  const isSelected = computed(() => selectedProducts.value.length > 0);

  // 计算总价
  const totalPrice = computed(() => {
    return cartItems.value
      .filter((item) => selectedProducts.value.includes(item.id))
      .reduce((total, item) => total + item.price * item.count, 0);
  });

  // 全选
  const selectAll = computed({
    get: () =>
      cartItems.value.length > 0 &&
      selectedProducts.value.length === cartItems.value.length,

    set: (value) => {
      if (value) {
        selectedProducts.value = cartItems.value.map((item) => item.id);
      } else {
        selectedProducts.value = [];
      }
    },
  });

  // 选择商品
  const handleSelectProduct = (productId) => {
    const index = selectedProducts.value.indexOf(productId);

    if (index > -1) {
      selectedProducts.value.splice(index, 1);
    } else {
      selectedProducts.value.push(productId);
    }
  };

  // 修改数量
  const handleQuantityChange = ({ id, count }) => {
    cartStore.updateCartCount(id, count);
  };

  // 删除商品
  const handleRemoveProduct = (productId) => {
    ElMessageBox.confirm("确定要从购物车移除该商品吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        cartStore.removeFromCart(productId);

        selectedProducts.value = selectedProducts.value.filter(
          (id) => id !== productId,
        );

        ElMessage.success("已移除商品");
      })
      .catch(() => {});
  };

  // 清空购物车
  const handleClearCart = () => {
    if (cartItems.value.length === 0) return;

    ElMessageBox.confirm("确定要清空购物车吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        cartStore.clearCart();
        selectedProducts.value = [];
        ElMessage.success("购物车已清空");
      })
      .catch(() => {});
  };

  // 去结算
  const handleCheckout = () => {
    if (!isSelected.value) {
      ElMessage.warning("请选择要购买的商品");
      return;
    }

    router.push({
      path: "/orderConfirm",
      query: {
        ids: selectedProducts.value.join(","), // 传递多个商品
      },
    });
  };

  // 商品详情
  const goToProductDetail = (product) => {
    router.push({
      path: `/productDetail/${product.id}`,
    });
  };

  const handleSelectAll = (value) => {
    if (value) {
      selectedProducts.value = cartItems.value.map((item) => item.id);
    } else {
      selectedProducts.value = [];
    }
  };
</script>

<template>
  <div class="cart">
    <div class="cart-header">
      <h1>购物车</h1>
    </div>

    <div class="cart-content" v-if="cartItems.length > 0">
      <div class="cart-items">
        <div class="cart-item" v-for="item in cartItems" :key="item.id">
          <el-checkbox
            :model-value="selectedProducts.includes(item.id)"
            @change="handleSelectProduct(item.id)"
          />

          <div class="item-image" @click="goToProductDetail(item)">
            <img :src="item.image" :alt="item.title" />
          </div>

          <div class="item-info">
            <h3 @click="goToProductDetail(item)">{{ item.title }}</h3>
            <p class="item-price"><span>单价：</span> ¥{{ item.price }}</p>
          </div>

          <div class="item-actions">
            <el-input-number
              v-model="item.count"
              :min="1"
              @change="
                (val) =>
                  handleQuantityChange({
                    id: item.id,
                    count: val,
                  })
              "
            />
          </div>

          <div class="item-total">
            总价：<span>¥{{ item.price * item.count }}</span>
          </div>

          <div class="item-remove">
            <el-button type="danger" text @click="handleRemoveProduct(item.id)">
              删除
            </el-button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-header">
          <el-checkbox v-model="selectAll" @change="handleSelectAll" />
          <span>全选</span>
          <el-button
            type="danger"
            text
            @click="handleClearCart"
            :disabled="!isSelected"
          >
            清空
          </el-button>
        </div>

        <div class="summary-content">
          <div class="summary-row">
            <span>已选商品 {{ selectedProducts.length }} 件</span>
            <span
              >合计:
              <span class="total-price"
                >¥{{ totalPrice.toFixed(2) }}</span
              ></span
            >
          </div>

          <el-button
            type="primary"
            size="large"
            @click="handleCheckout"
            :disabled="!isSelected"
          >
            去结算
            <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
      </div>
    </div>

    <el-empty v-else description="购物车是空的" />

    <BackToTop />
  </div>
</template>

<style scoped>
  .cart {
    min-height: 100vh;
    background: #f5f5f5;
    padding: 20px;
  }

  .cart-header {
    background: #fff;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .cart-header h1 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }

  .cart-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .cart-items {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
  }

  .cart-item {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #eee;
  }

  .cart-item:last-child {
    border-bottom: none;
  }

  .item-image {
    width: 120px;
    height: 120px;
    margin-right: 20px;
    cursor: pointer;
    overflow: hidden;
    flex-shrink: 0;
  }

  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .item-info {
    flex: 1;
    margin-right: 20px;
  }

  .item-info h3 {
    font-size: 16px;
    margin-bottom: 8px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 300px;
  }

  .item-info h3:hover {
    color: #409eff;
  }

  .item-price {
    color: #ff4d4f;
    font-size: 18px;
    font-weight: bold;
  }

  .item-price span {
    color: #333;
  }

  .item-actions {
    margin-right: 20px;
  }

  .item-total {
    margin-right: 20px;
    font-size: 16px;
    font-weight: 600;
  }

  .item-total span {
    color: #ff4d4f;
  }

  .item-remove {
    flex-shrink: 0;
  }

  .cart-summary {
    background: #fff;
    border-radius: 8px;
    margin-top: 20px;
    padding: 20px;
  }

  .summary-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .summary-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .total-price {
    color: #ff4d4f;
    font-size: 24px;
    font-weight: bold;
  }

  .el-button-group {
    display: flex;
    gap: 10px;
  }

  @media (max-width: 768px) {
    .cart-item {
      flex-wrap: wrap;
    }

    .item-image {
      width: 100px;
      height: 100px;
      margin-right: 15px;
    }

    .item-info h3 {
      width: 200px;
    }

    .summary-content {
      flex-direction: column;
      gap: 15px;
      text-align: center;
    }
  }
</style>
