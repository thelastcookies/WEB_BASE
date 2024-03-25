import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/login',
        name: 'login',
        component: () => import('@/views/common/Login.vue'),
    }],
});

export default router;
