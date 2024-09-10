<script setup lang="ts">
import { Empty } from 'ant-design-vue';
import { EditEnum, MenuPageType } from '@/enums';
import InlineEditTable from '@/components/common/inline-edit-table/InlineEditTable.vue';
import type { ActionRecordRaw } from '@/types/action';
import type { Recordable } from '@/types';

const props = withDefaults(defineProps<{
  tree?: ActionRecordRaw[];
  value?: ActionRecordRaw;
  type?: EditEnum;
}>(), {
  type: EditEnum.VIEW,
});

const emit = defineEmits<{
  (e: 'ok'): void
}>();

const titleEnum = {
  0: '新增',
  1: '编辑',
  2: '查看',
};

const menuPageTypeOptions = [{
  value: MenuPageType.MENU,
  label: '菜单',
}, {
  value: MenuPageType.PAGE,
  label: '页面',
}, {
  value: MenuPageType.LINK,
  label: '外链',
}, {
  value: MenuPageType.IFRAME,
  label: 'IFrame',
}, {
  value: MenuPageType.DIAGRAM,
  label: '组态',
}];

const formRef = ref<HTMLFormElement>();
const loading = ref<boolean>(false);

const formData = ref<ActionRecordRaw>();

const fieldNames = { value: 'id', label: 'title', children: 'children' };

watch(() => props.value, (val) => {
  if (val) {
    formData.value = cloneDeep(val);
    if (val.meta) {
      let metaList: Recordable<string>[] = [];
      for (const [key, value] of Object.entries(val.meta)) {
        metaList.push({ key, value: value as string });
      }
      formData.value = Object.assign({}, val, { metaList });
    }
  } else {
    formData.value = undefined;
  }
}, { immediate: true });

/**
 * 数据交互与处理方法
 */
const handleReset = () => {

};
const handleSubmit = () => {

};

const handlePermAdd = () => {
  if (!formData.value) return;
  if (formData.value.permissionList?.length) {
    formData.value?.permissionList?.push(new TreeNode({
      Name: '',
      Value: '',
    }));
  } else {
    formData.value.permissionList = [{
      Name: '',
      Value: '',
    }];
  }
};

const handleMetaAdd = () => {
  if (!formData.value) return;
  if (formData.value.metaList?.length) {
    formData.value?.metaList?.push({
      key: '',
      value: '',
    });
  } else {
    formData.value.metaList = [{
      key: '',
      value: '',
    }];
  }
};

</script>

<template>
  <div class="w-full h-full overflow-y-auto">
    <template v-if="formData">
      <div class="w-full h-12 flex justify-end pb-4 bg-pixel-matrix sticky top-0">
        <a-button class="ml-auto mr-2" @click="handleReset">重置</a-button>
        <a-button class="mr-2" type="primary" @click="handleSubmit">保存</a-button>
      </div>
      <a-form ref="formRef" :model="formData"
              :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-row>
          <a-divider orientation="left">基本信息</a-divider>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="名称" name="title">
              <a-input v-model:value="formData.title" placeholder="请输入名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="编码" name="actionId">
              <a-input v-model:value="formData.actionId" placeholder="请输入编码" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="类型" name="type">
              <a-select v-model:value="formData.type" placeholder="请选择类型"
                        :options="menuPageTypeOptions"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="父级" name="pId">
              <a-tree-select
                show-arrow
                allow-clear
                show-search
                tree-node-filter-prop="title"
                placeholder="请选择"
                :field-names="fieldNames"
                :tree-data="props.tree"
                v-model:value="formData.pId"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="路径配置" name="url" tooltip="将与父级配置拼接组成地址栏#后显示的地址">
              <a-input v-model:value="formData.url" placeholder="请输入路径" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="图标配置" name="icon">
              <a-input v-model:value="formData.icon" placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="是否启用" name="showInMenu">
              <a-switch v-model:checked="formData.showInMenu"
                        checked-children="是" un-checked-children="否"
              ></a-switch>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="排序" name="sort">
              <a-input v-model:value="formData.sort" placeholder="请输入排序" />
            </a-form-item>
          </a-col>
        </a-row>
        <template v-if="formData.type === MenuPageType.PAGE">
          <a-row>
            <a-col :span="12">
              <a-form-item label="组件配置" name="resource" tooltip="页面组件在 src/views 目录下的路径">
                <a-input v-model:value="formData.resource" placeholder="请输入组件路径" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="重定向" name="redirect">
                <a-input v-model:value="formData.redirect" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="是否固定" name="affix" tooltip="勾选后该页面将被固定在 Tab 栏">
                <a-switch v-model:checked="formData.affix"
                          checked-children="是" un-checked-children="否"
                ></a-switch>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="是否保活" name="keepAlive" tooltip="勾选后当菜单切换时，该页面将被缓存">
                <a-switch v-model:checked="formData.keepAlive"
                          checked-children="是" un-checked-children="否"
                ></a-switch>
              </a-form-item>
            </a-col>
          </a-row>
        </template>
        <template v-else-if="formData.type === MenuPageType.LINK">
          <a-row>
            <a-col :span="12">
              <a-form-item label="外链链接" name="resource">
                <a-input v-model:value="formData.resource" placeholder="请输入链接地址" />
              </a-form-item>
            </a-col>
          </a-row>
        </template>
        <template v-else-if="formData.type === MenuPageType.IFRAME">
          <a-row>
            <a-col :span="12">
              <a-form-item label="IFrame 链接" name="resource">
                <a-input v-model:value="formData.resource" placeholder="请输入链接地址" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="是否保活" name="keepAlive" tooltip="勾选后当菜单切换时，该页面将被缓存">
                <a-switch v-model:checked="formData.keepAlive"
                          checked-children="是" un-checked-children="否"
                ></a-switch>
              </a-form-item>
            </a-col>
          </a-row>
        </template>
        <template v-else-if="formData.type === MenuPageType.DIAGRAM">
        </template>
        <a-row>
          <a-divider orientation="left">权限配置</a-divider>
        </a-row>
        <a-row>
          <InlineEditTable
            class="w-full"
            v-model:data-source="formData.permissionList"
            :columns="permTableColumns"
            @add="handlePermAdd"
          ></InlineEditTable>
        </a-row>
        <a-row>
          <a-divider orientation="left">Meta 配置</a-divider>
        </a-row>
        <a-row>
          <InlineEditTable
            class="w-full"
            v-model:data-source="formData.metaList"
            :columns="metaTableColumns"
            @add="handleMetaAdd"
          ></InlineEditTable>
        </a-row>
      </a-form>
    </template>
    <a-empty v-else class="mt-25%" :image="Empty.PRESENTED_IMAGE_SIMPLE">
      <template #description>
        请在左侧选择菜单
      </template>
    </a-empty>
  </div>
</template>
