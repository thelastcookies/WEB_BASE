<script setup lang="ts">
import { a

-form - item
}
from
'ant-design-vue';
import { FormComponents } from "./FormComponents.ts";
import componentMixin from "./FormComponentMixin.ts";
import { computed } from "vue";

const props = defineProps({
  ...componentMixin.props,
  modelValue: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emit = defineEmits([...componentMixin.emits])
const _value = computed(componentMixin.computed._value(props, emit));

// const labelCol = computed(() => {
//   return {
//     style: {
//       width: props.config.conf.labelWidth + 'px'
//     }
//   }
// });

/**
 * 迁移时发生变化的属性：
 * a-form:
 *   label-width -> labelCol: { style: { width: '' } },
 *   ??? size: 从 a-from 迁移到 表单项
 *   label-position: 'left' | 'right' | 'top'
 *     -> layout: 'horizontal' | 'vertical' | 'inline'
 *     -> labelAlign: 'left' | 'right'
 *
 * a-form-item:
 *   prop -> name
 */
</script>

<template>
  <a-form
    :size="config.conf.size"
    :layout="config.conf.layout"
    :label-align="config.conf.labelAlign"
    class="w-form-render">
    <template v-for="(cp, i) in config.components" :key="cp.type + i">
      <a-form-item
        v-if="!cp.props.isContainer" :label="cp.name" :required="cp.props.required"
        :class="{'w-form-cp-nlb':cp.props.hideLabel}" :name="cp.key">
        <component
          :is="FormComponents[cp.type]"
          :mode="mode"
          :config="cp"
          v-model="_value[cp.key]"
        />
      </a-form-item>
      <component v-else :is="FormComponents[cp.type]" :mode="mode" v-model="_value" :config="cp" />
    </template>
  </a-form>
</template>

<style lang="less" scoped>

</style>
