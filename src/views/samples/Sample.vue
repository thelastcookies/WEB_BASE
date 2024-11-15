<script setup lang="ts">
/**
 * Sample 页面用于开发时页面/组件的快速测试
 * 位于顶层路由，独立于系统存在
 */
import QueryFormSample from '@/views/samples/query-form/QueryFormSample.vue';
import EChartsSample from '@/views/samples/echarts/EChartsSample.vue';
import InlineEditTableSample from '@/views/samples/inline-edit-table/InlineEditTableSample.vue';
import UploadSample from '@/views/samples/upload/UploadSample.vue';
</script>
<template>
  <QueryFormSample />
  <a-divider>ECharts</a-divider>
  <EChartsSample />
  <a-divider>InlineEditTable</a-divider>
  <InlineEditTableSample></InlineEditTableSample>
  <a-divider>Upload</a-divider>
  <UploadSample />
</template>
<style scoped lang="less">

</style>
