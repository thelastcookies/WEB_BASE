<script setup lang="ts">
import type { PermissionRecord } from "@/api/admin/action/types";
import { MenuPageType } from "@/enums";

const value = defineModel<PermissionRecord[]>("value", { default: () => [] });

const editableData: Record<string, PermissionRecord> = reactive({});

const handleInlineAdd = () => {
  const record = new TreeNode({
    Name: "",
    Value: "",
    NeedAction: true,
    Type: MenuPageType.PERM,
  });
  value.value.push(record);
  editableData[value.value.length - 1] = record;
};
const handleInlineEdit = (idx: number) => {
  editableData[idx] = cloneDeep(value.value[idx]);
};
const handleInlineSave = (idx: number) => {
  Object.assign(value.value[idx], editableData[idx]);
  delete editableData[idx];
};
const handleInlineCancel = (idx: number) => {
  delete editableData[idx];
};
const handleInlineDelete = (idx: number) => {
  delete editableData[idx];
  value.value.splice(idx, 1);
};

</script>

<template>
  <a-table class="w-full px-4" :pagination="false"
           :columns="permTableColumns" :data-source="value">
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
            <a class="ml-2" @click="handleInlineSave(index)">确定</a>
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
      <template v-else-if="column.dataIndex === 'Name' || column.dataIndex === 'Value'">
        <div>
          <a-input
            v-if="editableData[index]"
            v-model:value="editableData[index][column.dataIndex]"
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
