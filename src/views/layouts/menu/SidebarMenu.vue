<script setup lang="ts">
import type {ActionItem, Key, MenuTreeNode} from "@/types";
import type {MenuInfo, SelectInfo} from "ant-design-vue/es/menu/src/interface";

const openKeys = ref([]);
const selectedKeys = ref([] as string[]);

const menuData = ref([] as MenuTreeNode[]);

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
    routeTo({id: key});
}

const onOpenChange = (openKeys: (Key)[]) => {
    console.log('onOpenChange openKeys', openKeys);
}

const onSelect = ({selectedKeys}: SelectInfo) => {
    console.log('onSelect selectedKeys', selectedKeys);
}

const actionStore = useActionStore();
const {routeTo} = actionStore;
const {actionTree} = storeToRefs(actionStore);

watch(actionTree, (tree: ActionItem[]) => {
    menuData.value = actionToMenu(tree);
}, {
    immediate: true,
});

const {crtActiveMenu} = storeToRefs(useActionStore());
watch(crtActiveMenu, (action: ActionItem) => {
    selectedKeys.value = [action.menuId as string];
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

<style scoped lang="less">

</style>
