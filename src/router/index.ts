import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/common/Login.vue'),
        },
        {
            path: '/401',
            name: 'Error401',
            component: () => import('@/views/exception/401.vue'),
            meta: {
                title: '授权已过期',
            },
        },
        {
            path: '/',
            name: 'Layout',
            component: () => import('@/views/layouts/Layout.vue'),
            children: []
        },
        // {
        //     path: '/common',
        //     name: 'LayoutBasicRedirect',
        //     component: Layout,
        //     redirect: '/common/redirect',
        //     children: [
        //         {
        //             path: '/common/redirect',
        //             component: () => import('~/pages/common/route-view.vue'),
        //             name: 'CommonRedirect',
        //             redirect: '/redirect',
        //             children: [
        //                 {
        //                     path: '/redirect/:path(.*)',
        //                     name: 'RedirectPath',
        //                     component: () => import('~/pages/common/redirect.vue'),
        //                 },
        //             ],
        //         },
        //
        //     ],
        // },
        {
            path: '/:pathMatch(.*)',
            meta: {
                title: '找不到页面',
            },
            component: () => import('@/views/exception/error.vue'),
        },
    ],
});

export default router;
