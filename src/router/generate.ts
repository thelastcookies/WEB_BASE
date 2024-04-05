import type {ActionItem} from "@/types";
import type {RouteRecordRaw} from "vue-router";
import {MenuPageType} from "@/types/enums";

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
        console.error(`Router.generate "generateRouterConf": Cannot find homepage by id: ${homePageId}.`);
    }

    // 添加路由到 router
    // const routerData = {
    //     path: '/',
    //     name: 'rootPath',
    //     // redirect: homePage!.url,
    //     component: () => basicRouteMap.Parent,
    //     children: routes
    // };
    // router.addRoute('Layout', routerData);

    routes.forEach(route => {
        router.addRoute('Layout', route);
    });
    return homePage;
}

/**
 * 将 Actions 处理为 RouteMap 并拉平。
 * @param actions 待处理的 actionList
 */
const generateFlatRoutes = (actions: ActionItem[]): RouteRecordRaw[] => {
    const routeData = [] as RouteRecordRaw[];
    for (const action of actions) {
        if (action.children && action.children.length) {
            routeData.push(...generateFlatRoutes(action.children));
        }
        const route = actionToRoute(action);
        if (!route) continue;
        routeData.push(route);
    }
    return routeData;
}

/**
 * 将 Actions 处理为 RouteMap。
 * @param actions 待处理的 actionList
 */
const generateRoutes = (actions: ActionItem[]) => {
    const routeData = [] as RouteRecordRaw[];
    for (const action of actions) {
        const route = actionToRoute(action);
        if (action.children && action.children.length) {
            route.children = generateRoutes(action.children)
        }
        routeData.push(route);
    }
    return routeData;
}

/**
 * 将 Action 处理为 RouteRecordRaw 类型并返回
 * 如果 Action 没有配置 component 与 url 属性，则视作非实体组件而不会被加入到 router 中
 * @param action
 */
const actionToRoute = (action: ActionItem): RouteRecordRaw => {
    const component = action.type === MenuPageType.MENU ? basicRouteMap.Parent
        : getRouterModule(action.component);
    const redirect = action.url.startsWith('/redirect') ? action.url.split('/redirect')[1]
        : findMenuRedirect(action);
    const props = action.url.search(/:/) > 0;
    return {
        path: action.url,
        name: action.menuId,
        component,
        props,
        redirect,
    } as RouteRecordRaw;
}

const findMenuRedirect = (action: ActionItem) => {
    if (action.type === MenuPageType.MENU && action.children) {
        if (action.children[0].url) return action.children[0].url;
        else findMenuRedirect(action.children[0]);
    } else return '';
};
