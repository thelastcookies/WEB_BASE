<script setup lang="ts">
const appTitle = import.meta.env.APP_TITLE;
</script>

<template>
    <div class="w-full h-full flex-sb">
        <div class="h-full flex">
            <BaseIcon icon="/logo.svg" type="logo" :size="30"></BaseIcon>
            <span class="c-ant__white ml-12px font-size-18px font-700 tracking-wide">{{ appTitle }}</span>
        </div>
        <div class="h-full lh-3">
            <UserAvatar :size="24" />
        </div>
    </div>
</template>
