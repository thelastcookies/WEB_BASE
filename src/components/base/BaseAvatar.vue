<script setup lang="ts">
import {useUserStore} from "@/stores/user.ts";

const userStore = useUserStore();
const realName = computed(() => userStore.userInfo ? userStore.userInfo.realName?.slice(0, 1): '');
</script>

<template>
    <a-avatar :size="40" style="color: #f56a00; background-color: #fde3cf">{{ realName }}</a-avatar>
</template>

<style scoped lang="less">

</style>
