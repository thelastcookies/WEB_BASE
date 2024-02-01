import type {ActionItem} from "@/types";

export const useActionStore = defineStore('action', () => {
    const actionTree = shallowRef([] as ActionItem[]);
    // const actionMap = ref(new Map<Key, ActionItem>());

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
        // console.log(actionTree);
        return actionTree.value;
    };


    const $reset = () => {
        actionTree.value = [] as ActionItem[];
    };

    return {
        actionTree,
        getActions,
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
    key: string,
    field: 'id' | 'menuId' | 'title' | 'url' = 'menuId'
): ActionItem | undefined => {
    let page: ActionItem;
    for (let i = 0, len = actions.length; i < len; i++) {
        if (actions[i][field] === key) {
            page = actions[i];
            return page;
        }
        if (actions[i].children) {
            const p = findAction(actions[i].children as ActionItem[], key, field);
            if (p) {
                return p;
            }
        }
    }
}

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
