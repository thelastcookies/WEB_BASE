<script setup lang="ts">
import type { Key, RecordName } from '@/types';
import type { ActionRecordRaw } from '@/types/action';
import type { MenuInfo, SelectInfo } from 'ant-design-vue/es/menu/src/interface';
import type { RouteLocationNormalized } from 'vue-router';
import type { TreeNode } from '@/utils/tree';

const openKeys = ref([] as string[]);
const selectedKeys = ref([] as string[]);

const handleMenuClick = ({ key }: MenuInfo) => {
  routeTo({ name: key as string });
};

const onOpenChange = (openKeys: (Key)[]) => {
};

const onSelect = ({ selectedKeys }: SelectInfo) => {
};

// Menu 初始化，来源自 actionTree
const { actionTree } = storeToRefs(useActionStore());
const menuStore = useMenuStore();
const { actionToMenu } = menuStore;
const { menu } = storeToRefs(menuStore);
watch(actionTree, (tree: TreeNode<ActionRecordRaw>[]) => {
  menu.value = actionToMenu(tree);
}, {
  immediate: true,
});

// 订阅路由变化，设置活跃菜单项
listenRouteChange((route: RouteLocationNormalized) => {
  const ancestorChain = findActionAncestorChain(actionTree.value, route.name as RecordName);
  if (!ancestorChain || !ancestorChain.length) return;

  const indexMenuSelectable = ancestorChain.findIndex(action => action.showInMenu === true);
  selectedKeys.value = [String(ancestorChain[indexMenuSelectable]!.actionId)];
  const parentMenuIndex = indexMenuSelectable + 1 < ancestorChain.length ? indexMenuSelectable + 1 : indexMenuSelectable;
  openKeys.value = [String(ancestorChain[parentMenuIndex].actionId)];
}, true);

onUnmounted(() => {
  removeRouteListener();
});

</script>

<template>
  <a-menu
    h-full
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="handleMenuClick"
    @openChange="onOpenChange"
    @select="onSelect"
  >
    <template v-for="item in menu" :key="item.key">
      <SubMenu :item="item" />
    </template>
  </a-menu>
</template>
