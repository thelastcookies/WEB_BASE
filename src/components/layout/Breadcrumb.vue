<script setup lang="ts">
const {crtBreadcrumb} = storeToRefs(useActionStore());
</script>

<template>
    <a-breadcrumb h-54px lh-54px p-lr-24px class="breadcrumb-container">
        <template v-for="menu in crtBreadcrumb">
            <a-breadcrumb-item>{{ menu.title }}</a-breadcrumb-item>
        </template>
    </a-breadcrumb>
</template>

<style scoped lang="less">
.breadcrumb-container {
    background-color: var(--colorBgContainer);
}
</style>
