<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ShoppingCart, Star, ChatDotRound, ArrowLeft, Share } from '@element-plus/icons-vue'
import { useCartStore } from '@/store/cart'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

const productId = computed(() => parseInt(route.query.id) || 1)

// 模拟商品数据
const products = ref([
  {
    id: 1,
    name: '智能手机 X Pro',
    price: 3999,
    image: 'https://via.placeholder.com/600x600?text=Phone',
    images: [
      'https://via.placeholder.com/600x600?text=Phone+1',
      'https://via.placeholder.com/600x600?text=Phone+2',
      'https://via.placeholder.com/600x600?text=Phone+3',
      'https://via.placeholder.com/600x600?text=Phone+4'
    ],
    category: '手机数码',
    stock: 100,
    description: '最新旗舰手机，采用最新处理器，超长续航，超大屏幕。',
    specs: {
      color: ['黑色', '白色', '蓝色'],
      storage: ['128GB', '256GB', '512GB']
    }
  },
  {
    id: 2,
    name: '笔记本电脑 Air',
    price: 5999,
    image: 'https://via.placeholder.com/600x600?text=Laptop',
    images: [
      'https://via.placeholder.com/600x600?text=Laptop+1',
      'https://via.placeholder.com/600x600?text=Laptop+2',
      'https://via.placeholder.com/600x600?text=Laptop+3'
    ],
    category: '电脑办公',
    stock: 50,
    description: '轻薄便携，性能强劲，采用最新处理器。',
    specs: {
      color: ['银色', '深空灰'],
      storage: ['256GB', '512GB', '1TB']
    }
  }
])

const currentProduct = computed(() => {
  return products.value.find(p => p.id === productId.value) || products.value[0]
})

const selectedImage = ref(0)
const selectedColor = ref('黑色')
const selectedStorage = ref('128GB')
const quantity = ref(1)

const relatedProducts = computed(() => {
  return products.value.filter(p => p.category === currentProduct.value.category && p.id !== currentProduct.value.id).slice(0, 4)
})

const handleImageClick = (index) => {
  selectedImage.value = index
}

const handleAddToCart = () => {
  cartStore.addToCart({
    ...currentProduct.value,
    id: currentProduct.value.id
  })
  ElMessage.success('已添加到购物车')
}

const handleBuyNow = () => {
  if (quantity.value > currentProduct.value.stock) {
    ElMessage.warning('库存不足')
    return
  }
  handleAddToCart()
}

onMounted(() => {
  if (!productId.value) {
    router.push('/')
  }
})
</script>

<template>
  <div class="product-detail" v-if="currentProduct">
    <div class="back-btn" @click="router.back()">
      <el-icon><ArrowLeft /></el-icon>
      返回
    </div>

    <div class="product-container">
      <div class="product-images">
        <div class="main-image">
          <img :src="currentProduct.images[selectedImage]" :alt="currentProduct.name" />
        </div>
        <div class="thumbnail-list">
          <div
            v-for="(img, index) in currentProduct.images"
            :key="index"
            class="thumbnail"
            :class="{ active: selectedImage === index }"
            @click="handleImageClick(index)"
          >
            <img :src="img" :alt="currentProduct.name" />
          </div>
        </div>
      </div>

      <div class="product-info">
        <h1 class="product-title">{{ currentProduct.name }}</h1>
        <div class="product-category">{{ currentProduct.category }}</div>
        <div class="product-price">¥{{ currentProduct.price }}</div>
        <div class="product-stock">库存: {{ currentProduct.stock }}件</div>

        <div class="product-description">
          <div class="section-title">
            <el-icon><ChatDotRound /></el-icon>
            商品描述
          </div>
          <p>{{ currentProduct.description }}</p>
        </div>

        <div class="product-specs">
          <div class="section-title">
            <el-icon><ShoppingBag /></el-icon>
            商品规格
          </div>
          <div class="spec-item">
            <label>颜色:</label>
            <div class="spec-options">
              <el-tag
                v-for="color in currentProduct.specs.color"
                :key="color"
                :type="selectedColor === color ? 'primary' : ''"
                @click="selectedColor = color"
                style="cursor: pointer; margin-right: 10px;"
              >
                {{ color }}
              </el-tag>
            </div>
          </div>
          <div class="spec-item">
            <label>存储:</label>
            <div class="spec-options">
              <el-tag
                v-for="storage in currentProduct.specs.storage"
                :key="storage"
                :type="selectedStorage === storage ? 'primary' : ''"
                @click="selectedStorage = storage"
                style="cursor: pointer; margin-right: 10px;"
              >
                {{ storage }}
              </el-tag>
            </div>
          </div>
        </div>

        <div class="product-quantity">
          <label>数量:</label>
          <el-input-number
            v-model="quantity"
            :min="1"
            :max="currentProduct.stock"
            size="large"
          />
        </div>

        <div class="product-actions">
          <el-button type="danger" size="large" @click="handleBuyNow">
            立即购买
          </el-button>
          <el-button type="primary" size="large" @click="handleAddToCart">
            加入购物车
          </el-button>
        </div>

        <div class="product-share">
          <el-button size="small">
            <el-icon><Share /></el-icon>
            分享
          </el-button>
          <el-button size="small">
            <el-icon><Star /></el-icon>
            收藏
          </el-button>
        </div>
      </div>
    </div>

    <!-- 相关商品 -->
    <div class="related-products" v-if="relatedProducts.length > 0">
      <div class="section-title">
        <el-icon><ShoppingBag /></el-icon>
        <span>相关商品</span>
      </div>
      <div class="product-grid">
        <ProductCard
          v-for="product in relatedProducts"
          :key="product.id"
          :product="product"
          @click="router.push({ path: '/productDetail', query: { id: product.id } })"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
}

.back-btn {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
  color: #666;
}

.back-btn:hover {
  color: #409eff;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.product-images {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.main-image {
  width: 100%;
  height: 400px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.thumbnail-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
}

.thumbnail.active {
  border: 2px solid #409eff;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.product-category {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
}

.product-price {
  font-size: 32px;
  color: #ff4d4f;
  font-weight: bold;
  margin-bottom: 15px;
}

.product-stock {
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
}

.product-description,
.product-specs {
  margin-bottom: 30px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

.product-description p {
  line-height: 1.8;
  color: #666;
}

.spec-item {
  margin-bottom: 20px;
}

.spec-item label {
  display: block;
  margin-bottom: 10px;
  color: #333;
}

.product-quantity {
  margin-bottom: 30px;
}

.product-quantity label {
  display: block;
  margin-bottom: 10px;
  color: #333;
}

.product-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.product-share {
  display: flex;
  gap: 10px;
}

.related-products {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .product-images {
    order: 2;
  }

  .main-image {
    height: 300px;
  }

  .product-info {
    order: 1;
  }

  .thumbnail-list {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
