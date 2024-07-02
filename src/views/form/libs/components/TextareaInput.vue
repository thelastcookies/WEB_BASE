<script setup lang="ts">
import type { TextareaInputConfigProps } from "@/views/form/types";

const value = defineModel<string>('value');

withDefaults(defineProps<TextareaInputConfigProps>(), {
    ...ComponentCommonPropsDefault,
    max: 255,
});

</script>

<template>
    <a-textarea
        v-model:value="value"
        show-count type="textarea"
        :auto-size="{ minRows: 2, maxRows: 3 }"
        :maxlength="max"
        :placeholder="placeholder"
        :size="size" />
</template>
