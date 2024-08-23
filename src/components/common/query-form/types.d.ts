import type { ColProps } from 'ant-design-vue';

export type QueryFormComponentType =
  'Input'
  | 'Select'
  | 'ApiSelect'
  | 'TreeSelect'
  | 'ApiTreeSelect'
  | 'Radio'
  | 'Checkbox'
  | 'DatePicker'
  | 'RangePicker';

export interface QueryFormField {
  label?: string;
  field: string;
  component: QueryFormComponentType;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  compProps?: any;
}
