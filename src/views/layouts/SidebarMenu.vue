<script setup lang="ts">
import type {ActionItem} from "@/router/types.ts";
import type {ItemType} from "ant-design-vue";
import type {MenuItemType, SubMenuType} from "ant-design-vue/es/menu/src/hooks/useItems";
import type {VNode} from "vue";

const openKeys = [] as string[];
const selectedKeys = [] as string[];
const menuData = ref([] as ItemType[]);

// @ts-ignore
interface MenuItemTypeEx extends MenuItemType {
    icon?: string | VNode | ((item: MenuItemType) => VNode);
}

const actionToMenu = (tree: ActionItem[]) => {
    return tree.map((item: ActionItem) => {
        let menuNode: ItemType = {
            key: item.menuId ?? item.id ?? '',
            label: item.title,
            title: item.title,
        };
        if (item.icon) {
            (menuNode as MenuItemTypeEx).icon = item.icon;
        }
        if (item.children) {
            (menuNode as SubMenuType).children = actionToMenu(item.children);
        }
        return menuNode;
    });
};

const {actionTree} = storeToRefs(useActionStore());

watch(actionTree, (tree: ActionItem[]) => {
    menuData.value = actionToMenu(tree);
}, {
    immediate: true
});

</script>

<template>
    <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 256px"
        mode="inline"
        :items="menuData"
    ></a-menu>
    <!--    <a-menu-->
    <!--        :selected-keys="selectedKeys"-->
    <!--        :open-keys="collapsed ? [] : openKeys"-->
    <!--        :mode="(layout === 'top' && !isMobile) ? 'horizontal' : 'inline'"-->
    <!--        :theme="menuTheme"-->
    <!--        :collapsed="collapsed"-->
    <!--        class="ant-pro-sider-menu"-->
    <!--        @update:open-keys="handleOpenKeys"-->
    <!--        @update:selected-keys="handleSelectedKeys"-->
    <!--        @select="handleMenuSelect"-->
    <!--    >-->
    <!--        <template v-for="item in selectedMenus">-->
    <!--            <template v-if="!item.hideInMenu">-->
    <!--                <SubMenu :key="item.path" :item="item" />-->
    <!--            </template>-->
    <!--        </template>-->
    <!--    </a-menu>-->
</template>

<style scoped lang="less">

</style>
