<script setup lang="ts">
import type { ComponentConfig, ComponentConfigProps } from "@/views/form/types";

withDefaults(defineProps<{
    active: boolean;
    config: ComponentConfig<ComponentConfigProps>;
}>(), {
    active: false,
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
    <div class="w-full relative">
        <component
            :is="FormComponents[config.type]"
            v-bind="config.props"
        />
        <div class="component-tools" v-if="active && config.props && config.mode === 'edit'">
            <a-tooltip>
                <template #title>复制</template>
                <div class="icon" @click.stop="emit('copy')">
                    <BaseIcon icon="CopyOutlined" />
                </div>
            </a-tooltip>
            <a-tooltip>
                <template #title>删除</template>
                <div class="icon" @click.stop="emit('delete')">
                    <BaseIcon icon="DeleteOutlined" />
                </div>
            </a-tooltip>
        </div>
    </div>
</template>

<style scoped lang="less">
.component-tools {
    position: absolute;
    top: -13px;
    right: -13px;
    display: flex;

    .icon {
        padding: 0 0.25rem;
        cursor: pointer;
        background: var(--colorPrimaryActive);

        &:first-child {
            border-radius: 0 0 0 0.5rem;

        }

        &:last-child {
            border-radius: 0 0.5rem 0 0;
        }

        &:hover {
            background: var(--colorPrimaryHover);
        }
    }
}
</style>
