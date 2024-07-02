<script setup>
import { FormItem } from 'ant-design-vue';
import FormComponentMixin from "../FormComponentMixin.ts";
import {VueDraggable} from "vue-draggable-plus";
import { DeleteOutlined, DragOutlined, PlusOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  ...FormComponentMixin.props
})

const emit = defineEmits([...FormComponentMixin.emits])

function addOption() {
  props.config.props.options.push(`选项${props.config.props.options.length + 1}`)
}

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
  <FormItem label="选项设置">
    <a-button style="margin: 7px" type="link" @click="addOption">
      <template #icon><PlusOutlined /></template>
      添加选项
    </a-button>
    <vue-draggable class="w-fd-options" handle=".w-move" :animation="150" v-model="config.props.options">
      <a-input v-for="(option, i) in config.props.options" v-model:value="config.props.options[i]">
        <template #addonBefore>
          <DragOutlined/>
        </template>
        <template #addonAfter>
          <a-button @click="config.props.options.splice(i, 1)">
            <template #icon><DeleteOutlined /></template>
          </a-button>
        </template>
      </a-input>
    </vue-draggable>
  </FormItem>
  <FormItem label="选项展开">
    <a-switch v-model:checked="config.props.expanding"/>
  </FormItem>
  <FormItem label="隐藏名称">
    <a-switch v-model:checked="config.props.hideLabel"/>
  </FormItem>
  <FormItem label="是否必填">
    <a-switch v-model:checked="config.props.required"/>
  </FormItem>
</template>

<style lang="less" scoped>
:deep(.w-fd-options) {
  .el-input-group__append, .el-input-group__prepend {
    padding: 0 10px;
  }
}

.w-move {
  cursor: move;
}
</style>
