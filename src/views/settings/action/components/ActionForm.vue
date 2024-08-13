<script setup lang="ts">
import { Empty } from "ant-design-vue";
import { EditEnum, MenuPageType } from "@/enums";
import type { ActionResponseRecord, MenuResponseRecord, PermissionRecord } from "@/api/admin/action/types";

const props = withDefaults(defineProps<{
  value?: MenuResponseRecord;
  type?: EditEnum;
}>(), {
  type: EditEnum.VIEW,
});

const emit = defineEmits<{
  (e: "ok"): void
}>();

const titleEnum = {
  0: "新增",
  1: "编辑",
  2: "查看",
};

const menuPageTypeOptions = [{
  value: MenuPageType.MENU,
  label: "菜单",
}, {
  value: MenuPageType.PAGE,
  label: "页面",
}, {
  value: MenuPageType.LINK,
  label: "外链",
}, {
  value: MenuPageType.IFRAME,
  label: "IFrame",
}, {
  value: MenuPageType.DIAGRAM,
  label: "组态",
}];

const formRef = ref<HTMLFormElement>();
const loading = ref<boolean>(false);

const formData = ref<ActionResponseRecord>();
const permissionList = ref<PermissionRecord[]>([]);

watch(() => props.value, (val) => {
  if (val) {
    formData.value = Object.assign({}, val, {
      Name: val.title,
      Icon: val.icon,
    });
    if (formData.value.permissionList)
      permissionList.value = createShallowTree<PermissionRecord>(formData.value.permissionList);
  } else {
    formData.value = {};
  }
}, { immediate: true });

/**
 * 数据交互与处理方法
 */
const handleReset = () => {

};
const handleSubmit = () => {

};

</script>

<template>
  <div class="w-full h-full overflow-y-auto">
    <div class="w-full h-12 flex justify-end pb-4 bg-pixel-matrix sticky top-0 z-12">
      <a-button class="ml-auto mr-2" @click="handleReset">重置</a-button>
      <a-button class="mr-2" type="primary" @click="handleSubmit">保存</a-button>
    </div>
    <a-form v-if="formData" ref="formRef"
            :model="formData" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
      <a-row>
        <a-divider orientation="left">基本信息</a-divider>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="菜单名称" name="Name">
            <a-input v-model:value="formData.Name" placeholder="请输入菜单名称" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="上级菜单" name="RealName">
            <ActionTreeSelect
              searchable
              mode="treeSelect"
              v-model:keys="formData.ParentId"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="路径配置" name="Url">
            <a-input v-model:value="formData.Url" placeholder="请输入路径" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="图标配置" name="Icon">
            <a-input v-model:value="formData.Icon" placeholder="请输入" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="类型" name="Type">
            <a-select v-model:value="formData.Type" placeholder="请选择类型"
                      :options="menuPageTypeOptions"></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="排序" name="Sort">
            <a-input v-model:value="formData.Sort" placeholder="请输入排序" />
          </a-form-item>
        </a-col>
      </a-row>
      <template v-if="formData.Type === MenuPageType.PAGE">
        <a-row>
          <a-divider orientation="left">权限配置</a-divider>
        </a-row>
        <a-row>
          <PermissionTable v-model:value="permissionList"></PermissionTable>
        </a-row>
      </template>
      <a-row>
        <a-divider orientation="left">扩展配置</a-divider>
      </a-row>
    </a-form>
    <a-empty v-else class="mt-25%" :image="Empty.PRESENTED_IMAGE_SIMPLE">
      <template #description>
        请在左侧选择菜单
      </template>
    </a-empty>
  </div>
</template>

<style scoped lang="less">
</style>
