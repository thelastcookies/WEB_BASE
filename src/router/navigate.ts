import type { RecordName, RouteToRecordRaw } from "@/types";
import type { ActionRecordRaw, ActionRecordLink } from "@/types/action";
import type { RouteLocationRaw } from "vue-router";

const actionStore = useActionStore();
const { actionTree } = storeToRefs(actionStore);

export const routeTo = (props: RouteToRecordRaw) => {
  return new Promise<ActionRecordRaw>((resolve, reject) => {
    const actionId = typeof props === "object" ? props.name : props;
    const action = findAction(actionTree.value, actionId);
    if (!action) {
      const err = `Router.navigate "routeTo": Cannot find action by id: ${String(actionId)}.`
      console.error(err);
      reject(Error(err));
    } else if (action.type === MenuPageType.LINK) {
      // 如果是外链页面，则直接跳转
      window.open((action as ActionRecordLink).url);
      resolve(action);
    } else if (action.type === MenuPageType.MENU) {
      // 如果是菜单页面，则找寻其直系子节点，直到某一个子节点配置了可跳转的页面
      const descendant = findDescendantWithUrlDefined(action);
      if (descendant) {
        resolve(routeTo({ name: descendant.actionId as RecordName }));
      } else {
        reject(Error(`Router.navigate "routeTo": Cannot find any descendants with a 'url' attribute defined in the action with id: ${String(actionId)}.`))
      }
    } else {
      // 构建 Route
      let route: RouteLocationRaw;
      route = { name: action.actionId as RecordName };
      typeof props === "object" && props.params && Object.assign(route, { params: props.params });
      router.push(route);
      resolve(action);
    }
  });
};
