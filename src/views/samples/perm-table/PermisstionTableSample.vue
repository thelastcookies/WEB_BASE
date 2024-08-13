<script setup lang="ts">
import type { PermissionRecord } from "@/api/admin/action/types";
import { MenuPageType } from "@/enums";
import type { Key } from "@/types";

const value = ref(createTree([
  {
    "Id": "1538788062786490368",
    "CreateTime": "2022-06-20 15:37:18.000",
    "CreatorId": null,
    "Deleted": false,
    "ParentId": "1536645953476366336",
    "Type": 2,
    "Name": "控制",
    "Url": null,
    "Value": "DeviceOperate",
    "NeedAction": true,
    "Icon": null,
    "Sort": 0,
    "MenuId": null,
    "Component": null,
    "ShowInMenu": null,
    "Multi": false,
    "Query": null,
  },
]));

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
  <div class="w-full h-full p-normal flex gap-4">
    <div class="w-70% flex justify-center">
      <a-table class="w-full px-8"
               :columns="permTableColumns" :data-source="value">
        <template #headerCell="{title, column}">
          <template v-if="column.dataIndex === 'operation'">
            <div class="flex justify-evenly">
              <span>{{ title }}</span>
              <a-button type="primary" size="small"
                        @click="handleInlineAdd">新增</a-button>
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
    </div>
    <div class="w-30%">
      <div class="text-5">value:</div>
      <div v-for="(item, idx) in value">
        <span class="">{{ idx }}: </span><span>{{ item }}</span>
      </div>
      <div class="text-5">editableData:</div>
      <div v-for="(value, idx) in editableData">
        <span class="">{{ idx }}: </span><span>{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
