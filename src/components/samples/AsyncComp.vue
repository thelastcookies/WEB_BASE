<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
    async setup() {
        const greeting = ref('');
        greeting.value = await new Promise(
            resolve => setTimeout(
                () => resolve('Hello'),
                5000,
            )
        );
        return {greeting};
    }
});
</script>

<template>
    <div>{{ greeting }}</div>
</template>

