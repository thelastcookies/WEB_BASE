<script setup lang="ts">
import type { TimePickerConfigProps } from "@/views/form/types";

const value = defineModel<string>('value');

const props = withDefaults(defineProps<TimePickerConfigProps>(), {
    ...componentCommonPropsDefault,
    ...dateTimePickerConfigPropsDefault
});

const type = computed(() => {
    switch (props.format) {
        case 'YYYY':
            return 'year';
        case 'YYYY-MM':
            return 'month';
        case 'YYYY-MM-DD':
            return 'date';
        default:
            return 'date';
    }
});

const showTime = computed(() => {
    switch (props.format) {
        case 'YYYY-MM-DD HH':
            return { format: 'HH' };
        case 'YYYY-MM-DD HH:mm':
            return { format: 'HH:mm' };
        case 'YYYY-MM-DD HH:mm:ss':
            return { format: 'HH:mm:ss' };
        default:
            return false;
    }
});

</script>

<template>
    <a-date-picker
        v-model:value="value"
        allow-clear
        :value-format="format"
        :format="format"
        :show-time="showTime"
        :picker="type"
        :placeholder="placeholder"
        :size="size"
    />
</template>
