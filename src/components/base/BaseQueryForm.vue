<script setup lang="ts">
import type { FormInstance } from "ant-design-vue";
import type { QueryFormField } from "@/types/form";

const props = withDefaults(defineProps<{
  fields: QueryFormField[],
}>(), {
  fields: () => [],
});

const emit = defineEmits<{
  (e: 'query', value: Record<string, string>): void;
}>();

const ITEM_IN_LINE = 4;
const SPAN = 24 / ITEM_IN_LINE;

const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({} as any);
const onFinish = () => {
  console.log("formState: ", formState);
  emit('query', formState);
};
const arr = new Array(8).fill(0);

const btnGroupOffset = computed(() => {
  if (props.fields.length < ITEM_IN_LINE) {
    return (ITEM_IN_LINE - props.fields.length - 1) * SPAN;
  } else {
    return expand.value ? (ITEM_IN_LINE - props.fields.length % ITEM_IN_LINE - 1) * SPAN : 0;
  }
});

</script>

<template>
  <a-form
    ref="formRef"
    name="高级搜索"
    class="w-full ant-advanced-search-form"
    :labelCol="{span: 6}"
    :wrapperCol="{span: 18}"
    :model="formState"
    @finish="onFinish"
  >
    <a-row :gutter="ITEM_IN_LINE">
      <template v-for="(item, idx) in fields" :key="idx">
        <a-col v-show="expand || idx < (ITEM_IN_LINE - 1)" :span="SPAN">
          <a-form-item
            :name="item.field"
            :label="item.label"
          >
            <a-input v-model:value="formState[item.field]" :placeholder="item.placeholder"></a-input>
          </a-form-item>
        </a-col>
      </template>
      <a-col class="text-right mb-3" :span="SPAN" :offset="btnGroupOffset">
        <a-button type="primary" html-type="submit">
          <BaseIcon icon="i-mdi-magnify" />
          查询
        </a-button>
        <a-button class="ml-2" @click="() => formRef!.resetFields()">
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
