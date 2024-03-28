import type {RouteLocationRaw} from "vue-router";
import type {ActionItem, Key, RouteToInfo} from "@/types";
import type {Ref} from "vue";

export const useActionStore = defineStore('action', () => {
    const actionTree = shallowRef([] as ActionItem[]);

    const crtActiveMenu = ref() as Ref<ActionItem>;
    const crtBreadcrumb = ref([] as ActionItem[]);

    const getActionsFromApi = async () => {
        const {Data} = await getOperatorMenuList();
        return preprocessActionTree(Data ?? [])
    };

    const getActionsFromConfig = async () => {
        return staticActions;
    };

    const getActions = async () => {
        // 读取 Actions 获取途径
        const loadActionType = import.meta.env.APP_LOAD_ACTION_TYPE;
        const getActionFunc = loadActionType === LoadActionTypeEnum.BACKEND ? getActionsFromApi : getActionsFromConfig;
        // 获取 Actions 配置并保存
        actionTree.value = await getActionFunc();
        return actionTree.value;
    };

    const routeTo = (routeToInfo: RouteToInfo) => {
        let actionId = routeToInfo.id;
        // 使用原生 pageId 取得路由配置信息
        const action = findAction(actionTree.value, actionId);
        if (!action) {
            console.error(`ActionStore "routeTo": Cannot find action by id: ${actionId}.`);
            return;
        }
        // 如果是外链页面，则直接跳转
        if (action.type === MenuPageType.LINK) {
            window.open(action.url);
            return;
        }
        // 路由配置中页面没有配置实际组件，只作为菜单结构存在
        if (!action.component && !action.url?.startsWith('/redirect')) return;

        setCurrentActiveMenu(actionId);
        let route: RouteLocationRaw;
        route = {
            path: action.url!,
        };
        router.push(route);
    }

    const setCurrentActiveMenu = (id: Key) => {
        crtActiveMenu.value = findAction(actionTree.value, id)!;
        crtBreadcrumb.value = findActionAncestorChain(actionTree.value, id)!.reverse();
    };

    const $reset = () => {
        actionTree.value = [] as ActionItem[];
    };

    return {
        actionTree,
        crtActiveMenu,
        crtBreadcrumb,
        getActions,
        routeTo,
        $reset,
    }
});

/**
 * 根据查询条件查找 Action 配置
 * @param actions Actions
 * @param key 查询参数
 * @param field 被查询字段
 */
export const findAction = (
    actions: ActionItem[],
    key: Key,
    field: 'id' | 'menuId' | 'title' | 'url' = 'menuId'
): ActionItem | undefined => {
    let action: ActionItem;
    for (let i = 0, len = actions.length; i < len; i++) {
        if (actions[i][field] === key) {
            action = actions[i];
            return action;
        }
        if (actions[i].children) {
            const p = findAction(actions[i].children as ActionItem[], key, field);
            if (p) {
                return p;
            }
        }
    }
};

/**
 *
 */
export const findActionAncestorChain = (
    actions: ActionItem[],
    key: Key,
    field: 'id' | 'menuId' | 'title' | 'url' = 'menuId',
): ActionItem[] | undefined => {
    const action = findAction(actions, key, field)!;
    if (action) {
        if (action.pId) {
            return [action, ...findActionAncestorChain(actions, action.pId, 'id')!];
        } else {
            return [action];
        }
    } else {
        console.error(`ActionStore "findActionAncestorChain": Cannot find action by ${field}: ${key}`);
        return undefined;
    }
};

/**
 * 转换接口数据为 Actions 数据
 * 主要进行字段的转换和过滤
 * @param actionTree
 */
export const preprocessActionTree = (actionTree: any): ActionItem[] => {
    return actionTree.map((item: any) => {
        let route: ActionItem = {};
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
};
