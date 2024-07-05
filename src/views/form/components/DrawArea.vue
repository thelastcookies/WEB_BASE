<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";
import type { ComponentConfig, ComponentConfigProps, FormConfig } from "@/views/form/types";

// TODO：表单的多端展示功能

// TODO: 清空表单
function clearForm() {
    // createConfirm.confirm('您确定要清空表单设计区吗?', '提醒', {
    //   confirmButtonText: '我再想想',
    //   cancelButtonText: '确认清空',
    //   type: 'warning',
    // }).catch(() => {
    //   addHis(deepCopy(_value.value.components));
    //   _value.value.components.length = 0;
    // });
}
// TODO: 预览功能
function previewForm() {
    // previewVisible.value = true;
}

const compList = defineModel<ComponentConfig<ComponentConfigProps>[]>('compList', {
    default: [],
});
const currentComp = defineModel<ComponentConfig<ComponentConfigProps> | null>('currentComp');

const formConf = defineModel<FormConfig>('formConf', {
    default: {
        layout: 'horizontal',
        labelAlign: 'right',
        labelWidth: 100,
    },
});

const viewType = ref("desktop" as "desktop" | "mobile");

const dragActive = ref(false);
// TODO: 删除所有组件后，编辑提示没有正确显示
const tipVisible = computed(() => {
    return !dragActive.value || compList.length;
});

const handleSelect = (comp: ComponentConfig<ComponentConfigProps>) => {
    currentComp.value = comp;
};

const clearCurrent = () => {
    currentComp.value = null;
};

const handleDelete = (key: string) => {
    compList.value = compList.value.filter(item => item.key !== key);
    clearCurrent();
}

const handleCopy = (index: number, comp: ComponentConfig<ComponentConfigProps>) => {
    const duplicate = Object.assign(cloneDeep(comp), {
        key: comp.type + '_' + nanoid(8),
        mode: 'edit',
    });
    compList.value.splice(index + 1, 0, duplicate);
}

</script>

<template>
    <div class="w-full h-38px flex-sb border-b border-ant.border border-b-solid px-3">
        <div class="flex-sb w-12">
            <a-tooltip placement="top">
                <template #title>电脑端</template>
                <BaseIcon
                    icon="DesktopOutlined" size="1.2"
                    :class="{'color-ant.primary-text' : viewType === 'desktop'}"
                    @click="viewType = 'desktop'"
                />
            </a-tooltip>
            <a-tooltip placement="top">
                <template #title>手机端</template>
                <BaseIcon
                    icon="MobileOutlined" size="1.2"
                    :class="{'color-ant.primary-text' : viewType === 'mobile'}"
                    @click="viewType = 'mobile'"
                />
            </a-tooltip>
        </div>
        <div class="flex">
            <a-tooltip placement="top">
                <template #title>清空表单</template>
                <div class="cursor-pointer" @click="clearForm">
                    <BaseIcon icon="DeleteOutlined" />
                    <span class="ml-1 mr-2">清除</span>
                </div>
            </a-tooltip>
            <a-tooltip placement="top">
                <template #title>预览表单</template>
                <div class="cursor-pointer" @click="previewForm">
                    <BaseIcon icon="EyeOutlined" />
                    <span class="ml-1">预览</span>
                </div>
            </a-tooltip>
        </div>
    </div>
    <div class="w-full h-[calc(100%-38px)] p-3">
        <a-form
            class="w-full h-full bg-ant.bg-container border-rd-2 relative p-3 overflow-y-auto"
            :labelCol="{style: {width: formConf.labelWidth + 'px'}}"
            :size="formConf.size"
            :layout="formConf.layout"
            :label-align="formConf.labelAlign"
        >
            <vue-draggable
                v-model="compList"
                :animation="200"
                @add="dragActive = true"
                @remove="dragActive = false"
                ghostClass="w-f-cp-select"
                group="FormDesigner"
                class="w-full h-full"
                @click.self="clearCurrent"
            >
                <template v-for="(comp, i) in compList" :key="comp.key">
                    <template v-if="comp.props && !('isContainer' in comp.props)">
                        <a-form-item
                            :class="{'form-item-active': currentComp?.key === comp.key}"
                            :label="comp.name"
                            :required="comp.props.required"
                            @click="handleSelect(comp)"
                        >
                            <FormComponent
                                :config="comp"
                                :active="currentComp?.key === comp.key"
                                @copy="handleCopy(i, comp)"
                                @delete="handleDelete(comp.key!)"
                            />
                        </a-form-item>
                    </template>
                    <template v-else>
                        <!--                        <FormComponent-->
                        <!--                            :config="comp"-->
                        <!--                            @click="handleSelect(comp)"-->
                        <!--                        />-->
                    </template>
                </template>
            </vue-draggable>
            <div v-if="tipVisible"
                 class="absolute w-290px h-28 line-height-28 text-center
                 left-[calc(50%-145px)] top-[calc(50%-3.5rem)] color-ant.text
                 border border-ant.primary-border border-dashed border-rd-2xl cursor-grab">
                👈🏻 请从左侧组件库拖拽表单组件到此处
            </div>
        </a-form>
    </div>
</template>

<style scoped lang="less">
.ant-form-item {
    margin-bottom: 0;
    padding: 12px 12px 12px;
    border: 1px dashed transparent;
    border-radius: 0.5rem;
    transition: border-color var(--motionDurationMid);

    &:hover {
        border: 1px dashed var(--colorPrimaryBorderHover);
    }

    :deep(.ant-form-item-label) {
        cursor: grab;

        label {
            cursor: grab;
        }
    }
}

.form-item-active {
    border: 1px dashed var(--colorPrimaryBorder);
}
</style>
