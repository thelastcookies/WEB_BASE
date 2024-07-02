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

