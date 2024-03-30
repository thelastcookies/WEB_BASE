<script setup lang="ts">
const {crtBreadcrumb} = storeToRefs(useActionStore());
</script>

<template>
    <a-breadcrumb h-54px lh-54px p-lr-24px bg-ant__bg-container>
        <template v-for="menu in crtBreadcrumb">
            <a-breadcrumb-item>{{ menu.title }}</a-breadcrumb-item>
        </template>
    </a-breadcrumb>
</template>
