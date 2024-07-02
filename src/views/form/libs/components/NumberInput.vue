<script setup lang="ts">
import type { NumberInputConfigProps } from "@/views/form/types";

const value = defineModel<string>('value');

withDefaults(defineProps<NumberInputConfigProps>(), {
    ...ComponentCommonPropsDefault,
    max: Infinity,
    min: -Infinity,
});
</script>

<template>
    <a-input-number v-model:value="value" :max="max" :min="min" :size="size" />
</template>

<style scoped>

</style>
