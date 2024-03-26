<script setup lang="ts">
const {crtBreadcrumb} = storeToRefs(useActionStore());
</script>

<template>
    <a-breadcrumb h-36px lh-36px>
        <template v-for="menu in crtBreadcrumb">
            <a-breadcrumb-item>{{ menu.title }}</a-breadcrumb-item>
        </template>
    </a-breadcrumb>
</template>
