<script setup>
import componentMixin from "../FormComponentMixin.ts";
import {FormComponents} from "../FormComponents.ts";
import {computed} from "vue";
import {copyField, delField} from "@/utils/GlobalFunc.ts";
import {CopyOutlined, DeleteOutlined} from '@ant-design/icons-vue';

const props = defineProps({
  ...componentMixin.props,
  type: String,
  size: String,
  modelValue: { //组件值
    default: undefined
  },
  parents: { //本组件所在的组件列表
    default: () => {
      return []
    }
  },
  index: Number //本组件所在列表parents的索引位置
})

const emit = defineEmits([...componentMixin.emits])
const _value = computed(componentMixin.computed._value(props, emit))
const _active = computed(componentMixin.computed._active(props, emit))
const showActive = computed(() => {
 return _active.value?.id === props.config.id
     && props.mode === 'free'
})

</script>

<template>
  <div style="position: relative; width: 100%;"
       :class="{'w-form-cp-active': showActive, 'w-border-no': !config.props.isContainer}">
<!--    <div class="w-form-component" v-if="mode === 'free'">-->
    <div class="w-form-component">
      <div class="icon" @click="copyField(parents, index)"><CopyOutlined /></div>
      <div class="icon" @click="delField(parents, index)"><DeleteOutlined /></div>
    </div>
    <component :config="config" v-model="_value" :is="FormComponents[type]" :size="size"
               :mode="mode" v-model:active="_active" />
  </div>
</template>

<style scoped lang="less">

.w-border-no {
  border: none !important;
}

.w-form-component {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 9;
  display: none;
  border-radius: 5px 0 0 0;
  overflow: hidden;

  .icon {
    //width: 24px;
    //height: 24px;
    //line-height: 24px;
    padding: 0 5px;
    cursor: pointer;
    color: #FFF;
    background: var(--el-color-primary);
    &:hover {
      background: var(--el-color-primary-light-3);
    }
  }
}
.w-form-cp-active {
  .w-form-component {
    display: flex;
  }
}
</style>
