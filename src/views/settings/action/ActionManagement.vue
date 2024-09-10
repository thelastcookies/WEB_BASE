<script setup lang="ts">
import type { ActionRecordRaw } from '@/types/action';
import { preprocessMenuTree } from '@/stores/action';

const currentId = ref<string[]>([]);
const currentActionList = ref<ActionRecordRaw[]>();

const actionTreeData = ref();
const fetch = async () => {
  const { Data } = await getMenuTreeList({});
  if (Data) actionTreeData.value = preprocessMenuTree(Data);
};
fetch();

const action = computed(() => {
  if (currentActionList.value) return currentActionList.value[0];
});

</script>

<template>
  <div class="w-full h-full p-normal flex gap-4">
    <div class="w-30% h-full bg-ant.bg-container b-rounded-ant.border-radius-lg p-4">
      <ActionTree
        searchable
        :tree="actionTreeData"
        v-model:selected-keys="currentId"
        v-model:value="currentActionList"
      />
    </div>
    <div class="w-70% h-full bg-ant.bg-container p-4">
      <ActionForm
        :tree="actionTreeData"
        :value="action" />
    </div>
  </div>
</template>


