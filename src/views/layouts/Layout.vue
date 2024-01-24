<script setup lang="ts">
import {useRouterStore} from "@/stores/router.ts";
import {useUserStore} from "@/stores/user.ts";

const {getUserInfo} = useUserStore();
await getUserInfo();
const {generateRouterConf} = useRouterStore();
// 获取并生成路由配置
await generateRouterConf();
</script>

<template>

</template>

<style scoped lang="less">

</style>
