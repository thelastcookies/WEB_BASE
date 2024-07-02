<script setup lang="ts">
import type { SpanLayoutConfigProps, ComponentConfig } from "@/views/form/types";

withDefaults(defineProps<ComponentConfig>(), {
    props: () => {
        return { ...ComponentCommonPropsDefault };
    },
});

const emit = defineEmits<{
    (e: 'copy'): void;
    (e: 'delete'): void;
}>();

</script>

<template>
    <div style="position: relative; width: 100%;"
         :class="{'w-form-cp-active': false, 'w-border-no': !(props as SpanLayoutConfigProps)?.isContainer}">
        <div class="w-form-component" v-if="props.mode === 'design'">
            <div class="icon" @click="emit('copy')">
                <BaseIcon icon="CopyOutlined" />
            </div>
            <div class="icon" @click="emit('delete')">
                <BaseIcon icon="DeleteOutlined" />
            </div>
        </div>
        <component
            :is="FormComponents[type]"
            v-bind="props"
        />
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
