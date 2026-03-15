import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import BackToTop from "@/components/BackToTop/BackToTop.vue";

const pinia = createPinia()
const app = createApp(App)
app.component('BackToTop', BackToTop) // 注册全局组件

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(ElementPlus)
app.use(router)



app.mount('#app')
