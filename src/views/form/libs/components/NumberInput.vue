<script setup>
import FormComponentMixin from "../FormComponentMixin.ts";

const props = defineProps({
  ...FormComponentMixin.props
})

/**
 * 无法对应到 Antdv 组件库的属性值：
 * :placeholder="config.props.placeholder"
 */
</script>

<template>
  <a-input-number :max="config.props.max" :min="config.props.min" :size="size" ></a-input-number>
</template>

<style scoped>

</style>
