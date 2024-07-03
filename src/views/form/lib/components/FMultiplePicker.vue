<script setup lang="ts">
import type { PickerConfigProps } from "@/views/form/types";

const value = defineModel<string>('value');

withDefaults(defineProps<PickerConfigProps>(), {
    ...multiplePickerConfigPropsDefault,
});
</script>

<template>
    <a-checkbox-group v-if="expanding" v-model:value="value" :size="size">
        <a-checkbox v-for="op in options" :value="op">{{ op }}</a-checkbox>
    </a-checkbox-group>
    <a-select v-else mode="multiple" v-model:value="value" :size="size" :placeholder="placeholder">
        <a-select-option v-for="op in options" :value="op">{{ op }}</a-select-option>
    </a-select>
</template>

