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
    const homePageId = import.meta.env.APP_HOMEPAGE;

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

    const generateRouterConf = async () => {
        const loadActionType = import.meta.env.APP_LOAD_ACTION_TYPE;
        const getActions = loadActionType === LoadActionTypeEnum.BACKEND ? getActionsFromApi : getActionsFromConfig;
        const actionTree = await getActions();

        const routes = generateRoutes(actionTree);

        const routerData = {
            path: '/',
            name: 'rootPath',
            redirect: '/dashboard',
            component: () => import('@/views/layouts/Layout.vue'),
            children: routes
        }
        // const routerData = {
        //     path: '/',
        //     name: 'rootPath',
        //     redirect: '/dashboard',
        //     component: Layout,
        //     children: [{
        //         path: '/',
        //         redirect: '/dashboard',
        //         name: 'ROOT_EMPTY_PATH',
        //         component: getRouterModule('RouteView'),
        //         children: flatRoutesList,
        //     }]
        // }
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

export const findPage = (list: ActionMeta[], id: string): ActionMeta | undefined => {
    let page: ActionMeta;
    for (let i = 0, len = list.length; i < len; i++) {
        if (list[i].id === id) {
            page = list[i];
            // page.bc.push(list[i].displayName);
            return page;
        }
        if (list[i].children) {
            const p = findPage(list[i].children as ActionMeta[], id);
            if (p) {
                return p;
            }
        }
    }
}

export const findPageByName = (list: ActionMeta[], name: string): ActionMeta | undefined => {
    for (let i = 0, len = list.length; i < len; i++) {
        if (list[i].name === name) {
            return list[i];
        }
        if (list[i].children) {
            const p = findPageByName(list[i].children as ActionMeta[], name);
            if (p) {
                return p;
            }
        }
    }
}

export const preprocessActionTree = (actionTree: any): ActionMeta[] => {
    return actionTree.map((item: any) => {
        let route: ActionMeta = {};
        route.id = item.id ?? '';
        route.name = item.name ?? '';
        route.title = item.Text ?? '';
        route.type = item.Type ?? (item.component ? MenuPageType.PAGE : MenuPageType.MENU);
        route.url = item.Url ?? '';
        route.icon = item.icon ?? '';

        route.component = item.Component ?? '';
        route.query = item.Query ? JSON.parse(item.Query) : '';
        route.showInMenu = item.ShowInMenu ?? ShowInMenuType.SHOW;
        route.children = item.Children ? preprocessActionTree(item.Children) : [];
        return route;
    });
}

/**
 * 将 Actions 处理为 Routes 并拉平。
 * @param actions 待处理的 actionList
 */
function generateRoutes(actions: ActionMeta[]) {
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
        name: action.name,
        component: getRouterModule(action.component),
        redirect,
    } as RouteRecordRaw;
}
const actionToMenu = (action: ActionMeta) => {

}
