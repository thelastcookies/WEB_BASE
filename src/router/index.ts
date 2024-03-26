import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/login',
        name: 'login',
        component: () => import('@/views/common/Login.vue'),
    }, {
        path: '/',
        name: 'Layout',
        component: () => import('@/views/layout/Layout.vue'),
        children: []
    },],
});

export default router;
