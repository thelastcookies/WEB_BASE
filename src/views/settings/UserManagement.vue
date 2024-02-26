<script setup lang="ts">
import {getOperatorInfo} from "@/api/admin/home";

setTimeout(() => {
    getOperatorInfo();
}, 5000);
</script>

<template>
    UserManagement
    <async-comp></async-comp>
</template>

<style scoped lang="less">

</style>
