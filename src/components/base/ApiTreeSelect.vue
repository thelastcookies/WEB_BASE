<script setup lang="ts">
import type { SelectValue } from 'ant-design-vue/es/select';
import type { DefaultOptionType } from 'ant-design-vue/es/vc-tree-select/TreeSelect';
import { useAttrs } from 'vue';

const value = defineModel<SelectValue>('value');
const apiOptions = ref<DefaultOptionType[]>();

const attrs = useAttrs();

const getOptions = async () => {
  if (attrs.getOptions instanceof Function) {
    apiOptions.value = await attrs.getOptions();
  } else {
    console.warn(`ApiTreeSelect: 'getOptions' property should not be empty.`);
  }
};
getOptions();
</script>

<template>
  <a-tree-select v-bind="$attrs" v-model:value="value" :treeData="apiOptions" />
</template>
