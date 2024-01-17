import {createRouter, createWebHashHistory} from 'vue-router'
import type {RouteItem} from "@/stores/router";

const pages: any = import.meta.glob('../views/pages/**/**.vue');

// import {useRouterStore} from "@/stores/router";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue'),
        },
        {
            path: '/',
            name: 'main',
            component: () => import('@/views/Main.vue'),
            children: []
        },
    ],
})

/**
 * setRouter 用于根据配置创建路由
 * @param routerConfig 路由配置
 * @param pName 当前返回 router 所挂载的路由节点
 */
export const setRouter = (routerConfig: RouteItem[], pName = 'main') => {
    if (!Array.isArray(routerConfig)) return [];
    routerConfig.forEach(item => {
        let route: any = {};
        // if (item.component || item.components) {
        route.path = item.path;
        route.name = item.name;
        // if (item.components) {
        //     let components = {};
        //     for (const [key, value] of Object.entries(item.components)) {
        //         components[key] = () => import(value + '.vue');
        //     }
        //     route.components = components;
        // }
        if (item.component) route.component = pages['../views/' + item.component + '.vue'];
        if (item.redirect) route.redirect = item.redirect;
        // 临时增加 keep-alive 设置
        // route['meta'] = { keepAlive: !item.multiTab };
        // 将处理过后的路由节点添加到 router 中
        // }
        // 外链跳转属于特殊的菜单结构，不添加到 router 中
        if (item.externalLink) return;
        router.addRoute(pName, route);
        // 处理路由子节点
        if (Array.isArray(item.children) && item.children.length) {
            setRouter(item.children, item.name);
        }
    });
}

export const resetRouter = () => {
    // @ts-ignore
    router.matcher = createRouter.matcher;
}

// 路由守卫
// 页面路由仅限配置中的页面
router.beforeEach((to, from, next) => {
    // const routerStore = useRouterStore();
    // console.log('to: ', to);
    // if (to.name === 'login' || to.name === 'main' || to.name === null) {
    next();
    // } else {
    //     let page = findPageByName(routerStore.routerConf, to.name as string);
    //     if (page) {
    //         next();
    //     } else {
    //         return false;
    //     }
    // }
});
export default router
