<script setup lang="ts">
import type { ComponentConfig, ComponentConfigProps } from "@/views/form/types";

withDefaults(defineProps<{
    index: number,
    config: ComponentConfig<ComponentConfigProps>,
}>(), {
    index: 0,
    config: () => {
        return {
            name: "单行输入框",
            type: "TextInput",
            props: { ...componentCommonPropsDefault },
        }
    }
});

const emit = defineEmits<{
    (e: 'copy'): void;
    (e: 'delete'): void;
}>();

</script>

<template>
    <div class="w-full relative"
         :class="{'w-form-cp-active': true,}">
        <component
            :is="FormComponents[config.type]"
            v-bind="config.props"
        />
        <div class="w-form-component" v-if="config.props && config.props.mode === 'design'">
            <div class="icon" @click="emit('copy')">
                <BaseIcon icon="CopyOutlined" />
            </div>
            <div class="icon" @click="emit('delete')">
                <BaseIcon icon="DeleteOutlined" />
            </div>
        </div>
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
