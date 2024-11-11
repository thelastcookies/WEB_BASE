<script setup lang="ts">
import type { RecordName } from '@/types';
import type { ActionRecordRaw } from '@/types/action';
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import type { RouteLocationNormalized } from 'vue-router';
import type { TreeNode } from '@/utils/tree';

const selectedKeys = ref([] as string[]);

const handleMenuClick = ({ key }: MenuInfo) => {
  selectedKeys.value = [key as string];
  routeTo({ name: key as string });
};

// Menu 初始化，来源自 actionTree
const { actionTree } = storeToRefs(useActionStore());
const menuStore = useMenuStore();
const { actionToMenu } = menuStore;
const { menu } = storeToRefs(menuStore);
watch(actionTree, (tree: TreeNode<ActionRecordRaw>[]) => {
  // 为防止一级菜单过多导致的样式问题，将一级菜单限制为 6 个以下
  if (tree.length > 6) {
    tree = tree.slice(0, 6);
    console.warn(`FooterMenu.vue: The length of menu in mobile exceeds the limit '6', the excess will be truncated.`);
  }
  menu.value = actionToMenu(tree);
}, {
  immediate: true,
});

// 设置菜单项宽度
const { width } = useWindowSize();
// -1px: 避免临界宽度时触发 overflow，导致样式异常
const menuItemWidth = width.value / menu.value.length - 1 + 'px';

// 订阅路由变化，设置活跃菜单项
listenRouteChange((route: RouteLocationNormalized) => {
  const ancestorChain = findActionAncestorChain(actionTree.value, route.name as RecordName);
  if (!ancestorChain || !ancestorChain.length) return;
  selectedKeys.value = [ancestorChain[ancestorChain.length - 1].actionId as string];
}, true);

onUnmounted(() => {
  removeRouteListener();
});

</script>
<template>
  <a-menu
    h-24 flex-sb
    v-model:selectedKeys="selectedKeys"
    mode="horizontal"
    @click="handleMenuClick"
  >
    <a-menu-item v-for="item in menu" :key="item.key" :style="{width: menuItemWidth}">
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

  .ant-menu-submenu::after {
    border-bottom-width: 0;
  }
}
</style>

