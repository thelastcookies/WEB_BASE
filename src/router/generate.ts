import type {
    ActionRecordLink,
    ActionRecordMenu,
    ActionRecordPage,
    ActionRecordPageWithChildren,
    ActionRecordRaw,
    ActionRecordRedirect
} from "@/types/action";
import type {RouteRecordRaw} from "vue-router";

/**
 * 根据 Actions 配置，生成路由
 */
export const generateRouterConf = (
    actionTree: ActionRecordRaw[]
): ActionRecordPage | ActionRecordMenu | ActionRecordRedirect | ActionRecordLink | undefined => {
    // 生成路由配置
    const routes = generateRoutes(actionTree);
    // 获取首页配置
    const homePageId = import.meta.env.APP_HOMEPAGE_ID;
    let homePage = {} as ActionRecordRaw | undefined;
    if (!homePageId) {
        console.info(`Router.generate "generateRouterConf": Empty configuration item 'APP_HOMEPAGE_ID'.`);
        homePage = findDescendantWithUrlDefined(actionTree[0]);
    } else {
        homePage = findAction(actionTree, homePageId);
    }
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
};

/**
 * 将 Actions 处理为 RouteMap 并拉平。
 * @param actions 待处理的 actionList
 */
const generateFlatRoutes = (actions: ActionRecordRaw[]): RouteRecordRaw[] => {
    const routeData = [] as RouteRecordRaw[];
    for (const action of actions) {
        if ('children' in action && action.children.length) {
            routeData.push(...generateFlatRoutes(action.children));
        }
        const route = actionToRoute(action);
        if (!route) continue;
        routeData.push(route);
    }
    return routeData;
};

/**
 * 将 Actions 处理为 RouteMap。
 * @param actions 待处理的 actionList
 */
const generateRoutes = (actions: ActionRecordRaw[]) => {
    const routeData = [] as RouteRecordRaw[];
    for (const action of actions) {
        const route = actionToRoute(action);
        if ('children' in action && action.children.length) {
            route.children = generateRoutes(action.children)
        }
        routeData.push(route);
    }
    return routeData;
};

/**
 * 将 Action 处理为 RouteRecordRaw 类型并返回
 * 如果 Action 没有配置 component 与 url 属性，则视作非实体组件而不会被加入到 router 中
 * @param action
 */
const actionToRoute = (action: ActionRecordRaw): RouteRecordRaw => {
    const route = {} as RouteRecordRaw;
    route.name = typeof action.actionId === 'number' ? String(action.actionId) : action.actionId;
    if ('url' in action) {
        route.path = action.url;
        route.props = action.url.search(/:/) > 0;
    } else {
        route.path = '';
    }
    if ('component' in action) {
        route.component = getRouterModule(action.component);
    }
    route.redirect = 'redirect' in action ? action.redirect : findDescendantWithUrlDefined(action)?.url ?? '';
    return route;
};

export const findDescendantWithUrlDefined = (
    action: ActionRecordRaw
): ActionRecordPage | ActionRecordPageWithChildren | ActionRecordLink | undefined => {
    if ('children' in action) {
        if ('url' in action.children[0]) return action.children[0];
        else findDescendantWithUrlDefined(action.children[0]);
    } else return undefined;
};
