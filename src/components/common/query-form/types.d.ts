import type { ColProps } from "ant-design-vue";

export interface QueryFormField {
  label?: string;
  field: string;
  component: "Input" | "Select" | "TreeSelect" | "Radio" | "Checkbox" | "DatePicker" | "RangePicker";
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  compProps?: any;
}
