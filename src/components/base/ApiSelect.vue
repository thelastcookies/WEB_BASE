<script setup lang="ts">
import type { DefaultOptionType } from 'ant-design-vue/es/vc-select/Select';
import type { SelectValue } from 'ant-design-vue/es/select';
import { useAttrs } from 'vue';

const value = defineModel<SelectValue>('value');
const apiOptions = ref<DefaultOptionType[]>();

const attrs = useAttrs();

const getOptions = async () => {
  if (attrs.getOptions instanceof Function) {
    apiOptions.value = await attrs.getOptions();
  } else {
    console.warn(`ApiSelect: 'getOptions' property should not be empty.`);
  }
};
getOptions();

</script>

<template>
  <a-select v-bind="$attrs" v-model:value="value" :options="apiOptions" />
</template>
