<script setup lang="ts">
import type { Key, Recordable } from '@/types';
import { message, type TableColumnProps } from 'ant-design-vue';
import type { QueryFormField } from '@/components/common/query-form/types';
import type QueryForm from '@/components/common/query-form/QueryForm.vue';
import EditModal from './components/EditModal.vue';

/**
 * 查询栏
 */
const queryFormRef = ref<InstanceType<typeof QueryForm> | null>(null);
const qForm = ref<Recordable<any>>({});
const qFormExpand = ref(false);

const queryFields: QueryFormField[] = [
  {
    label: '下拉框',
    field: 'selectName',
    component: 'Select',
    compProps: {
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },
  {
    label: '下拉框',
    field: 'selectName',
    component: 'Select',
    compProps: {
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },
  {
    label: '下拉框',
    field: 'selectName',
    component: 'Select',
    compProps: {
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  }, {
    label: '下拉框',
    field: 'selectName',
    component: 'Select',
    compProps: {
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },
  {
    label: '下拉框多选',
    field: 'selectMultiName',
    component: 'Select',
    compProps: {
      mode: 'multiple',
      options: [{
        label: '选项A',
        value: 'valueA',
      }, {
        label: '选项B',
        value: 'valueB',
      }, {
        label: '选项C',
        value: 'valueC',
      }, {
        label: '选项D',
        value: 'valueD',
      }],
    },
  },
  {
    field: 'time',
    component: 'RangePicker',
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
    compProps: {
      placeholder: ['请选择开始时间', '请选择结束时间'],
      showTime: { defaultValue: dayjs('00:00:00', 'HH:mm:ss') },
    },
  },
];

const handleQuery = async () => {
  pagination.value.current = 1;
  await fetch();
};

onMounted(() => {
  handleQuery();
});

/**
 * table 属性与方法
 */
const list = ref<any[]>([]);
const loading = ref(false);

const selectedRowKeys = ref<Key[]>([]);
const onSelectChange = (keys: Key[]) => {
  selectedRowKeys.value = keys;
};

const { height } = useWindowSize();
watch([height, qFormExpand], () => {
  tableResize();
});
const scroll = ref({
  y: height.value - 300 - (queryFormRef.value?.$el.offsetHeight ?? 0),
});
const tableResize = useDebounceFn(() => {
  nextTick(() => {
    scroll.value.y = height.value - 300 - (queryFormRef.value?.$el.offsetHeight ?? 0);
  });
}, 200);

onMounted(() => {
  tableResize();
});

const tableColumns: TableColumnProps[] = [
  {
    title: '序号',
    width: 80,
    dataIndex: 'index',
  },
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: '字段1',
    dataIndex: 'field1',
  },
  {
    title: '字段2',
    dataIndex: 'field2',
  },
  {
    title: '字段3',
    dataIndex: 'field3',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 140,
  },
];

const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 20,
});

const fetch = async () => {
  loading.value = true;
  const Data = {
    'success': true,
    'errorCode': 0,
    'msg': 'string',
    'data': [
      {
        id: '1',
        field1: 'r1field1',
        field2: 'r1field2',
        field3: 'r1field3',
      }, {
        id: '2',
        field1: 'r2field1',
        field2: 'r2field2',
        field3: 'r2field3',
      }, {
        id: '3',
        field1: 'r3field1',
        field2: 'r3field2',
        field3: 'r3field3',
      }, {
        id: '4',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      }, {
        id: '5',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      }, {
        id: '6',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      }, {
        id: '7',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      }, {
        id: '8',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      }, {
        id: '9',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      }, {
        id: '10',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      }, {
        id: '11',
        field1: 'r1field1',
        field2: 'r1field2',
        field3: 'r1field3',
      }, {
        id: '12',
        field1: 'r2field1',
        field2: 'r2field2',
        field3: 'r2field3',
      }, {
        id: '13',
        field1: 'r3field1',
        field2: 'r3field2',
        field3: 'r3field3',
      }, {
        id: '14',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      }, {
        id: '15',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      }, {
        id: '16',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      }, {
        id: '17',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      }, {
        id: '18',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      }, {
        id: '19',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      }, {
        id: '20',
        field1: 'r4field1',
        field2: 'r4field2',
        field3: 'r4field3',
      },
    ],
    'total': 256,
  };
  if (Data) {
    list.value = Data?.data!;
    pagination.value.total = Data?.total!;
  }
  loading.value = false;
};

const handleTableChange = (p: { pageSize: number; current: number }) => {
  pagination.value.current = p.current;
  pagination.value.pageSize = p.pageSize;
  fetch();
};

/**
 * 模态框
 */
const modalOpen = ref(false);
const modalType = ref(EditEnum.ADD);
const modalData = ref({} as any);

const handleReload = async () => {
  await fetch();
};

const handleEdit = (type: number, data?: any) => {
  modalOpen.value = true;
  modalType.value = type;
  if (type === EditEnum.EDIT) {
    if (data) modalData.value = { ...data };
  } else if (type === EditEnum.ADD) {
    modalData.value = {};
  }
};

const handleDelete = async (id: string) => {
  await batchDelete([id]);
};

const handleBatchDelete = async () => {
  await batchDelete(selectedRowKeys.value as string[]);
};

const batchDelete = async (ids: string[]) => {
  if (!ids.length) {
    message.warn('请至少选择一条记录');
    return;
  }
  try {
    const { Success } = await deleteUser(ids);
    if (Success) {
      message.success('删除成功');
      await handleReload();
    } else {
      message.success({ content: '删除失败' });
    }
  } catch (e) {
    message.error('删除失败');
  }
};
</script>

<template>
  <div class="w-full h-full px-3 overflow-y-auto">
    <query-form
      ref="queryFormRef"
      class="pt-4 pb-1 sticky top-0 z-12 bg-ant.bg-base"
      :fields="queryFields"
      v-model:form="qForm"
      v-model:expand="qFormExpand"
      @query="handleQuery"
      :itemInLine="4"
    ></query-form>
    <a-table
      :columns="tableColumns"
      :data-source="list"
      :pagination="pagination"
      :loading="loading"
      row-key="id"
      :row-selection="{
        type: 'checkbox',
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
        columnWidth: 50
      }"
      :scroll="scroll"
      @change="handleTableChange"
    >
      <template #title>
        <div class="flex">
          <div>列表CRUD</div>
          <a-button ml-auto type="primary"
                    @click="handleEdit(EditEnum.ADD)">
            <BaseIcon icon="i-mdi-plus" />
            新增
          </a-button>
          <a-popconfirm
            title="是否确认删除?"
            @confirm="handleBatchDelete"
          >
            <a-button ml-2 danger>
              <BaseIcon icon="i-mdi-trash-can-outline" />
              删除
            </a-button>
          </a-popconfirm>
        </div>
      </template>
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-button btn-in-table type="link" @click="handleEdit(EditEnum.EDIT, record)">编辑</a-button>
          <a-divider type="vertical" />
          <a-popconfirm
            title="是否确定删除？"
            @confirm="handleDelete(record.Id)"
          >
            <a-button btn-in-table danger type="link">删除</a-button>
          </a-popconfirm>
        </template>
        <template v-else-if="column.dataIndex === 'index'">
          {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
        </template>
      </template>
    </a-table>
    <EditModal
      v-model:open="modalOpen"
      :type="modalType"
      :id="modalData.Id"
      @submit="handleReload"
    ></EditModal>
  </div>
</template>

<style scoped lang="less">

</style>
