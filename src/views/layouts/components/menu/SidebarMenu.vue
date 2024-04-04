<script setup lang="ts">
import type {ActionItem, Key, MenuTreeNode, RecordName} from "@/types";
import type {MenuInfo, SelectInfo} from "ant-design-vue/es/menu/src/interface";
import type {Ref} from "vue";
import type {RouteLocationNormalized} from "vue-router";

const openKeys = ref([]);
const selectedKeys = ref([] as string[]);

const actionToMenu = (tree: ActionItem[]): MenuTreeNode[] => {
    let menuTree = [] as MenuTreeNode[];
    for (const item of tree) {
        if (item.showInMenu !== ShowInMenuType.SHOW) continue;
        let menuNode: MenuTreeNode = {
            key: item.menuId ?? item.id ?? '',
            label: item.title ?? String(item.menuId) ?? String(item.id) ?? '',
            title: item.title,
        };
        if (item.icon) {
            menuNode.icon = item.icon;
        }
        if (item.children && item.children.filter(menu => menu.showInMenu === ShowInMenuType.SHOW).length > 0) {
            menuNode.children = actionToMenu(item.children);
        }
        menuTree.push(menuNode);
    }
    return menuTree;
};

const handleMenuClick = ({item, key, keyPath}: MenuInfo) => {
    console.log('handleMenuClick item', item);
    console.log('handleMenuClick key', key);
    ///////////
    console.log('handleMenuClick keyPath', keyPath);
    routeTo({name: key as string});
}

const onOpenChange = (openKeys: (Key)[]) => {
}

const onSelect = ({selectedKeys}: SelectInfo) => {
}

const actionStore = useActionStore();
const {actionTree} = storeToRefs(actionStore);

const activeMenu = ref() as Ref<ActionItem>;

// 订阅路由变化，设置活跃菜单项
listenRouteChange((route: RouteLocationNormalized) => {
    const ancestorChain = findActionAncestorChain(actionTree.value, route.name as RecordName);
    if (!ancestorChain || !ancestorChain.length) return;

    activeMenu.value = ancestorChain[0];
    const menuCouldBeSelected = ancestorChain.find(action => action.showInMenu === ShowInMenuType.SHOW);
    selectedKeys.value = [String(menuCouldBeSelected!.menuId)];
}, true);

onUnmounted(() => {
    removeRouteListener();
});

const menuData = ref([] as MenuTreeNode[]);
watch(actionTree, (tree: ActionItem[]) => {
    menuData.value = actionToMenu(tree);
}, {
    immediate: true,
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
        <template v-for="item in menuData" :key="item.key">
            <SubMenu :item="item"/>
        </template>
    </a-menu>
</template>
