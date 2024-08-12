<script setup lang="ts">
import type { TreeNode } from "@/utils";

const value1 = ref<TreeNode[]>([]);
const selectedKeys1 = ref<string[]>([]);
const checkedKeys1 = ref<string[]>(["1536657104184545280"]);

const value2 = ref<TreeNode | TreeNode[]>([]);
const keys = ref<string>("1536657104184545280");

const title1 = computed(() => {
  if (!value1.value.length) return;
  return value1.value.map(item => item.getLabel()).join(",");
});

const title2 = computed(() => {
  if (!value2.value) return;
  if (value2.value instanceof Array) {
    return value2.value.map(item => item.getLabel());
  } else {
    return value2.value.getLabel();
  }
});
</script>

<template>
  <div class="w-full h-full p-normal flex gap-4">
    <div class="w-30% h-full bg-ant.bg-container b-rounded-ant.border-radius-lg p-4">
      <ActionTree
        searchable
        checkable
        v-model:value="value1"
        v-model:selected-keys="selectedKeys1"
        v-model:checked-keys="checkedKeys1"
      />
    </div>
    <div class="w-30% h-full bg-ant.bg-container b-rounded-ant.border-radius-lg p-4">
      <ActionTreeSelect
        searchable
        v-model:value="value2"
        v-model:keys="keys"
      />
    </div>
    <div class="w-30% h-50%">
      <div class="text-5">ActionTree</div>
      <div>title1: {{ title1 }}</div>
      <div>selectedKeys: {{ selectedKeys1 }}</div>
      <div>checkedKeys1: {{ checkedKeys1 }}</div>
      <a-divider my-4 />
      <div class="text-5">ActionTreeSelect</div>
      <div>title2: {{ title2 }}</div>
      <div>keys: {{ keys }}</div>
    </div>
  </div>
</template>
