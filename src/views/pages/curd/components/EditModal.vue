<script setup lang="ts">
import { EditEnum, SexEnum } from '@/enums';
import type { FormInstance } from 'ant-design-vue/es/form/Form';
import { message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';

const open = defineModel('open', { default: false });

const props = withDefaults(defineProps<{
  type: EditEnum;
  id?: string;
}>(), {
  type: EditEnum.VIEW,
});

const emit = defineEmits<{
  (e: 'submit'): void
}>();

const loading = ref<boolean>(false);

const titleEnum = {
  [EditEnum.ADD]: '新增',
  [EditEnum.EDIT]: '编辑',
  [EditEnum.VIEW]: '查看',
};
const title = computed(() => {
  return titleEnum[props.type];
});

const formRef = ref<FormInstance>();
const formData = ref<any>({});

const rules: Record<string, Rule[]> = {};

const handleSubmit = async () => {
  loading.value = true;
  try {
    await formRef.value?.validate();
    const { Success, Msg } = await saveUser(formData.value);
    if (Success) {
      message.success('保存成功');
      emit('submit');
      handleClear();
    } else {
      message.error({ content: '保存失败，' + Msg });
    }
    open.value = false;
  } catch (e) {
    if ((e as ValidateErrorEntity)?.errorFields) {
      message.error((e as ValidateErrorEntity)?.errorFields[0].errors[0]);
    } else {
      message.error('保存失败');
    }
  }
  loading.value = false;
};

const handleClear = () => {
  formRef.value!.resetFields();
  formData.value = {
    Sex: SexEnum.MALE,
    State: UserStateEnum.ENABLE,
  };
};

const fetch = async (id: string) => {
  if (id) {
    const res = await getUser(id);
    if (res.Data) formData.value = res.Data;
  }
};

watch(open, (v) => {
  if (v && props.id) {
    fetch(props.id);
  }
});

</script>

<template>
  <a-modal v-model:open="open" :title="title"
    :confirm-loading="loading" :mask-closable="false"
    ok-text="保存"
    @ok="handleSubmit"
    @cancel="handleClear">
    <a-form ref="formRef" autocomplete="off" :model="formData"
      :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }"
      :rules="rules" :disabled="loading"
      class="px-3 pt-3">
      <a-form-item label="账号" name="UserName">
        <a-input v-model:value="formData.UserName" />
      </a-form-item>
      <a-form-item label="姓名" name="RealName">
        <a-input v-model:value="formData.RealName" />
      </a-form-item>
      <a-form-item label="性别" name="Sex">
        <a-input v-model:value="formData.Sex" />
      </a-form-item>
      <a-form-item label="生日" name="BirthdayText">
        <a-input v-model:value="formData.BirthdayText" />
      </a-form-item>
      <a-form-item label="角色" name="RoleNames">
        <a-input v-model:value="formData.RoleNames" />
      </a-form-item>
      <a-form-item label="备注" name="Remark">
        <a-input v-model:value="formData.Remark" />
      </a-form-item>
      <a-form-item label="状态" name="State">
        <a-switch v-model:checked="formData.State"
          checked-value="1" un-checked-value="0"
          checked-children="启用" un-checked-children="禁用"></a-switch>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
