<script setup lang="ts">
import type { QueryFormField } from "@/components/common/query-form/types";
import type { Rule } from "ant-design-vue/es/form";
import type { Recordable } from "@/types";
import { createTree } from "@/utils";

const queryFields: QueryFormField[] = [
  {
    label: "文本",
    field: "inputName",
    component: "Input",
    compProps: {
      placeholder: "请输入",
    },
  },
  {
    label: "文本",
    field: "inputName",
    component: "Input",
    compProps: {
      placeholder: "请输入",
    },
  },
  {
    label: "文本",
    field: "inputName",
    component: "Input",
    compProps: {
      placeholder: "请输入",
    },
  },
  {
    label: "下拉框",
    field: "selectName",
    component: "Select",
    compProps: {
      placeholder: "请选择",
      options: [{
        label: "选项A",
        value: "valueA",
      }, {
        label: "选项B",
        value: "valueB",
      }, {
        label: "选项C",
        value: "valueC",
      }, {
        label: "选项D",
        value: "valueD",
      }],
    },
  },
  {
    label: "树下拉框",
    field: "TreeSelectName",
    component: "TreeSelect",
    compProps: {
      treeData: [{
        label: "选项A",
        value: "valueA",
        children: [{
          label: "选项AA",
          value: "valueAA",
        }, {
          label: "选项AB",
          value: "valueAB",
        }],
      }, {
        label: "选项B",
        value: "valueB",
        children: [{
          label: "选项BA",
          value: "valueBA",
        }, {
          label: "选项BB",
          value: "valueBB",
        }, {
          label: "选项BC",
          value: "valueBC",
        }],
      }, {
        label: "选项C",
        value: "valueC",
      }, {
        label: "选项D",
        value: "valueD",
      }],
    },
  },
  {
    label: "单选",
    field: "RadioName",
    component: "Radio",
    compProps: {
      options: [{
        label: "选项A",
        value: "valueA",
      }, {
        label: "选项B",
        value: "valueB",
      }, {
        label: "选项C",
        value: "valueC",
      }, {
        label: "选项D",
        value: "valueD",
      }],
    },
  },
  {
    label: "多选",
    field: "CheckboxName",
    component: "Checkbox",
    compProps: {
      options: [{
        label: "选项A",
        value: "valueA",
      }, {
        label: "选项B",
        value: "valueB",
      }, {
        label: "选项C",
        value: "valueC",
      }, {
        label: "选项D",
        value: "valueD",
      }],
    },
  },
  {
    label: "时间",
    field: "DatePickerName",
    component: "DatePicker",
    compProps: {
      placeholder: "请选择时间",
      valueFormat: "YYYY-MM-DD",
    },
  },
  {
    label: "起止时间",
    field: "RangePickerName",
    component: "RangePicker",
    compProps: {
      placeholder: ["请选择开始时间", "请选择结束时间"],
      valueFormat: "YYYY-MM-DD",
    },
  },
];
const qForm = ref<Recordable<any>>({
  inputName: "1234",
  selectName: "valueA",
  RadioName: "valueA",
  CheckboxName: ["valueA"],
  RangePickerName: [dayjs().subtract(8, "h"), dayjs()],
});
const onQuery = (form: Record<string, string>) => {
  qForm.value = form;
};

const rules: Record<string, Rule[]> = {
  inputName: [
    { required: true, message: "文本内容不可为空", trigger: "change" },
    { min: 3, max: 5, message: "文本内容长度要在 3 到 5 之间", trigger: "blur" },
  ],
  selectName: [{ required: true, message: "下拉框内容不可为空", trigger: "change" }],
  DatePickerName: [{ required: true, message: "时间选择不可为空", trigger: "blur" }],
  RangePickerName: [{
    validator(_, value) {
      if (!value || value.length !== 2) {
        return Promise.reject("请选择时间范围");
      }
      const [start, end] = value;
      if (dayjs(start).isSame(end, "day")) {
        return Promise.resolve();
      }
      return Promise.reject("开始时间和结束时间必须在同一天");
    },
  }],
};

const apiQueryFields: QueryFormField[] = [{
  label: "Api下拉框",
  field: "apiSelectName",
  component: "ApiSelect",
  compProps: {
    allowClear: true,
    showSearch: true,
    optionFilterProp: "label",
    mode: "multiple",
    maxTagCount: 3,
    placeholder: "请选择",
    getOptions: async () => {
      const res = await getUserList({});
      return res.Data!.map(user => {
        return {
          label: user.RealName,
          value: user.Id,
        };
      });
    },
  },
}, {
  label: "Api树下拉框",
  field: "apiTreeSelectName",
  component: "ApiTreeSelect",
  compProps: {
    allowClear: true,
    showSearch: true,
    treeNodeFilterProp: "label",
    treeCheckable: true,
    maxTagCount: 3,
    placeholder: "请选择",
    getOptions: async () => {
      const res = await getMenuTreeList({});
      return createTree(res.Data!).map(menu => {
        return {
          label: menu.getLabel(),
          value: menu.getId(),
          children: menu.getChildren(),
        };
      });
    },
  },
}];
const apiQForm = ref<Recordable<any>>();

</script>
<template>
  <div class="w-full h-full">
    <div class="p-8">
      <QueryForm
        :expand="true"
        :fields="queryFields"
        :rules="rules"
        v-model:form="qForm"
        @query="onQuery"
      >
        <div class="flex justify-between">
          <BaseIcon icon="i-mdi:flag-triangle" class="c-red" />
          插槽内容
          <BaseIcon icon="i-mdi:flag-triangle" class="c-green" />
        </div>
      </QueryForm>
    </div>
    <div class="w-full h-300px flex p-8">
      <div class="w-50% h-full pl-8 overflow-y-auto">
        <div class="text-5 sticky top-0 bg-pixel-matrix">QueryForm</div>
        <div v-for="(value, key) in qForm">{{ key }}: {{ value }}</div>
      </div>
      <div class="w-50% h-full pl-8 overflow-y-auto">
        <div class="text-5 sticky top-0 bg-pixel-matrix">Rules</div>
        <div v-for="(value, key) in rules">{{ key }}: {{ value }}</div>
      </div>
    </div>
    <div class="p-8">
      <QueryForm
        :expand="true"
        :fields="apiQueryFields"
        :rules="rules"
        v-model:form="apiQForm"
      >
        <div class="flex justify-between">
          <BaseIcon icon="i-mdi:flag-triangle" class="c-red" />
          插槽内容
          <BaseIcon icon="i-mdi:flag-triangle" class="c-green" />
        </div>
      </QueryForm>
    </div>
    <div class="w-full h-300px flex p-8">
      <div class="w-50% h-full pl-8 overflow-y-auto">
        <div class="text-5 sticky top-0 bg-pixel-matrix">QueryForm</div>
        <div v-for="(value, key) in apiQForm">{{ key }}: {{ value }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">

</style>
