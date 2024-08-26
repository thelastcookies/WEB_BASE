<script setup lang="ts">
/**
 * Sample 页面用于开发时页面/组件的快速测试
 * 位于顶层路由，独立于系统存在
 */
import QueryFormSample from '@/views/samples/query-form/QueryFormSample.vue';
import EChartsSample from '@/views/samples/echarts/EChartsSample.vue';
import ActionTreeSample from "@/views/samples/action-tree/ActionTreeSample.vue";
</script>
<template>
  <QueryFormSample />
  <a-divider>ECharts</a-divider>
  <EChartsSample />
  <a-divider>ActionTree</a-divider>
  <ActionTreeSample />
</template>
<style scoped lang="less">

</style>
