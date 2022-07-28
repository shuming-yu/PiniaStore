import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  // {
  //   path: '/',
  //   component: () => import('../views/Dashboard.vue'),
  //   children: [
  //     {
  //       path: 'cart',
  //       component: () => import('../views/UserCart.vue'),
  //     }
  //   ]
  // },
  {
    path: '/userboard',
    component: () => import('../views/Userboard.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue'),
      },
      {
        path: 'product/:productId', // 動態路由 : productId 轉化為動態形式
        component: () => import('../views/UserProduct.vue'),
      },
      {
        path: 'checkout/:orderId', // 動態路由 : productId 轉化為動態形式
        component: () => import('../views/UserCheckout.vue'),
      },
      {
        path: 'faq',
        component: () => import('../views/Faq.vue'),
      },
    ],
  },
  /* 重新導向說明：https://next.router.vuejs.org/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route */
  // 404頁面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
  },
]
// 路由選項：https://next.router.vuejs.org/zh/api/#routeroptions
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',  // 被點擊激活的時候,套用 Bootstrap active 樣式
  scrollBehavior(to, from, savedPosition) {
    console.log('to', to);  // 到達哪個頁面
    console.log('from', from);  // 從哪個頁面來
    console.log('savedPosition', savedPosition);  // 畫面位置資訊
    // `to` 和 `from` 都是路由地址
    // `savedPosition` 可以為空，如果沒有的話。
  },
})

export default router
