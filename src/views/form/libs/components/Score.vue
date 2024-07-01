<script setup>
import { Rate } from 'ant-design-vue';
import FormComponentMixin from "../FormComponentMixin.ts";
import { computed } from "vue";
import { EyeFilled, HeartFilled, LikeFilled, StarFilled, TrophyFilled } from "@ant-design/icons-vue";

const props = defineProps({
  ...FormComponentMixin.props,
})
const emit = defineEmits([...FormComponentMixin.emits])
const _value = computed(FormComponentMixin.computed._value(props, emit))

// const icon = computed(() => {
//   const ico = props.config.props.icon
//   return [ico, ico, ico]
// })
//
// const color = computed(() => {
//   const icoColor = props.config.props.color
//   return [icoColor, icoColor, icoColor]
// })

/**
 * 迁移时发生变化的属性：
 * clearable -> allow-clear
 * max -> count
 * icons -> character
 *
 * 无法对应到 Antdv 组件库的属性：
 * show-score
 * text-color
 * colors
 */
</script>

<template>
    <template v-if="props.config.props.icon === 'Star'">
      <Rate :allow-half="config.props.enableHalf" allow-clear
              :count="config.props.max" v-model:value="_value">
        <template #character><StarFilled/></template>
      </Rate>
    </template>
    <template v-else-if="props.config.props.icon === 'Eye'">
      <Rate :allow-half="config.props.enableHalf" allow-clear
            :count="config.props.max" v-model:value="_value">
        <template #character><EyeFilled/></template>
      </Rate>
    </template>
    <template v-else-if="props.config.props.icon === 'Heart'">
      <Rate :allow-half="config.props.enableHalf" allow-clear
            :count="config.props.max" v-model:value="_value">
        <template #character><HeartFilled/></template>
      </Rate>
    </template>
    <template v-else-if="props.config.props.icon === 'Trophy'">
      <Rate :allow-half="config.props.enableHalf" allow-clear
            :count="config.props.max" v-model:value="_value">
        <template #character><TrophyFilled/></template>
      </Rate>
    </template>
    <template v-else-if="props.config.props.icon === 'Like'">
      <Rate :allow-half="config.props.enableHalf" allow-clear
            :count="config.props.max" v-model:value="_value">
        <template #character><LikeFilled/></template>
      </Rate>
    </template>
</template>

<style scoped>

</style>
