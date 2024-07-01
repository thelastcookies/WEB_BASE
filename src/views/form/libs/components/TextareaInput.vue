<script setup>
import { Textarea as ATextarea } from 'ant-design-vue';
import FormComponentMixin from "../FormComponentMixin.ts";

const props = defineProps({
  ...FormComponentMixin.props,

})

/**
 * 迁移时发生变化的属性：
 * show-word-limit -> show-count
 * rows -> auto-size
 */
</script>

<template>
  <a-textarea
    show-count type="textarea"
    :auto-size="{ minRows: 2, maxRows: 3 }"
    :maxlength="config.props.max || 255"
    :placeholder="config.props.placeholder"
    :size="size" />
</template>

<style scoped>

</style>
