import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/login',
    name: 'Login',
    component: () => import('@/views/common/Login.vue'),
  }, {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/layouts/Layout.vue'),
    children: []
  }, {
    path: '/sample',
    name: 'Sample',
    component: () => import('@/views/samples/Sample.vue'),
  }, {
    path: '/:pathMatch(.*)',
    meta: {
      title: '找不到页面',
    },
    component: () => import('@/views/exceptions/Error.vue'),
  },],
});

export default router;
