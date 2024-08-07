<script setup lang="ts">
import type { SaveUserRequestBody, UserInfo } from "@/api/admin/user/types";
import { EditEnum, SexEnum } from "@/enums";
import type { FormInstance } from "ant-design-vue/es/form/Form";
import { message } from "ant-design-vue";

const open = defineModel("open", { default: false });

const props = withDefaults(defineProps<{
  id?: string;
  type: EditEnum;
}>(), {
  type: EditEnum.VIEW,
});

const emit = defineEmits<{
  (e: 'ok'): void
}>();

const titleEnum = {
  0: "新增",
  1: "编辑",
  2: "查看",
};
const title = computed(() => {
  return titleEnum[props.type];
});
const formRef = ref<FormInstance>();
const confirmLoading = ref<boolean>(false);

const data = ref({} as UserInfo);

const handleOk = async () => {
  confirmLoading.value = true;
  const params = {
    // CreateTime: data.value.CreateTime,
    // CreatorId: data.value.CreatorId,
    // Deleted: data.value.Deleted,
    UserName: data.value.UserName,
    // Password: data.value.Password,
    RealName: data.value.RealName,
    Sex: data.value.Sex,
    Birthday: data.value.Birthday,
    // DepartmentId: data.value.DepartmentId,
    // OrgId: data.value.OrgId,
    // State: data.value.State,
    Remark: data.value.Remark,
    RoleIdList: data.value.RoleIdList,
  } as SaveUserRequestBody;
  if (props.type === EditEnum.EDIT) {
    params.Id = data.value.Id;
  }
  // console.log(params);
  await saveUser(params);
  confirmLoading.value = false;
  message.success({ content: "成功" });
  emit("ok");
  open.value = false;
};

const handleCancel = () => {
  clear();
};

const fetch = async (id: string) => {
  if (id) {
    const res = await getUser(id);
    data.value = res.Data;
  }
};

const clear = () => {
  formRef.value!.resetFields();
  data.value = {};
};

watch(open, (v) => {
  if (v && props.id) {
    fetch(props.id);
  }
});

</script>

<template>
  <a-modal v-model:open="open" :title="title" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel">
    <a-form ref="formRef" :model="data" :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }" class="px-4 pt-4">
      <a-form-item label="账号" name="UserName">
        <a-input v-model:value="data.UserName" />
      </a-form-item>
      <a-form-item label="姓名" name="RealName">
        <a-input v-model:value="data.RealName" />
      </a-form-item>
      <a-form-item label="性别" name="Sex">
        <a-radio-group v-model:value="data.Sex">
          <a-radio :value="SexEnum.MALE">男</a-radio>
          <a-radio :value="SexEnum.FEMALE">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="生日" name="BirthdayText">
        <a-input v-model:value="data.BirthdayText" />
      </a-form-item>
      <a-form-item label="角色" name="RoleNames">
        <a-input v-model:value="data.RoleNames" />
      </a-form-item>
      <a-form-item label="备注" name="Remark">
        <a-textarea v-model:value="data.Remark" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped lang="less">

</style>
