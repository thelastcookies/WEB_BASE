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

const routes = computed(() => {
  return breadcrumb.value.map(item => {
    return {
      path: "",
      breadcrumbName: item.title,
    };
  });
});

const router = useRouter();

// TODO 插槽迁移
// TODO title 和 back 的动态

</script>

<template>
  <a-page-header class="!py-4"
    :title="breadcrumb[breadcrumb.length - 1].title"
    :breadcrumb="{ routes }"
    :ghost="false"
    :backIcon="breadcrumb.length > 2"
    @back="router.go(-1)"
  />
</template>

<style scoped lang="less">

</style>
