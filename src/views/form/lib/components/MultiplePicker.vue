<script setup lang="ts">
import type { PickerConfigProps } from "@/views/form/types";
import { multiplePickerConfigPropsDefault } from "@/views/form/lib/components/index.ts";

const value = defineModel<string>('value');

withDefaults(defineProps<PickerConfigProps>(), {
    ...componentCommonPropsDefault,
    ...multiplePickerConfigPropsDefault,
});
</script>

<template>
    <a-checkbox-group
        v-if="expanding"
        v-model:value="value"
        :options="options"
        :size="size"
    />
    <a-select v-else mode="multiple" v-model:value="value" :size="size">
        <a-select-option v-for="op in options" :value="op">{{ op }}</a-select-option>
    </a-select>
</template>

