<script setup lang="ts">
import type { FormInstance } from "ant-design-vue";
import type { QueryFormField } from "@/components/common/query-form/types";

const expand = defineModel<Boolean>("expand", { default: false });

const props = withDefaults(defineProps<{
  fields: QueryFormField[],
  itemInLine?: number;
  allFields?: boolean;
}>(), {
  fields: () => [],
  itemInLine: 4,
  allFields: false,
});

const emit = defineEmits<{
  (e: "query", value: Record<string, string>): void;
}>();

const ITEM_IN_LINE = props.itemInLine;
const SPAN = 24 / ITEM_IN_LINE;

const formRef = ref<FormInstance>();
const queryForm = reactive({} as any);
const onFinish = () => {
  const query: any = {};
  if (props.allFields) {
    props.fields.forEach((item) => {
      query[item.field] = queryForm[item.field] ? queryForm[item.field] :
        ["Input", "Radio", "DatePicker"].includes(item.component) ? "" :
          ["Select", "TreeSelect", "Checkbox", "RangePicker"].includes(item.component) ? [] : undefined;
    });
  } else {
    for (const item in queryForm) {
      if (
        (typeof queryForm[item] === "string" && queryForm[item]) ||
        (queryForm[item] instanceof Array && queryForm[item].length) ||
        (queryForm[item] instanceof Object && Object.keys(queryForm[item]).length)
      ) {
        query[item] = queryForm[item];
      }
    }
  }
  emit("query", query);
};

const btnGroupOffset = computed(() => {
  if (props.fields.length < ITEM_IN_LINE) {
    return (ITEM_IN_LINE - props.fields.length - 1) * SPAN;
  } else {
    return expand.value ? (ITEM_IN_LINE - props.fields.length % ITEM_IN_LINE - 1) * SPAN : 0;
  }
});

const handleClear = () => {
  formRef.value!.resetFields();
  emit("query", {});
};

</script>

<template>
  <a-form
    ref="formRef"
    name="高级搜索"
    class="w-full ant-advanced-search-form"
    :labelCol="{span: 6}"
    :wrapperCol="{span: 18}"
    :model="queryForm"
    @finish="onFinish"
  >
    <a-row :gutter="ITEM_IN_LINE">
      <template v-for="(item, idx) in fields" :key="idx">
        <a-col v-show="expand || idx < (ITEM_IN_LINE - 1)" :span="SPAN">
          <a-form-item
            :name="item.field"
            :label="item.label"
            :label-col="item.labelCol"
            :wrapper-col="item.wrapperCol"
          >
            <template v-if="item.component === 'Input'">
              <a-input v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
            <template v-else-if="item.component === 'Select'">
              <a-select v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
            <template v-else-if="item.component === 'TreeSelect'">
              <a-tree-select v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
            <template v-else-if="item.component === 'Radio'">
              <a-radio-group v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
            <template v-else-if="item.component === 'Checkbox'">
              <a-checkbox-group v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
            <template v-else-if="item.component === 'DatePicker'">
              <a-date-picker v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
            <template v-else-if="item.component === 'RangePicker'">
              <a-range-picker v-bind="item.compProps" v-model:value="queryForm[item.field]" />
            </template>
          </a-form-item>
        </a-col>
      </template>
      <a-col class="text-right mb-3" :span="SPAN" :offset="btnGroupOffset">
        <a-button type="primary" html-type="submit">
          <BaseIcon icon="i-mdi-magnify" />
          查询
        </a-button>
        <a-button class="ml-2" @click="handleClear">
          <BaseIcon icon="i-mdi-filter-remove-outline" />
          清空
        </a-button>
        <a-button v-if="fields.length > ITEM_IN_LINE" type="link" @click="expand = !expand">
          <template v-if="expand">
            <BaseIcon icon="i-mdi-chevron-up" />
            收起
          </template>
          <template v-else>
            <BaseIcon icon="i-mdi-chevron-down"></BaseIcon>
            展开
          </template>
        </a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

<style scoped lang="less">
.ant-form-item {
  margin-bottom: 0.75rem;
}
</style>
