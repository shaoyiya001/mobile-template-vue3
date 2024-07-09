import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home/:id?/:name?',
    name: 'home',
    component: () => import("@/views/Home/Home.vue"),
    // alias: '/', // 路由别名
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import("@/views/About/index.vue"),
    meta: {
      title: 'about页面'
    }
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/404/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
