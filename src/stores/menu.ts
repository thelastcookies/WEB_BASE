import type { MenuTreeNode } from "@/types";
import type { ActionRecordRaw } from "@/types/action";

export const useMenuStore = defineStore('menu', () => {
  const menu = ref([] as MenuTreeNode[]);

  const actionToMenu = (tree: ActionRecordRaw[]): MenuTreeNode[] => {
    let menuTree = [] as MenuTreeNode[];
    const treeSorted = tree.sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity));
    for (const item of treeSorted) {
      if (item.showInMenu !== ShowInMenuType.SHOW) continue;
      let menuNode: MenuTreeNode = {
        key: item.actionId ?? item.id ?? '',
        label: item.title ?? String(item.actionId) ?? String(item.id) ?? '',
        title: item.title,
      };
      if ('icon' in item) {
        menuNode.icon = item.icon;
      }
      if ('children' in item && item.children && item.children.filter(menu => menu.showInMenu === ShowInMenuType.SHOW).length > 0) {
        menuNode.children = actionToMenu(item.children);
      }
      menuTree.push(menuNode);
    }
    return menuTree;
  };

  return {
    menu,
    actionToMenu,
  }
});
