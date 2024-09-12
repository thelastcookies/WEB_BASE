import type { TableEditableColumnProps } from '@/components/common/inline-edit-table/types';
import { MenuPageType } from '@/enums';
import type { DefaultOptionType } from 'ant-design-vue/es/vc-select/Select';

export const menuPageTypeOptions: DefaultOptionType[] = [
  {
    value: MenuPageType.MENU,
    label: '菜单',
  },
  {
    value: MenuPageType.PAGE,
    label: '页面',
  },
  {
    value: MenuPageType.LINK,
    label: '外链',
  },
  {
    value: MenuPageType.IFRAME,
    label: 'IFrame',
  },
  {
    value: MenuPageType.DIAGRAM,
    label: '组态',
  },
];

export const permTableColumns: TableEditableColumnProps[] = [
  {
    title: '权限名称',
    dataIndex: 'Name',
    width: 250,
    editable: true,
  },
  {
    title: '配置',
    dataIndex: 'Value',
    editable: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 160,
  },
];

export const metaTableColumns: TableEditableColumnProps[] = [
  {
    title: '键',
    dataIndex: 'key',
    width: 250,
    editable: true,
  },
  {
    title: '值',
    dataIndex: 'value',
    editable: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 160,
  },
];
