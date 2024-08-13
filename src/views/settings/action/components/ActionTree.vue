<script setup lang="ts">
import type { MenuResponseRecord } from "@/api/admin/action/types";
import { EditEnum } from "@/enums";
import type { Key } from "@/types";
import type { DataNode } from "ant-design-vue/es/vc-tree/interface";

const value = defineModel<MenuResponseRecord[]>("value", { default: () => [] });
const selectedKeys = defineModel<Key[]>("selectedKeys", { default: () => [] });
const checkedKeys = defineModel<Key[]>("checkedKeys", { default: () => [] });

interface ActionTreeProps {
  type?: EditEnum;
  searchable?: boolean;
  checkable?: boolean;
}

const props = withDefaults(defineProps<ActionTreeProps>(), {
  type: EditEnum.VIEW,
  searchable: false,
  checkable: false,
});

const tree = ref<(MenuResponseRecord)[]>([]);

/**
 * 处理节点被选中
 */
watchEffect(() => {
  if (!tree.value.length) return;
  if (props.checkable) {
    value.value = checkedKeys.value.map(key => {
      return findTreeNodeById(tree.value, key)!;
    });
  } else {
    value.value = selectedKeys.value.map(key => {
      return findTreeNodeById(tree.value, key)!;
    });
  }
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
  if (res.Data) tree.value = createTree(res.Data);
};

const handleEdit = (type: EditEnum) => {

};

fetch();

</script>

<template>
  <div class="h-full flex items-start flex-col">
    <div v-if="type !== EditEnum.VIEW" class="mb-4">
      <a-button ml-auto type="primary"
                @click="handleEdit(EditEnum.ADD)">
        <BaseIcon icon="i-mdi-plus" />
        新增菜单
      </a-button>
    </div>
    <template v-if="searchable">
      <a-input-search v-model:value="searchValue" placeholder="搜索" />
      <a-divider my-4 />
    </template>
    <a-tree
      class="w-full flex-1 overflow-y-auto"
      v-model:selected-keys="selectedKeys"
      v-model:checked-keys="checkedKeys"
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="tree as DataNode[]"
      :checkable="checkable"
      @expand="onExpand"
      block-node
    >
      <template #title="{ title }">
        <span v-if="title && searchValue && title.indexOf(searchValue) > -1">
          {{ title.substring(0, title.indexOf(searchValue)) }}
          <span class="c-ant.error">{{ searchValue }}</span>
          {{ title.substring(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>
  </div>
</template>

<style scoped lang="less">

</style>
