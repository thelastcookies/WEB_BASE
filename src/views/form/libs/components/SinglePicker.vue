<script setup>
import { RadioGroup as ARadioGroup, Radio as ARadio }  from "ant-design-vue";
import FormComponentMixin from "../FormComponentMixin.ts";
import {computed} from "vue";

const props = defineProps({
  ...FormComponentMixin.props
})
const emit = defineEmits([...FormComponentMixin.emits])
const _value = computed(FormComponentMixin.computed._value(props, emit))
</script>

<template>
  <a-radio-group v-if="config.props.expanding" v-model:value="_value" :size="size" >
    <a-radio v-for="(op, i) in config.props.options" :value="op">{{ op }}</a-radio>
  </a-radio-group>
  <a-select v-else v-model:value="_value">
    <a-select-option v-for="(op, i) in config.props.options" :value="op" :size="size" >{{ op }}</a-select-option>
  </a-select>
</template>

<style scoped>

</style>
