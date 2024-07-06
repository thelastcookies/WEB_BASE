<script setup lang="ts">
import type { RecordName } from "@/types";
import type { ActionRecordRaw } from "@/types/action";
import type { RouteLocationNormalized } from "vue-router";

const actionStore = useActionStore();
const { actionTree } = storeToRefs(actionStore);

const breadcrumb = ref([] as ActionRecordRaw[]);
// 订阅路由变化，设置面包屑
listenRouteChange((route: RouteLocationNormalized) => {
  const ancestorChain = findActionAncestorChain(actionTree.value, route.name as RecordName);
  if (!ancestorChain || !ancestorChain.length) return;
  breadcrumb.value = ancestorChain.reverse();
}, true);

onUnmounted(() => {
  removeRouteListener();
});
</script>

<template>
  <a-breadcrumb h-54px lh-54px p-lr-normal bg-ant.bg-container>
    <template v-for="menu in breadcrumb">
      <a-breadcrumb-item>{{ menu.title }}</a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>
