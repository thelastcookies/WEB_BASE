import { type ColProps, TableColumnProps } from "ant-design-vue";

export const roleTableColumns: TableColumnProps[] = [
  {
    title: "角色名",
    dataIndex: "RoleName",
  },
  {
    title: "角色类型",
    width: 120,
    dataIndex: "RoleType",
  },
  {
    title: "备注",
    dataIndex: "Remark",
  },
  {
    title: "操作",
    width: 160,
    dataIndex: "operation",
  },
];


// "PageIndex": 0,
//   "PageRows": 0,
//   "SortField": "string",
//   "SortType": "string",
//   "Search": {
//   "all": true,
//     "userId": "string",
//     "keyword": "string",
//     "userName": "string",
//     "roleId": "string"
// }

export interface SearchFormField {
  label: string;
  field: string;
  placeholder: string;
  component: string;
  colProps: ColProps;
}

export const roleTableSearchFields: SearchFormField[] = [
  {
    label: "角色名",
    field: "roleName",
    placeholder: "请输入角色名",
    component: "Input",
    colProps: { span: 5 },
  },
];

