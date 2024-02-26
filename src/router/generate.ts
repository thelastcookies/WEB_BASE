import type {ActionItem} from "@/types";
import type {RouteRecordRaw} from "vue-router";

/**
 * 根据 Actions 配置，生成路由
 */
export const generateRouterConf = (actionTree: ActionItem[]) => {
    // 生成路由配置
    const routes = generateRoutes(actionTree);
    // 获取首页配置
    const homePageId = import.meta.env.APP_HOMEPAGE_ID;
    const homePage = findAction(actionTree, homePageId);
    if (!homePage) {
        console.error('RouterStore function "generateRouterConf": Cannot find page by id: ' + homePageId + '.');
    }

    // 添加路由到 router
    // const routerData = {
    //     path: '/',
    //     name: 'rootPath',
    //     // redirect: homePage!.url,
    //     // component: () => import('@/views/layouts/Layout.vue'),
    //     children: routes
    // };
    // router.addRoute('Layout', routerData);

    routes.forEach(route => {
        router.addRoute('Layout', route);
    });
}

/**
 * 将 Actions 处理为 RouteMap 并拉平。
 * @param actions 待处理的 actionList
 */
const generateRoutes = (actions: ActionItem[]): RouteRecordRaw[] => {
    const routeData = [] as RouteRecordRaw[];
    for (const action of actions) {
        if (action.children && action.children.length) {
            routeData.push(...generateRoutes(action.children));
        }
        const route = actionToRoute(action);
        if (!route) continue;
        routeData.push(route);
    }
    return routeData;
}

/**
 * 将 Action 处理为 RouteRecordRaw 类型并返回
 * @param action
 */
const actionToRoute = (action: ActionItem) => {
    if (!action.component || !action.url) return;
    const redirect = action.url?.startsWith('/redirect') ? action.url?.split('/redirect')[1] : undefined;
    return {
        path: action.url,
        name: action.menuId,
        component: getRouterModule(action.component),
        redirect,
    } as RouteRecordRaw;
}
