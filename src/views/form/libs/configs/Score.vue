<script setup>
import { RadioGroup, RadioButton } from 'ant-design-vue';
import { FormItem } from 'ant-design-vue';
import FormComponentMixin from "../FormComponentMixin.ts";
import { StarFilled, EyeFilled, TrophyFilled, LikeFilled, HeartFilled } from '@ant-design/icons-vue';

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
  <FormItem label="图标设置">
    <RadioGroup size="small" v-model:value="config.props.icon">
      <RadioButton value="Star"><StarFilled/></RadioButton>
      <RadioButton value="Eye"><EyeFilled /></RadioButton>
      <RadioButton value="Heart"><HeartFilled /></RadioButton>
      <RadioButton value="Trophy"><TrophyFilled /></RadioButton>
      <RadioButton value="Like"><LikeFilled /></RadioButton>
    </RadioGroup>
  </FormItem>
  <FormItem label="最大分值">
    <a-input-number :min="0" :max="20" v-model:value="config.props.max"/>
  </FormItem>
<!--  <FormItem label="显示分值">-->
<!--    <el-switch v-model:value="config.props.showScore"/>-->
<!--  </FormItem>-->
  <FormItem label="允许半分">
    <a-switch v-model:checked="config.props.enableHalf"/>
  </FormItem>
<!--  <FormItem label="图标颜色">-->
<!--    <el-color-picker v-model:value="config.props.color"/>-->
<!--  </FormItem>-->
  <FormItem label="隐藏名称">
    <a-switch v-model:checked="config.props.hideLabel"/>
  </FormItem>
  <FormItem label="是否必填">
    <a-switch v-model:checked="config.props.required"/>
  </FormItem>
</template>

<style lang="less" scoped>

</style>
