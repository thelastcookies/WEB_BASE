<script setup lang="ts">
import type { MenuTreeNode, RecordName } from "@/types";
import type { ActionRecordRaw } from "@/types/action";
import type { MenuInfo } from "ant-design-vue/es/menu/src/interface";
import type { RouteLocationNormalized } from "vue-router";

const selectedKeys = ref([] as string[]);

const actionToMenu = (tree: ActionRecordRaw[]): MenuTreeNode[] => {
  let menuTree = [] as MenuTreeNode[];
  for (const item of tree) {
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

const handleMenuClick = ({ key }: MenuInfo) => {
  selectedKeys.value = [key as string];
  routeTo({ name: key as string });
};

const actionStore = useActionStore();
const { actionTree } = storeToRefs(actionStore);

// 订阅路由变化，设置活跃菜单项
listenRouteChange((route: RouteLocationNormalized) => {
  const ancestorChain = findActionAncestorChain(actionTree.value, route.name as RecordName);
  if (!ancestorChain || !ancestorChain.length) return;
  selectedKeys.value = [ancestorChain[ancestorChain.length - 1].actionId as string];
}, true);

onUnmounted(() => {
  removeRouteListener();
});

const menuData = ref([] as MenuTreeNode[]);
watch(actionTree, (tree: ActionRecordRaw[]) => {
  // 为防止一级菜单过多导致的样式问题，将一级菜单限制为 6 个以下
  if (tree.length > 6) tree = tree.slice(0, 6);
  menuData.value = actionToMenu(tree);
}, {
  immediate: true,
});

// 设置菜单项宽度
const { width } = useWindowSize();
// -1px: 避免临界宽度时触发 overflow，导致样式异常
const menuItemWidth = width.value / menuData.value.length - 1 + 'px';

</script>
<template>
  <a-menu
    h-24 flex-sb
    v-model:selectedKeys="selectedKeys"
    mode="horizontal"
    @click="handleMenuClick"
  >
    <a-menu-item v-for="item in menuData" :key="item.key" :style="{width: menuItemWidth}">
      <template v-if="item.icon" #icon>
        <BaseIcon :icon="item.icon" size="1.5" />
      </template>
      {{ item.title }}
    </a-menu-item>
  </a-menu>
</template>


<style scoped lang="less">
.ant-menu {
  :deep(.ant-menu-item) {
    --uno: h-full flex-c flex-col justify-evenly pb-4;

    &:after {
      border-bottom-width: 0 !important;
    }

    .ant-menu-title-content {
      --uno: m-0 lh-4;
    }
  }

  :deep(.ant-menu-submenu::after) {
    border-bottom-width: 0;
  }
}
</style>

