<script setup lang="ts">
import type { TableEditableColumnProps } from "@/components/common/inline-edit-table/types";

const props = withDefaults(defineProps<{
  dataSource: any[],
  columns: TableEditableColumnProps[],
}>(), {
  dataSource: () => [],
  columns: () => [],
});

const emit = defineEmits<{
  (e: "add"): any;
  (e: "update:dataSource"): any;
}>();

const editableData: Record<string, any> = reactive({});

const handleInlineAdd = () => {
  editableData[props.dataSource.length - 1] = emit("add");
};
const handleInlineEdit = (idx: number) => {
  editableData[idx] = cloneDeep(props.dataSource[idx]);
};
const handleInlineSave = (idx: number) => {
  Object.assign(props.dataSource[idx], editableData[idx]);
  delete editableData[idx];
};
const handleInlineCancel = (idx: number) => {
  delete editableData[idx];
};
const handleInlineDelete = (idx: number) => {
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
    <template #bodyCell="{ column, text, record, index }">
      <template v-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <div v-if="editableData[index]" class="flex justify-evenly">
            <a class="ml-2" @click="handleInlineSave(index)">保存</a>
            <a-popconfirm title="是否取消当前变更?" @confirm="handleInlineCancel(index)">
              <a class="ml-2">取消</a>
            </a-popconfirm>
          </div>
          <div v-else class="flex justify-evenly">
            <a class="ml-2" @click="handleInlineEdit(index)">编辑</a>
            <a-popconfirm title="是否确定删除?" @confirm="handleInlineDelete(index)">
              <a class="ml-2" type="danger">删除</a>
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

<style scoped lang="less">

</style>
