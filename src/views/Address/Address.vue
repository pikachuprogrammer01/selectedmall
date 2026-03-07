<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Edit, Delete, Location, User, Phone, HomeFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

// 收货地址
const addressList = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: '某某街道123号',
    isDefault: true
  },
  {
    id: 2,
    name: '张三',
    phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '海淀区',
    detail: '某某街道456号',
    isDefault: false
  },
  {
    id: 3,
    name: '李四',
    phone: '13900139000',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    detail: '某某路789号',
    isDefault: false
  }
])

const selectedAddress = ref(null)
const editingAddress = ref(null)
const showAddDialog = ref(false)
const showEditDialog = ref(false)

const newAddress = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: ''
})

const isDefault = computed(() => {
  return selectedAddress.value && selectedAddress.value.isDefault
})

const addressForm = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: '',
  isDefault: false
})

const handleSelectAddress = (address) => {
  selectedAddress.value = address
}

const handleAddAddress = () => {
  showAddDialog.value = true
  editingAddress.value = null
}

const handleEditAddress = (address) => {
  showEditDialog.value = true
  editingAddress.value = address
  addressForm.value = {
    ...address
  }
}

const handleDeleteAddress = (id) => {
  if (addressList.value.length === 1) {
    ElMessage.warning('至少保留一个地址')
    return
  }

  ElMessageBox.confirm('确定要删除该地址吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    addressList.value = addressList.value.filter(addr => addr.id !== id)
    if (selectedAddress.value && selectedAddress.value.id === id) {
      selectedAddress.value = addressList.value[0]
    }
    ElMessage.success('地址已删除')
  }).catch(() => {})
}

const handleSetDefault = (address) => {
  addressList.value.forEach(addr => {
    addr.isDefault = false
  })
  address.isDefault = true
  selectedAddress.value = address
  ElMessage.success('已设置为默认地址')
}

const handleSaveAddress = () => {
  if (!addressForm.value.name || !addressForm.value.phone) {
    ElMessage.warning('请填写联系人姓名和手机号')
    return
  }

  if (addressForm.value.phone.length !== 11) {
    ElMessage.warning('手机号格式不正确')
    return
  }

  if (editingAddress.value) {
    // 编辑现有地址
    const index = addressList.value.findIndex(addr => addr.id === editingAddress.value.id)
    if (index !== -1) {
      addressList.value[index] = {
        ...addressForm.value,
        id: editingAddress.value.id
      }
    }
    showEditDialog.value = false
    ElMessage.success('地址已更新')
  } else {
    // 添加新地址
    const newId = Date.now()
    addressList.value.push({
      ...addressForm.value,
      id: newId
    })
    showAddDialog.value = false
    ElMessage.success('地址已添加')
  }

  // 如果是默认地址，更新所有地址的默认状态
  if (addressForm.value.isDefault) {
    addressList.value.forEach(addr => {
      addr.isDefault = false
    })
    addressList.value[addressList.value.length - 1].isDefault = true
  }

  // 清空表单
  addressForm.value = {
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    isDefault: false
  }
}

const handleCancel = () => {
  showAddDialog.value = false
  showEditDialog.value = false
  editingAddress.value = null
  addressForm.value = {
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    isDefault: false
  }
}
</script>

<template>
  <div class="address">
    <div class="page-header">
      <h1>收货地址</h1>
      <el-button type="primary" @click="handleAddAddress">
        <el-icon><Location /></el-icon>
        添加新地址
      </el-button>
    </div>

    <div class="address-list">
      <div
        v-for="address in addressList"
        :key="address.id"
        class="address-card"
        :class="{ selected: selectedAddress?.id === address.id }"
        @click="handleSelectAddress(address)"
      >
        <div class="address-main">
          <div class="address-header">
            <div class="address-name">
              <span class="name">{{ address.name }}</span>
              <el-tag v-if="address.isDefault" type="primary" size="small">默认</el-tag>
            </div>
            <div class="address-phone">{{ address.phone }}</div>
          </div>

          <div class="address-detail">
            <el-icon><Location /></el-icon>
            <span>{{ address.province }} {{ address.city }} {{ address.district }} {{ address.detail }}</span>
          </div>
        </div>

        <div class="address-actions">
          <el-button type="primary" text @click="handleEditAddress(address)">
            <el-icon><Edit /></el-icon>
            编辑
          </el-button>
          <el-button type="primary" text @click="handleSetDefault(address)">
            <el-icon><HomeFilled /></el-icon>
            {{ address.isDefault ? '取消默认' : '设为默认' }}
          </el-button>
          <el-button type="danger" text @click="handleDeleteAddress(address.id)">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </div>
      </div>
    </div>

    <!-- 添加地址对话框 -->
    <el-dialog
      v-model="showAddDialog"
      :title="editingAddress ? '编辑地址' : '添加地址'"
      width="600px"
    >
      <el-form :model="addressForm" label-position="top">
        <el-form-item label="联系人">
          <el-input v-model="addressForm.name" placeholder="请输入联系人姓名" />
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="addressForm.phone" placeholder="请输入手机号" />
        </el-form-item>

        <el-form-item label="省份">
          <el-input v-model="addressForm.province" placeholder="请输入省份" />
        </el-form-item>

        <el-form-item label="城市">
          <el-input v-model="addressForm.city" placeholder="请输入城市" />
        </el-form-item>

        <el-form-item label="区县">
          <el-input v-model="addressForm.district" placeholder="请输入区县" />
        </el-form-item>

        <el-form-item label="详细地址">
          <el-input
            v-model="addressForm.detail"
            type="textarea"
            :rows="3"
            placeholder="请输入详细地址"
          />
        </el-form-item>

        <el-form-item label="设为默认">
          <el-switch v-model="addressForm.isDefault" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSaveAddress">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.address {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
}

.page-header {
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.address-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.address-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid #eee;
}

.address-card:hover {
  border-color: #409eff;
}

.address-card.selected {
  border-color: #409eff;
  background: #ecf5ff;
}

.address-main {
  flex: 1;
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.address-name {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.address-phone {
  font-size: 16px;
  color: #666;
}

.address-detail {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
}

.address-detail .el-icon {
  color: #409eff;
}

.address-actions {
  display: flex;
  gap: 10px;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 15px;
  }

  .address-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .address-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
