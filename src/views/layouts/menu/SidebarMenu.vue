<script setup lang="ts">
import SubMenu from "@/views/layouts/menu/SubMenu.vue";
import type {MenuTreeNode, ActionItem} from "@/types";

const openKeys = ref([]);
const selectedKeys = ref([]);
const menuData = ref([] as MenuTreeNode[]);

const actionToMenu = (tree: ActionItem[]): MenuTreeNode[] => {
    return tree.map((item: ActionItem) => {
        let menuNode: MenuTreeNode = {
            key: item.menuId ?? item.id ?? '',
            label: item.title ?? item.menuId ?? item.id ?? '',
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

const {actionTree} = storeToRefs(useActionStore());

watch(actionTree, (tree: ActionItem[]) => {
    menuData.value = actionToMenu(tree);
}, {
    immediate: true,
});

const handleMenuClick = (item: MenuTreeNode, key: string, keyPath: any) => {
    console.log('handleMenuClick item', item);
    console.log('handleMenuClick key', key);
    console.log('handleMenuClick keyPath', keyPath);
}

const onOpenChange = (openKeys: (string | number)[]) => {
    console.log('onOpenChange openKeys', openKeys);
}

const onSelect = (item: MenuTreeNode, key: string, selectedKeys: any) => {
    console.log('onSelect item', item);
    console.log('onSelect key', key);
    console.log('onSelect selectedKeys', selectedKeys);
}

</script>

<template>
    <a-menu
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
