<script setup lang="ts">
import type { TableEditableColumnProps } from '@/components/common/inline-edit-table/types';

const props = withDefaults(defineProps<{
  dataSource: any[],
  columns: TableEditableColumnProps[],
}>(), {
  dataSource: () => [],
  columns: () => [],
});

const emit = defineEmits<{
  (e: 'add'): void;
  (e: 'update:dataSource'): void;
}>();

const editableData: Record<string, any> = reactive({});

const handleInlineAdd = () => {
  emit('add');
};
const onEdit = (idx: number) => {
  editableData[idx] = cloneDeep(props.dataSource[idx]);
};
const onSave = (idx: number) => {
  Object.assign(props.dataSource[idx], editableData[idx]);
  delete editableData[idx];
};
const onCancel = (idx: number) => {
  delete editableData[idx];
};
const onDelete = (idx: number) => {
  delete editableData[idx];
  props.dataSource.splice(idx, 1);
};
</script>

<template>
  <a-table :columns="columns" :data-source="dataSource">
    <template #headerCell="{title, column}">
      <template v-if="column.dataIndex === 'operation'">
        <div class="flex justify-evenly">
          <span>{{ title }}</span>
          <a-button type="primary" size="small"
                    @click="handleInlineAdd">新增
          </a-button>
        </div>
      </template>
    </template>
    <template #bodyCell="{ column, text, index }">
      <template v-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <div v-if="editableData[index]" class="flex justify-evenly">
            <a-button type="link" size="small" @click="onSave(index)">保存</a-button>
            <a-popconfirm title="是否取消当前变更?" @confirm="onCancel(index)">
              <a-button type="link" size="small">取消</a-button>
            </a-popconfirm>
          </div>
          <div v-else class="flex justify-evenly">
            <a-button type="link" size="small" @click="onEdit(index)">编辑</a-button>
            <a-popconfirm title="是否确定删除?" @confirm="onDelete(index)">
              <a-button type="link" size="small" danger>删除</a-button>
            </a-popconfirm>
          </div>
        </div>
      </template>
      <template v-else-if="(column as TableEditableColumnProps).editable">
        <div>
          <a-input
            v-if="editableData[index]"
            v-model:value="editableData[index][column.dataIndex as string]"
            class="ml--2"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
    </template>
  </a-table>
</template>
