# 极选商城

## 项目概述

极选商城是一款基于 Vue3 + Element Plus 技术栈开发的电商前端系统。项目采用模块化和组件化的页面设计，提供了完整的商品展示、搜索、购物车、收藏、订单管理及用户中心等核心功能，能够满足基础的电商业务需求。

本项目使用 VSCode 作为开发工具，结合 Pinia 实现全局状态管理，并通过本地存储优化数据持久化，同时利用 Vue Router 实现页面路由跳转。系统通过动态数据渲染和交互操作优化用户体验。

### 技术栈

框架：Vue 3

UI 组件库：Element Plus

状态管理：Pinia

路由管理：Vue Router

开发工具：VSCode

构建工具：Vite

本地存储：localStorage

### 功能模块
1. 商品展示

商品列表展示，支持分页与分类筛选

商品详情页，显示详细信息、规格选择、价格及库存

商品图片轮播、评价信息展示

2. 商品搜索

支持关键字搜索

实时筛选和模糊查询

搜索结果动态渲染

3. 购物车管理

添加、删除、修改商品数量

计算总价、优惠金额

支持批量结算

4. 收藏功能

收藏商品到用户中心

收藏列表管理

支持批量删除

5. 订单管理

订单生成与查看

订单详情页，显示商品信息、支付状态、配送信息

历史订单管理

6. 用户中心

用户信息管理

地址管理（新增、编辑、删除、默认地址设置）

登录/注册功能

状态持久化（localStorage 支持）

### 安装与运行
克隆项目
git clone https://github.com/你的用户名/selectedmall.git
cd selectedmall
安装依赖
npm install
#### 或者使用 yarn
yarn install
本地启动
npm run dev
#### 或 yarn dev

浏览器打开 http://localhost:5173
 访问项目（端口根据配置可能不同）。

打包构建
npm run build
#### 或 yarn build

生成的静态文件位于 dist 目录，可部署到任意静态服务器。

项目结构
selectedmall/
│
├─ public/                 # 静态资源
├─ src/
│   ├─ assets/             # 图片、样式等
│   ├─ components/         # 公共组件
│   ├─ constant/           # 常量
│   ├─ views/              # 页面视图
│   ├─ router/             # 路由配置
│   ├─ store/              # Pinia 状态管理
│   ├─ utils/              # 工具函数
│   ├─ App.vue             # 根组件
│   └─ main.js             # 入口文件
├─ package.json
├─ vite.config.js           # Vite 配置
└─ README.md
## 核心技术实现
1. 全局状态管理

使用 Pinia 管理商品、用户信息、购物车、收藏等全局状态

状态变化同步到 localStorage，保证页面刷新数据持久化

2. 路由管理

Vue Router 配置多页面路由

支持动态路由，如 /orderDetail/:id

路由守卫用于用户权限控制

3. 动态数据渲染

商品列表和详情页通过 v-for 渲染动态数据

使用计算属性和 watch 实现交互更新（如购物车数量变化、总价计算）

4. 组件化设计

每个功能模块拆分为独立组件

组件之间通过 props 和事件通信

复用性高，易于维护

开发规范

使用 ESLint + Prettier 保持代码规范

组件命名采用 PascalCase

页面和组件目录按功能模块划分

使用 ref 和 reactive 处理响应式数据

使用 computed 和 watch 优化性能

## 演示账号
- 用户名: admin
- 密码: 123456

## 注意事项
1. 这是一个演示项目，数据存储在 LocalStorage 中，刷新页面后会保留
2. 图片使用 placeholder 服务，实际使用时需要替换为真实图片
3. 订单功能为模拟实现，实际项目中需要对接后端 API
4. 确保本地 Node.js 版本 >= 16
5. 在 Windows 环境下，本地路径请注意使用 / 或 \\ 转义
6. Pinia 状态持久化依赖 localStorage，如浏览器禁用可能丢失数据
7. 部署生产环境前请构建静态文件

## 联系方式

如有问题或建议，请联系作者：

GitHub: https://github.com/pikachuprogrammer01
邮箱: 3142426048@qq.com