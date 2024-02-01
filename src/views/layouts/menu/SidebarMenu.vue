<script setup lang="ts">
import SubMenu from "@/views/layouts/menu/SubMenu.vue";
import type {MenuTreeNode, ActionItem} from "@/types";

const openKeys = [] as string[];
const selectedKeys = [] as string[];
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

</script>

<template>
    <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 256px"
        mode="inline"
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
