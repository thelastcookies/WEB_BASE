import { type ColProps, TableColumnProps } from "ant-design-vue";

export const permTableColumns: TableColumnProps[] = [
  {
    title: "权限名称",
    dataIndex: "Name",
    width: 250,
  },
  {
    title: "配置",
    dataIndex: "Value",
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: 160,
  },
];
