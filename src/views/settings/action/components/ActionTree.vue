<script setup lang="ts">
import type { ActionResponseRecord } from "@/api/admin/action/types";
import { EditEnum } from "@/enums";
import type { Key } from "@/types";
import type { TreeNode } from "@/utils";

const value = defineModel<(TreeNode | undefined)[]>("value", { default: () => [] });
const selectedKeys = defineModel<Key[]>("selectedKeys", { default: () => [] });
const checkedKeys = defineModel<Key[]>("checkedKeys", { default: () => [] });

interface ActionTreeProps {
  mode?: "tree" | "treeSelect";
  type?: EditEnum;
  searchable?: boolean;
  checkable?: boolean;
}

const props = withDefaults(defineProps<ActionTreeProps>(), {
  mode: "tree",
  type: EditEnum.VIEW,
  searchable: false,
  checkable: false,
});

const tree = ref<ActionResponseRecord[]>([]);

/**
 * 处理节点被选中
 */
const selectValue = ref<string | string[] | undefined>();
watch(selectValue, keys => {
  if (keys instanceof Array) {
    checkedKeys.value = keys;
  } else {
    selectedKeys.value = keys ? [keys] : [];
  }
});

watch(selectedKeys, keys => {
  value.value = keys.map(key => {
    return findTreeNodeById(tree.value, key);
  });
});

watch(checkedKeys, keys => {
  value.value = keys.map(key => {
    return findTreeNodeById(tree.value, key);
  });
});

/**
 * 处理搜索
 */
const searchValue = ref<string>("");
watch(searchValue, value => {
  const nodes = findTreeNodesByLabel(tree.value, value);
  expandedKeys.value = nodes.map(node => node.getId()) as Key[];
  autoExpandParent.value = true;
});

const expandedKeys = ref<(Key)[]>([]);

const autoExpandParent = ref<boolean>(true);

const onExpand = (keys: Key[]) => {
  expandedKeys.value = keys;
  autoExpandParent.value = false;
};

/**
 * 数据交互与处理方法
 */
const fetch = async () => {
  const res = await getMenuTreeList({});
  tree.value = createTree(res.Data);
};

const handleEdit = (type: EditEnum) => {

};

fetch();

</script>

<template>
  <div class="h-full flex items-start flex-col">
    <div v-if="type !== EditEnum.VIEW && mode === 'tree'" class="mb-4">
      <a-button ml-auto type="primary"
                @click="handleEdit(EditEnum.ADD)">
        <BaseIcon icon="i-mdi-plus" />
        新增菜单
      </a-button>
    </div>
    <template v-if="searchable && mode === 'tree'">
      <a-input-search v-model:value="searchValue" placeholder="搜索" />
      <a-divider my-4 />
    </template>
    <a-tree
      v-if="mode === 'tree'"
      class="w-full flex-1 overflow-y-auto"
      v-model:selected-keys="selectedKeys"
      v-model:checked-keys="checkedKeys"
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="tree"
      :checkable="checkable"
      @expand="onExpand"
      block-node
    >
      <template #title="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substring(0, title.indexOf(searchValue)) }}
          <span class="c-ant.error">{{ searchValue }}</span>
          {{ title.substring(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>

    <a-tree-select
      v-if="mode === 'treeSelect'"
      class="w-full"
      v-model:value="selectValue"
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
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substring(0, title.indexOf(searchValue)) }}
          <span class="c-ant.error">{{ searchValue }}</span>
          {{ title.substring(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree-select>
  </div>
</template>

<style scoped lang="less">

</style>
