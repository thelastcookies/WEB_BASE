<script setup lang="ts">
import { DatePicker as ADatePicker } from 'ant-design-vue';
import FormComponentMixin from '../FormComponentMixin.ts';
import { computed } from 'vue';

const props = defineProps({
  ...FormComponentMixin.props,
});
const emit = defineEmits([...FormComponentMixin.emits]);
const _value = computed(FormComponentMixin.computed._value(props, emit));

const type = computed(() => {
  switch (props.config.props.format) {
    case 'YYYY':
      return 'year';
    case 'YYYY-MM':
      return 'month';
    case 'YYYY-MM-DD':
      return 'date';
    default:
      return 'date';
  }
});

const showTime = computed(() => {
  switch (props.config.props.format) {
    case 'YYYY-MM-DD HH':
      return { format: 'HH' };
    case 'YYYY-MM-DD HH:mm':
      return { format: 'HH:mm' };
    case 'YYYY-MM-DD HH:mm:ss':
      return { format: 'HH:mm:ss' };
    default:
      return false;
  }
});

/**
 * 迁移时发生变化的属性：
 * clearable -> allow-clear
 * type: year|month|date|datetime -> picker:year|month|date 与 showTime 组合
 */
</script>

<template>
  <a-date-picker
    v-model:value="_value"
    :value-format="config.props.format"
    :format="config.props.format"
    :show-time="showTime"
    allow-clear
    :picker="type"
    :placeholder="config.props.placeholder"
    :size="size"
  />
</template>

<style scoped></style>
