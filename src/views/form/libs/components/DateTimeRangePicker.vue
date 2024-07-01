<script setup>
import { RangePicker as ARangePicker } from 'ant-design-vue';
import FormComponentMixin from "../FormComponentMixin.ts";
import {computed} from "vue";

const props = defineProps({
  ...FormComponentMixin.props
})
const emit = defineEmits([...FormComponentMixin.emits])
const _value = computed(FormComponentMixin.computed._value(props, emit))

const type = computed(() => {
  switch (props.config.props.format) {
    case 'YYYY-MM-DD':
      return 'daterange'
    case 'YYYY-MM-DD HH:mm':
      return 'datetimerange'
    default:
      return 'daterange'
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
 *
 * 无法对应到 Antdv 组件库的属性：
 * start-placeholder
 * end-placeholder
 */
</script>

<template>
  <a-range-picker
    v-model:value="_value"
    allow-clear
    :value-format="config.props.format"
    :format="config.props.format"
    :show-time="showTime"
    :picker="type"
    :size="size"
  />
</template>

<style scoped>

</style>
