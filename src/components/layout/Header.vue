<script setup lang="ts">
const appTitle = import.meta.env.APP_TITLE;
</script>

<template>
    <div class="w-full h-full flex-sb">
        <div class="h-full flex">
            <BaseIcon icon="/logo.svg" type="logo" :size="32"></BaseIcon>
            <span class="header-title ml  font-700">{{ appTitle }}</span>
        </div>
        <div class="h-full lh-3">
            <UserAvatar :size="24" />
        </div>
    </div>
</template>

<style scoped lang="less">
.header-title {
    font-size: calc(var(--fontSizeHeading4) * 1px);
    color: var(--colorBgContainer);
}
</style>
