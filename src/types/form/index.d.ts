import type { ColProps } from "ant-design-vue";

export interface QueryFormField {
  label: string;
  field: string;
  placeholder: string;
  component: string;
  colProps: ColProps;
}
