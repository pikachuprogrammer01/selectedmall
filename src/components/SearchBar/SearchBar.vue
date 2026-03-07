<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

const router = useRouter()
const searchText = ref('')

const handleSearch = () => {
  if (searchText.value.trim()) {
    router.push({
      path: '/search',
      query: { keyword: searchText.value }
    })
  }
}
</script>

<template>
  <div class="search-bar" @click="handleSearch">
    <el-input
      v-model="searchText"
      placeholder="搜索商品、品牌..."
      size="large"
      clearable
      @keyup.enter="handleSearch"
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
      <template #append>
        <el-button type="primary" @click.stop="handleSearch">
          搜索
        </el-button>
      </template>
    </el-input>
  </div>
</template>

<style scoped>
.search-bar {
  max-width: 500px;
  margin: 0 auto;
}

.el-input-group__append {
  padding: 0;
}

.el-button {
  border: none;
}

.el-button:focus {
  outline: none;
}
</style>
