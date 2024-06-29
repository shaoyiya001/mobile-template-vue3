import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    name: 'home',
    component: () => import("@/views/Home/Home.vue"),
    alias: '/home', // 路由别名
    meta: {
      title: '首页'
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
