<script setup lang="ts">
import type {ActionItem, Key, MenuTreeNode, RecordName} from "@/types";
import type {MenuInfo, SelectInfo} from "ant-design-vue/es/menu/src/interface";
import type {Ref} from "vue";
import type {RouteLocationNormalized} from "vue-router";

const openKeys = ref([]);
const selectedKeys = ref([] as string[]);

const actionToMenu = (tree: ActionItem[]): MenuTreeNode[] => {
    return tree.map((item: ActionItem) => {
        let menuNode: MenuTreeNode = {
            key: item.menuId ?? item.id ?? '',
            label: item.title ?? String(item.menuId) ?? String(item.id) ?? '',
            title: item.title,
        };
        if (item.icon) {
            menuNode.icon = item.icon;
        }
        if (item.children) {
            menuNode.children = actionToMenu(item.children);
        }
        return menuNode;
    });
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
const {findAction} = actionStore;
const {actionTree} = storeToRefs(actionStore);

const activeMenu = ref() as Ref<ActionItem>;

// 订阅路由变化，设置活跃菜单项
listenRouteChange((route: RouteLocationNormalized) => {
    activeMenu.value = findAction(actionTree.value, route.name as RecordName)!;
}, true);

onUnmounted(() => {
    removeRouteListener();
});

watch(activeMenu, (action: ActionItem) => {
    selectedKeys.value = [action.menuId as string];
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
        <template v-for="item in menuData">
            <template v-if="!item.showInMenu">
                <SubMenu :key="item!.key" :item="item"/>
            </template>
        </template>
    </a-menu>
</template>
