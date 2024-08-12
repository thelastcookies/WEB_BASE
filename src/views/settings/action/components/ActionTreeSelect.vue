<script setup lang="ts">
import type { ActionResponseRecord } from "@/api/admin/action/types";
import { EditEnum } from "@/enums";
import type { Key } from "@/types";
import type { TreeNode } from "@/utils";

const value = defineModel<TreeNode | undefined | (TreeNode | undefined)[]>("value", { default: () => [] });
const keys = defineModel<Key | Key[]>("keys", { default: () => [] });

interface ActionTreeProps {
  mode?: "tree" | "treeSelect";
  type?: EditEnum;
  searchable?: boolean;
  checkable?: boolean;
}

withDefaults(defineProps<ActionTreeProps>(), {
  mode: "tree",
  type: EditEnum.VIEW,
  searchable: false,
  checkable: false,
});

const tree = ref<ActionResponseRecord[]>([]);

/**
 * 处理节点被选中，更新 value
 */
watchEffect(() => {
  if (!tree.value.length) return;
  if (keys.value instanceof Array) {
    value.value = keys.value.map(key => {
      return findTreeNodeById(tree.value, key);
    });
  } else {
    value.value = findTreeNodeById(tree.value, keys.value);
  }
});

/**
 * 处理搜索
 */
const searchValue = ref<string>("");

/**
 * 数据交互与处理方法
 */
const fetch = async () => {
  const res = await getMenuTreeList({});
  if (res.Data) tree.value = createTree(res.Data);
};

fetch();

</script>

<template>
  <a-tree-select
    class="w-full"
    v-model:value="keys"
    v-model:searchValue="searchValue"
    :tree-data="tree"
    :tree-checkable="checkable"
    :show-search="searchable"
    allow-clear
    placeholder="请选择"
    tree-node-filter-prop="title"
    show-checked-strategy="SHOW_ALL"
  >
    <template #title="{ title }">
        <span v-if="title && searchValue && title.indexOf(searchValue) > -1">
          {{ title.substring(0, title.indexOf(searchValue)) }}
          <span class="c-ant.error">{{ searchValue }}</span>
          {{ title.substring(title.indexOf(searchValue) + searchValue.length) }}
        </span>
      <span v-else>{{ title }}</span>
    </template>
  </a-tree-select>
</template>

<style scoped lang="less">

</style>
