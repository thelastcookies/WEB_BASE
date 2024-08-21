<script setup lang="ts">
import { MenuPageType } from "@/enums";
import InlineEditTable from "@/components/common/inline-edit-table/InlineEditTable.vue";

const editableData: Record<string, any> = reactive({});

const tableData = ref(createTree([
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

const handleAdd = () => {
  return new TreeNode({
    Name: "",
    Value: "",
    NeedAction: true,
    Type: MenuPageType.PERM,
  });
};
</script>

<template>
  <div class="w-full h-full p-normal flex gap-4">
    <div class="w-70% flex justify-center">
      <InlineEditTable
        v-model:data-source="tableData"
        :columns="permTableColumns"
        @add="handleAdd"
      ></InlineEditTable>
    </div>
    <div class="w-30%">
      <div class="text-5">TableData:</div>
      <div v-for="(item, idx) in tableData">
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
