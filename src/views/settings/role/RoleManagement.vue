<script setup lang="ts">
import type { Key } from "@/types";
import { message } from "ant-design-vue";
import type { RoleRecord } from "@/api/admin/role/types";

/**
 * table 属性与方法
 */
const selectedRowKeys: Key[] = [];

const list = ref([] as RoleRecord[]);

const handleEdit = (type: number, data?: RoleRecord) => {
  modalOpen.value = true;
  modalType.value = type;
  if (type === EditEnum.EDIT) {
    if (data) modalData.value = { ...data };
  } else if (type === EditEnum.ADD) {
    modalData.value = {};
  }
};
const handleDelete = (modelId: number) => {
  // delModel(modelId).then(({ result }) => {
  //   if (!result) return Promise.reject();
  //   message.success({ content: "删除成功" });
  //   fetch();
  // }).catch(_ => {
  //   message.error({ content: "删除失败" });
  // });
};

const handleBatchDelete = () => {

}

const batchDelete = async (ids: string[]) => {
  await deleteUser(ids);
}

/**
 * 模态框
 */
const modalOpen = ref(false);
const modalType = ref(EditEnum.ADD);
const modalData = ref({} as RoleRecord);
/**
 * 数据交互与处理方法
 */
const fetch = async () => {
  const res = await getRoleList({});
  if (res.Data) list.value = res.Data;
};

/**
 * 初始化调用
 */
fetch();

</script>

<template>
  <div class="w-full h-full p-normal">
    <div class="bg-rd-ant.border-radius m-custom.margin-size">
      <QueryForm :fields="roleTableSearchFields" />
    </div>
    <div class="h-[calc(100%-60px)]">
      <a-table :row-selection="{ selectedRowKeys: selectedRowKeys, columnWidth: 50 }"
               :columns="roleTableColumns" :data-source="list">
        <template #title>
          <div class="flex">
            <div>角色列表</div>
            <a-button ml-auto type="primary"
                      @click="handleEdit(EditEnum.ADD)">
              <BaseIcon icon="i-mdi-plus" />
              新增
            </a-button>
            <a-button ml-2 type="primary" danger @click="handleBatchDelete">
              <BaseIcon icon="i-mdi-trash-can-outline" />
              删除
            </a-button>
          </div>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <a-button btn-in-table type="link" @click="handleEdit(EditEnum.EDIT, record as RoleRecord)">编辑</a-button>
            <a-divider type="vertical" />
            <a-popconfirm
              title="是否删除当前角色?"
              @confirm="handleDelete(record.Id)"
            >
              <a-button btn-in-table danger type="link">删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
    <UserModal v-model:open="modalOpen" :type="modalType" :id="modalData.Id"></UserModal>
  </div>
</template>

<style scoped lang="less">
//:deep(.ant-table-wrapper) {
//  height: 100%;
//
//  .ant-spin-nested-loading {
//    height: 100%;
//
//    .ant-spin-container {
//      height: 100%;
//      display: flex;
//      flex-direction: column;
//    }
//
//    .ant-table {
//      flex: 1;
//      .ant-table-title {
//        height: 52px;
//        padding: 0 10px;
//        display: flex;
//        align-items: center;
//        .ant-btn {
//          margin-left: 0.5rem;
//        }
//      }
//
//      .ant-table-container {
//        height: 100%;
//        display: flex;
//        flex-direction: column;
//
//        .ant-table-body {
//          position: relative;
//          flex: 1;
//
//          table {
//            position: absolute;
//            left: 0;
//            top: 0;
//            right: 0;
//            bottom: 0;
//          }
//        }
//      }
//    }
//  }
//}
</style>
