<script setup lang="ts">
import { EditEnum } from '@/enums';
import type { Key } from '@/types';
import type { DataNode, EventDataNode } from 'ant-design-vue/es/vc-tree/interface';
import type { ActionRecordRaw } from '@/types/action';

const value = defineModel<ActionRecordRaw[]>('value', { default: () => [] });
const selectedKeys = defineModel<Key[]>('selectedKeys', { default: () => [] });
const checkedKeys = defineModel<Key[]>('checkedKeys', { default: () => [] });

const props = withDefaults(defineProps<{
  tree?: ActionRecordRaw[];
  type?: EditEnum;
  searchable?: boolean;
  checkable?: boolean;
}>(), {
  tree: () => [],
  type: EditEnum.VIEW,
  searchable: false,
  checkable: false,
});

const fieldNames = { key: 'id', title: 'title', children: 'children' };

/**
 * 处理节点被选中
 */
watchEffect(() => {
  if (!props.tree.length) return;
  if (props.checkable) {
    value.value = checkedKeys.value.map(key => {
      return findTreeNodeById(props.tree, key)!;
    });
  } else {
    value.value = selectedKeys.value.map(key => {
      return findTreeNodeById(props.tree, key)!;
    });
  }
});

/**
 * 处理搜索
 */
const searchValue = ref<string>('');
watch(searchValue, value => {
  const nodes = findTreeNodesByLabel(props.tree, value);
  expandedKeys.value = nodes.map(node => node.getId()) as Key[];
  autoExpandParent.value = true;
});

const expandedKeys = ref<(Key)[]>([]);

const autoExpandParent = ref<boolean>(true);

const onExpand = (keys: Key[]) => {
  expandedKeys.value = keys;
  autoExpandParent.value = false;
};

const handleEdit = (type: EditEnum) => {

};

const filterTreeNode = (node: EventDataNode) => {
  return searchValue.value ? node.title.indexOf(searchValue.value) > -1 : false;
};

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
      :tree-data="tree as unknown as DataNode[]"
      :field-names="fieldNames"
      :checkable="checkable"
      :filter-tree-node="filterTreeNode"
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
