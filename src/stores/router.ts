/**
 * Vue 3+ 正式版本 by xwt
 * 路由配置的状态管理
 *
 * 路由配置的数据结构定义
 * 全局的路由跳转方法以及其他相关方法
 */
import type {ActionMeta} from "@/router/types.ts";
import type {RouteRecordRaw} from "vue-router";

interface Tab {
    name: string;
    label: string;
    query?: Object;
}

interface PageInfo {
    pageId: string,
    pageName?: string,
    type?: string,
    query?: Object
}

export const useRouterStore = defineStore('router', () => {
    const routerConf = ref([] as ActionMeta[]);

    let currentRouteName = ref("");

    let tabList = [] as Tab[];
    const homePageId = import.meta.env.APP_HOMEPAGE_ID;

    // const routeTo = (pageInfo: PageInfo) => {
    //     let pageId = pageInfo.pageId;
    //     // 摘取页面的原生 pageId（剔除 query 等参数的影响）
    //     const pageIdRaw = pageId.split("/")[0];
    //     // 使用原生 pageId 取得路由配置信息
    //     const page = findPage(routerConf.value, pageIdRaw);
    //     if (!page) {
    //         console.error('RouterStore action "routeTo": Cannot find page by id: ' + pageIdRaw);
    //         return;
    //     }
    //     // 如果是外链页面，则直接跳转
    //     if (page.externalLink) {
    //         window.open(page.externalLink);
    //         return;
    //     }
    //     // 路由配置中页面没有配置实际组件，只作为菜单结构存在
    //     if (!page.component && !page.redirect) return;
    //
    //     let query = pageInfo.query;
    //     const type = pageInfo.type;
    //     // 如果 query 不为空，则修正 pageId
    //     if (query) {
    //         pageId = pageIdRaw + '/';
    //         Object.entries(query).forEach(item => {
    //             // 判断传参合法
    //             if (typeof item[0] === 'string' && typeof item[1] === 'string')
    //                 pageId += (item[0] + '=' + item[1]);
    //             else {
    //                 console.error('RouterStore action "routeTo": Illegal page query.');
    //             }
    //         });
    //     }
    //
    //     let openedTab: Tab;
    //     // 在已打开的 tab 中查找即将路由进入页面是否已存在
    //     if (page.multiTab) {
    //         openedTab = tabList.find(item => item.name === pageId) as Tab;
    //     } else {
    //         openedTab = tabList.find(item => item.name === pageIdRaw) as Tab;
    //     }
    //     if (openedTab === undefined) {
    //         // 如果 tab 还不存在
    //         // 主页做特殊处理
    //         if (pageId !== homePageId) {
    //             let tab = {} as Tab;
    //             // 如果页面允许多开，则使用修正后的 pageId 作为 tabId
    //             // 如果不允许多开，则使用原生 pageId
    //             if (page.multiTab) {
    //                 tab.name = pageId;
    //                 tab.label = pageInfo.pageName ? pageInfo.pageName : page.displayName;
    //             } else {
    //                 tab.name = pageIdRaw;
    //                 tab.label = page.displayName;
    //             }
    //             if (query || page.query) {
    //                 tab.query = query || page.query;
    //             }
    //             // 新增并推入 tabList 或重置当前 tab
    //             if (!type) {
    //                 tabList.push(tab);
    //             } else if (type === 'replace') {
    //                 const idx = tabList.findIndex(item => item.name === currentRouteName.value);
    //                 tabList.splice(idx, 1, tab);
    //             }
    //         }
    //     } else {
    //         // tab 已存在
    //         // 如果页面允许多开，使用 tab 中存储的 query 再将内容复现
    //         if (page.multiTab) {
    //             if (openedTab.query) {
    //                 query = (openedTab.query);
    //             } else {
    //                 tabList.forEach(item => {
    //                     if (item.name === pageIdRaw) {
    //                         item.query = query;
    //                     }
    //                 });
    //             }
    //         }
    //     }
    //     // 设置 currentRouteName 、面包屑以及路由
    //     currentRouteName.value = page.multiTab ? pageId : pageIdRaw;
    //     // 持久化储存
    //     localStorage.setItem('routeName', currentRouteName.value);
    //     let route = {};
    //     if (query || page.query) {
    //         route = {path: page.redirect ? page.redirect : page.path, query: query || page.query};
    //     } else {
    //         route = {path: page.redirect ? page.redirect : page.path};
    //     }
    //     if (!type) {
    //         router.push(route);
    //     } else if (type === 'replace') {
    //         router.replace(route);
    //     }
    // };


    const getActionsFromApi = async () => {
        const {Data} = await getOperatorMenuList();
        return preprocessActionTree(Data ?? [])
    }

    const getActionsFromConfig = async () => {
        return staticActions;
    }

    /**
     * 获取菜单结构配置，生成路由
     */
    const generateRouterConf = async () => {
        // 读取菜单获取途径
        const loadActionType = import.meta.env.APP_LOAD_ACTION_TYPE;
        const getActions = loadActionType === LoadActionTypeEnum.BACKEND ? getActionsFromApi : getActionsFromConfig;
        // 获取菜单
        const actionTree = await getActions();
        // 保存
        routerConf.value = actionTree;
        // 生成路由配置
        const routes = generateRoutes(actionTree);
        // 获取首页配置
        const homePageId = import.meta.env.APP_HOMEPAGE_ID;
        const homePage = findPage(routerConf.value, homePageId);
        if (!homePage) {
            console.error('RouterStore function "generateRouterConf": Cannot find page by id: ' + homePageId);
        }
        // 添加路由到 router
        const routerData = {
            path: '/',
            name: 'rootPath',
            redirect: homePage!.url,
            component: () => import('@/views/layouts/Layout.vue'),
            children: routes
        };
        router.addRoute('Layout', routerData);
    }

    const $reset = () => {

    };

    return {
        currentRouteName,
        routerConf,
        generateRouterConf,
        // routeTo,
        $reset
    }
});

