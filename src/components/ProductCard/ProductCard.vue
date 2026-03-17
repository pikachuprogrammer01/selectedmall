<script setup>
  import {
    ref,
    watch,
    defineProps,
    defineEmits,
    getCurrentInstance,
  } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import OverflowTooltip from "@/components/OverflowTooltip/OverflowTooltip.vue";
  import { ShoppingCart, Lightning } from "@element-plus/icons-vue";
  import { ElMessage } from "element-plus";
  import { useCartStore } from "@/store/cart.js";
  import { useProductStore } from "@/store/product.js";
  import cartMessage from "@/constant/cart.js";

  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  });

  const emit = defineEmits(["click", "add-cart", "buy-now"]);

  const quantity = ref(1);
  const cartStore = useCartStore();
  const productsStore = useProductStore();
  const currentProduct = ref(null);
  const route = useRoute();
  const router = useRouter();

  const initProduct = () => {
    const id = props.product.id;
    const product = productsStore.products.find((p) => p.id === id);
    currentProduct.value = product || productsStore.products[0];
  };

  // 监听路由变化更新 currentProduct
  watch(
    () => route.params.id,
    () => {
      initProduct();
      // 逐渐回到顶部
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    { immediate: true },
  );

  const handleAddToCart = () => {
    cartStore.addToCart({
      ...currentProduct.value,
      id: currentProduct.value.id,
    });
    ElMessage.success(cartMessage.ADDED_TO_CART);
  };

  // 👇 获取当前实例
  const instance = getCurrentInstance();

  /**
   * 判断父组件是否监听事件
   */
  const hasListener = (eventName) => {
    return !!instance.vnode.props?.[`on${eventName}`];
  };

  /**
   * 内部默认逻辑
   */
  const handleAddCart = () => {
    if (hasListener("AddCart")) {
      emit("add-cart", props.product);
    } else {
      // 👇 默认行为
      if (quantity.value > currentProduct.value.stock) {
        ElMessage.warning("库存不足");
        return;
      }
      // 添加到购物车
      handleAddToCart();
      // 把当前商品数量更改
      cartStore.updateCartCount(currentProduct.value.id, quantity.value);
    }
  };

  const handleBuyNow = () => {
    if (hasListener("BuyNow")) {
      emit("buy-now", props.product);
    } else {
      if (quantity.value > currentProduct.value.stock) {
        ElMessage.warning("库存不足");
        return;
      }
      // 添加到购物车
      handleAddToCart();
      // 把当前商品数量更改
      cartStore.updateCartCount(currentProduct.value.id, quantity.value);

      // 跳转到订单确认页面
      router.push({
        path: "/orderConfirm",
        query: {
          id: currentProduct.value.id,
        },
      });
    }
  };
</script>

<template>
  <div class="product-card" @click="emit('click', product)">
    <div class="product-image">
      <img :src="product.image" :alt="product.title" />

      <div class="hover-mask">
        <el-button
          type="primary"
          :icon="ShoppingCart"
          @click.stop="handleAddCart"
        >
          加入购物车
        </el-button>

        <el-button type="danger" :icon="Lightning" @click.stop="handleBuyNow">
          立即购买
        </el-button>
      </div>
    </div>

    <div class="product-info">
      <h3>{{ product.title }}</h3>
      <p class="product-category">{{ product.category }}</p>
      <OverflowTooltip :text="product.description" />
      <div class="product-price">¥{{ product.price }}</div>
    </div>
  </div>
</template>

<style scoped>
  .product-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition:
      transform 0.3s,
      box-shadow 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .product-image {
    position: relative;
    width: 100%;
    height: 240px;
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

  /* hover遮罩层 */
  .hover-mask {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;

    opacity: 0;
    transition: opacity 0.3s;
  }

  /* 鼠标移入显示 */
  .product-card:hover .hover-mask {
    opacity: 1;
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
  }
</style>
