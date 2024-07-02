<script setup>
import { FormItem } from 'ant-design-vue';
import FormComponentMixin from "../FormComponentMixin.ts";

const props = defineProps({
  ...FormComponentMixin.props
})

const emit = defineEmits([...FormComponentMixin.emits])

</script>

<template>
  <FormItem label="字段KEY">
    <a-input v-model:value="config.key" placeholder="请输入字段唯一key值"/>
  </FormItem>
  <FormItem label="字段名称">
    <a-input v-model:value="config.name" placeholder="请设置字段名称"/>
  </FormItem>
  <FormItem label="提示文字">
    <a-input v-model:value="config.props.placeholder" placeholder="输入提示"/>
  </FormItem>
  <FormItem label="最大字数">
    <a-input-number :min="1" v-model:value="config.props.max"/>
  </FormItem>
  <FormItem label="隐藏名称">
    <a-switch v-model:checked="config.props.hideLabel"/>
  </FormItem>
  <FormItem label="是否必填">
    <a-switch v-model:checked="config.props.required"/>
  </FormItem>
</template>

<style lang="less" scoped>

</style>
