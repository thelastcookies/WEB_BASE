<script setup lang="ts">
import type { MenuResponseRecord } from '@/api/admin/action/types';

const currentId = ref<string[]>([]);
const currentActionList = ref<MenuResponseRecord[]>();

const action = computed(() => {
  if (currentActionList.value) return currentActionList.value[0];
});

</script>

<template>
  <div class="w-full h-full p-normal flex gap-4">
    <div class="w-30% h-full bg-ant.bg-container b-rounded-ant.border-radius-lg p-4">
      <ActionTree
        searchable
        v-model:selected-keys="currentId"
        v-model:value="currentActionList"
      />
    </div>
    <div class="w-70% h-full bg-ant.bg-container p-4">
      <ActionForm :value="action" />
    </div>
  </div>
</template>


