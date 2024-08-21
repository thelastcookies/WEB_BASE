import type { TableEditableColumnProps } from "@/components/common/inline-edit-table/types";

export const permTableColumns: TableEditableColumnProps[] = [
  {
    title: "权限名称",
    dataIndex: "Name",
    width: 250,
    editable: false,
  },
  {
    title: "配置",
    dataIndex: "Value",
    editable: true,
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: 160,
    editable: true,
  },
];
