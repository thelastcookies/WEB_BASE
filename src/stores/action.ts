import type {ActionItem, Key, RecordName} from "@/types";

export const useActionStore = defineStore('action', () => {
    const actionTree = shallowRef([] as ActionItem[]);

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
    key: Key | RecordName,
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
 * 根据查询条件查找父级 Action 配置直到根节点
 * @param actions Actions
 * @param key 查询参数
 * @param field 被查询字段
 */
export const findActionAncestorChain = (
    actions: ActionItem[],
    key: Key | RecordName,
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
        return undefined;
    }
};

/**
 * 转换接口数据为 Actions 数据
 * 主要进行字段的转换和过滤
 * @param dataTree 接口数据
 */
export const preprocessActionTree = (dataTree: any): ActionItem[] => {
    return dataTree.map((item: any) => {
        let action= {} as ActionItem;
        action.id = item.Id ?? '';
        action.pId = item.ParentId ?? '';
        action.menuId = item.MenuId ?? '';
        action.title = item.Text ?? '';
        action.type = item.Type ?? (item.component ? MenuPageType.PAGE : MenuPageType.MENU);
        action.url = item.Url ?? '';
        action.icon = item.icon ?? '';

        action.component = item.Component ?? '';
        action.query = item.Query ? JSON.parse(item.Query) : '';
        action.showInMenu = item.ShowInMenu ?? ShowInMenuType.SHOW;
        if (item.Children) {
            action.children = preprocessActionTree(item.Children);
        }
        return action;
    });
};
