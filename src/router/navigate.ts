import type {RouteToInfo} from "@/types";
import type {RouteLocationRaw} from "vue-router";

const actionStore = useActionStore();
const {findAction} = actionStore;
const {actionTree} = storeToRefs(actionStore);

export const routeTo = (routeToInfo: RouteToInfo) => {
    let actionId = routeToInfo.name;
    // 使用原生 pageId 取得路由配置信息
    const action = findAction(actionTree.value, actionId);
    if (!action) {
        console.error(`ActionStore "routeTo": Cannot find action by id: ${String(actionId)}.`);
        return;
    }
    // 如果是外链页面，则直接跳转
    if (action.type === MenuPageType.LINK) {
        window.open(action.url);
        return;
    }
    // 路由配置中页面没有配置实际组件，只作为菜单结构存在
    if (!action.component && !action.url?.startsWith('/redirect')) {
        console.warn(`ActionStore "routeTo": Cannot find 'component' in action: ${String(actionId)}.`);
        return;
    }
    // 构建 Route
    let route: RouteLocationRaw;
    route = {name: action.menuId as string};
    if (routeToInfo.params) {
        Object.assign(route, {params: routeToInfo.params});
    }
    router.push(route);
};
