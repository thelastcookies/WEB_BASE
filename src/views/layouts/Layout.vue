<script setup lang="ts">
import SidebarMenu from "@/views/layouts/menu/SidebarMenu.vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import BaseAvatar from "@/components/base/BaseAvatar.vue";


</script>

<template>
    <a-layout>
        <a-layout-header class="header">
            <BaseIcon icon="DashboardOutlined" size="40"></BaseIcon>
            <BaseAvatar></BaseAvatar>
        </a-layout-header>
        <a-layout>
            <a-layout-sider style="background: #fff">
                <SidebarMenu></SidebarMenu>
            </a-layout-sider>
            <a-layout style="padding: 0 24px 24px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>Home</a-breadcrumb-item>
                    <a-breadcrumb-item>List</a-breadcrumb-item>
                    <a-breadcrumb-item>App</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content
                    :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
                >
                    Content
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<style scoped lang="less">

</style>
