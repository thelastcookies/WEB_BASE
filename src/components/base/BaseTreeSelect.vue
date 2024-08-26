<script setup lang="ts">
import { useAttrs } from 'vue';
import type { SelectValue } from 'ant-design-vue/es/select';
import type { DefaultOptionType } from 'ant-design-vue/es/vc-tree-select/TreeSelect';

const value = defineModel<SelectValue>('value');
const _treeData = ref<DefaultOptionType[]>();

const attrs = useAttrs();

const getOptions = async () => {
  if (attrs.getTreeData instanceof Function) {
    _treeData.value = await attrs.getTreeData();
  } else if (attrs.treeData instanceof Array) {
    _treeData.value = attrs.treeData;
  } else {
    console.warn(`BaseTreeSelect: Either 'treeData' or 'getTreeData' should not be empty.`);
  }
};
getOptions();
</script>

<template>
  <a-tree-select
    :maxTagCount="3"
    :allowClear="true"
    :showSearch="true"
    :showArrow="true"
    treeNodeFilterProp="title"
    placeholder="请选择"
    v-bind="$attrs"
    v-model:value="value"
    :treeData="_treeData" />
</template>

<style scoped lang="less">

</style>
