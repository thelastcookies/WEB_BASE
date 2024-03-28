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
        component: () => import('@/views/layouts/Layout.vue'),
        children: []
    }, {
        path: '/:pathMatch(.*)',
        meta: {
            title: '找不到页面',
        },
        component: () => import('@/views/exception/Error.vue'),
    },],
});

export default router;
