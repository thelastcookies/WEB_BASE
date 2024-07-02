<script setup lang="ts">
import type { TimePickerConfigProps } from "@/views/form/types";

const value = defineModel<string>('value');

const props = withDefaults(defineProps<TimePickerConfigProps>(), {
    ...componentCommonPropsDefault,
    ...dateTimeRangePickerConfigProps,
});

const type = computed(() => {
    switch (props.format) {
        case 'YYYY-MM-DD':
            return 'daterange'
        case 'YYYY-MM-DD HH:mm':
            return 'datetimerange'
        default:
            return 'daterange'
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
    <a-range-picker
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
