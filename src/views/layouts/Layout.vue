<script setup lang="ts">
import {message} from "ant-design-vue";

onMounted(() => {
    message.destroy();
});
</script>

<template>
    <a-layout w-full h-full>
        <a-layout-header class="header" flex>
            <BaseIcon icon="CodeOutlined" :size="40"></BaseIcon>
            <UserAvatar></UserAvatar>
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
.ant-layout-header {
    background-color: #fff;
}
</style>