/**
 * 根据查询条件查找 Action 配置
 * @param actions Actions
 * @param key 查询参数
 * @param field 被查询字段
 */
export const findPage = (
    actions: ActionMeta[],
    key: string,
    field: 'id' | 'menuId' | 'title' | 'url' = 'menuId'
): ActionMeta | undefined => {
    let page: ActionMeta;
    for (let i = 0, len = actions.length; i < len; i++) {
        if (actions[i][field] === key) {
            page = actions[i];
            return page;
        }
        if (actions[i].children) {
            const p = findPage(actions[i].children as ActionMeta[], key, field);
            if (p) {
                return p;
            }
        }
    }
}

/**
 * 转换接口数据为 Actions 数据
 * @param actionTree
 */
export const preprocessActionTree = (actionTree: any): ActionMeta[] => {
    return actionTree.map((item: any) => {
        let route: ActionMeta = {};
        route.id = item.Id ?? '';
        route.pId = item.ParentId ?? '';
        route.menuId = item.MenuId ?? '';
        route.title = item.Text ?? '';
        route.type = item.Type ?? (item.component ? MenuPageType.PAGE : MenuPageType.MENU);
        route.url = item.Url ?? '';
        route.icon = item.icon ?? '';

        route.component = item.Component ?? '';
        route.query = item.Query ? JSON.parse(item.Query) : '';
        route.showInMenu = item.ShowInMenu ?? ShowInMenuType.SHOW;
        if (item.Children) {
            route.children = preprocessActionTree(item.Children);
        }
        return route;
    });
}

/**
 * 将 Actions 处理为 Routes 并拉平。
 * @param actions 待处理的 actionList
 */
const generateRoutes = (actions: ActionMeta[]) => {
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

const actionToRoute = (action: ActionMeta) => {
    if (!action.component || !action.url) return;
    const redirect = action.url?.startsWith('/redirect') ? action.url?.split('/redirect')[1] : undefined;
    return {
        path: action.url,
        name: action.menuId,
        component: getRouterModule(action.component),
        redirect,
    } as RouteRecordRaw;
}
const actionToMenu = (action: ActionMeta) => {

}
