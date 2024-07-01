<script setup>
import FormComponentMixin from "../FormComponentMixin.ts";
import {computed} from "vue";

const props = defineProps({
  ...FormComponentMixin.props
})
const emit = defineEmits([...FormComponentMixin.emits])
const _value = computed(FormComponentMixin.computed._value(props, emit))
</script>

<template>
  <a-input :placeholder="config.props.placeholder" v-model:value="_value" :size="size" />
</template>

<style scoped>

</style>
