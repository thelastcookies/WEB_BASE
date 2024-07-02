<script setup lang="ts">
import type { PickerConfigProps } from "@/views/form/types";

const value = defineModel<string>('value');

withDefaults(defineProps<PickerConfigProps>(), {
    ...ComponentCommonPropsDefault,
    expanding: false,
    options: () => ['选项1', '选项2'],
});
</script>

<template>
    <a-radio-group v-if="expanding" v-model:value="value" :size="size">
        <a-radio v-for="op in options" :value="op">{{ op }}</a-radio>
    </a-radio-group>
    <a-select v-else v-model:value="value">
        <a-select-option v-for="op in options" :value="op" :size="size">{{ op }}</a-select-option>
    </a-select>
</template>

