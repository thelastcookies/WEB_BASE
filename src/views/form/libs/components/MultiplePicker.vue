<script setup>
import { CheckboxGroup as ACheckboxGroup } from 'ant-design-vue';
import FormComponentMixin from "../FormComponentMixin.ts";
import {computed} from "vue";

const props = defineProps({
  ...FormComponentMixin.props
})
const emit = defineEmits([...FormComponentMixin.emits])
const _value = computed(FormComponentMixin.computed._value(props, emit))

/**
 * 迁移时发生变化的属性：
 * multiple -> mode: multiple
 */
</script>

<template>
  <a-checkbox-group
    v-if="config.props.expanding"
    v-model:value="_value"
    :options="config.props.options"
    :size="size"
  />
  <a-select v-else mode="multiple" v-model:value="_value" :size="size" >
    <a-select-option v-for="(op, i) in config.props.options" :value="op">{{ op }}</a-select-option>
  </a-select>
</template>

<style scoped>

</style>
