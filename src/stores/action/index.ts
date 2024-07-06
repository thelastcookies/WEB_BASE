import type { Key, RecordName } from "@/types";
import type {
  ActionRecordMenu,
  ActionRecordMenuWithChildren,
  ActionRecordPage,
  ActionRecordPageWithChildren,
  ActionRecordRaw
} from "@/types/action";

export const useActionStore = defineStore('action', () => {
  const actionTree = shallowRef([] as ActionRecordRaw[]);

  const getActionsFromApi = async () => {
    const { Data } = await getOperatorMenuList();
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
    actionTree.value = [] as ActionRecordRaw[];
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
  actions: ActionRecordRaw[],
  key: Key | RecordName,
  field: 'id' | 'actionId' | 'title' = 'actionId'
): ActionRecordRaw | undefined => {
  let action: ActionRecordRaw;
  for (let i = 0, len = actions.length; i < len; i++) {
    if (actions[i][field] === key) {
      action = actions[i];
      return action;
    }
    if ('children' in actions[i]) {
      const p = findAction(
        (actions[i] as ActionRecordPageWithChildren | ActionRecordMenuWithChildren).children,
        key,
        field
      );
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
  actions: ActionRecordRaw[],
  key: Key | RecordName,
  field: 'id' | 'actionId' | 'title' = 'actionId',
): ActionRecordRaw[] | undefined => {
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
export const preprocessActionTree = (dataTree: any): ActionRecordRaw[] => {
  return dataTree.map((item: any) => {
    let action = {} as ActionRecordRaw;
    action.id = item.Id ?? '';
    action.pId = item.ParentId ?? '';
    action.actionId = item.actionId ?? '';
    action.title = item.Text ?? '';
    action.type = item.Type ?? (item.component ? MenuPageType.PAGE : MenuPageType.MENU);
    action.sort = Number(item.Sort)
    action.showInMenu = item.ShowInMenu ?? ShowInMenuType.SHOW;

    if (item.Url) {
      (action as ActionRecordPage | ActionRecordPageWithChildren).url = item.Url;
    }
    if (item.Component) {
      (action as ActionRecordPage | ActionRecordPageWithChildren).component = item.Component;
    }
    if (item.icon) {
      (action as ActionRecordMenu | ActionRecordMenuWithChildren).icon = item.icon;
    }
    if (item.Query) {
      (action as ActionRecordPage | ActionRecordPageWithChildren).query = JSON.parse(item.Query);
    }
    if (item.Children) {
      (action as ActionRecordPageWithChildren | ActionRecordMenuWithChildren).children = preprocessActionTree(item.Children);
    }
    return action;
  });
};
