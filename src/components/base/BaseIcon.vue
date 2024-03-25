<script setup lang="ts">
import * as icons from '@ant-design/icons-vue';
import type {VNodeChild} from 'vue';

const props = withDefaults(defineProps<{
    icon: string | ((...args: any[]) => VNodeChild),
    type?: 'antdv' | 'image',
    size?: number | string
}>(), {
    size: 14,
    type: 'antdv',
});
const iconComp = computed(() => {
    if (props.type === 'antdv') {
        if (typeof (props.icon) === 'function') {
            const node = props.icon();
            if (node) {
                return node;
            }
        } else {
            return (icons as any)[props.icon];
        }
    }
});

const sizeStyle = computed(() => {
    return {
        height: `${props.size}px`,
        width: `${props.size}px`,
        'line-height': `${props.size}px`,
        'font-size': `${props.size}px`,
    }
});

const iconUrl = computed(() => {
    let url = props.icon as string;
    if (url.startsWith('/')) {
        return url.replace("/", "");
    } else if (url.startsWith('~')) {
        url = url.replace("~/", "");
        return new URL(`../../assets/images/${url}`, import.meta.url).href;
    } else {
        return '';
    }
});

</script>

<template>
    <template v-if="type === 'antdv'">
        <component v-bind="$attrs" :is="iconComp" v-if="icon" :style="{
            fontSize: size + 'px',
            lineHeight: size + 'px'
        }"/>
    </template>
    <template v-else>
        <img
            v-bind="$attrs"
            :style="[sizeStyle]"
            :src="iconUrl" alt="icon" />
    </template>
</template>
