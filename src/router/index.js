import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Category from '@/views/Category/Category.vue'
import ProductList from '@/views/ProductList/ProductList.vue'
import ProductDetail from '@/views/ProductDetail/ProductDetail.vue'
import SearchResult from '@/views/SearchResult/SearchResult.vue'
import Cart from '@/views/Cart/Cart.vue'
import OrderConfirm from '@/views/OrderConfirm/OrderConfirm.vue'
import OrderList from '@/views/OrderList/OrderList.vue'
import OrderDetail from '@/views/OrderDetail/OrderDetail.vue'
import Login from '@/views/Login/Login.vue'
import Register from '@/views/Register/Register.vue'
import UserCenter from '@/views/UserCenter/UserCenter.vue'
import Profile from '@/views/Profile/Profile.vue'
import Address from '@/views/Address/Address.vue'
import Favorite from '@/views/Favorite/Favorite.vue'
import NotFound from '@/views/NotFound/NotFound.vue'
import { ElMessage } from "element-plus";

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/productList',
    component: ProductList
  },
  {
    path: '/productDetail/:id',
    component: ProductDetail,
    props: true
  },
  {
    path: '/search',
    component: SearchResult
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/orderConfirm',
    component: OrderConfirm
  },
  {
    path: '/orders',
    component: OrderList
  },
  {
    path: '/orderDetail/:id',
    component: OrderDetail,
    props: true
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/user',
    component: UserCenter
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/address',
    component: Address
  },
  {
    path: '/favorite',
    component: Favorite
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局路由守卫，检查用户是否登录
router.beforeEach((to, from) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const token = localStorage.getItem('token')
  if (authRequired && !token) {
    setTimeout(() => {
      ElMessage.info("请先登录再访问！")
    }, 500);
    return "/login"
  }
})

export default router
