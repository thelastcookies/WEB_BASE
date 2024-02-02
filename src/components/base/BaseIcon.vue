<script setup lang="ts">
import * as icons from '@ant-design/icons-vue';
import type {VNodeChild} from 'vue';

const props = withDefaults(defineProps<{
    icon: string | ((...args: any[]) => VNodeChild),
    size: number
}>(), {
    size: 14
});
const iconComp = computed(() => {
    if (typeof (props.icon) === 'function') {
        const node = props.icon();
        if (node) {
            return node;
        }
    } else {
        return (icons as any)[props.icon];
    }
});
</script>

<template>
    <component :is="iconComp" v-if="icon" :style="{
        fontSize: size + 'px',
        lineHeight: size + 'px'
        }"/>
</template>
