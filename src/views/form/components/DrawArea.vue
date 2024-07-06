<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";
import type { ComponentConfig, ComponentConfigProps, FormConfig } from "@/views/form/types";

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
watch(viewType, type => {
    if (type === "desktop") {
        formConf.value.layout = 'horizontal';
    } else {
        formConf.value.layout = 'vertical';
    }
});

// 清空表单
const handleFormClear = () => {
    compList.value = [];
};

// TODO: 预览功能
const handleFormPreview = () => {
    // previewVisible.value = true;
};

const dragActive = ref(false);
// TODO: 删除所有组件后，编辑提示没有正确显示
const tipVisible = computed(() => {
    return !dragActive.value || compList.length;
});

const handleSelect = (comp: ComponentConfig<ComponentConfigProps>) => {
    currentComp.value = comp;
};

const handleCurrentClear = () => {
    currentComp.value = null;
};

const handleDelete = (key: string) => {
    compList.value = compList.value.filter(item => item.key !== key);
    handleCurrentClear();
};

const handleCopy = (index: number, comp: ComponentConfig<ComponentConfigProps>) => {
    const duplicate = Object.assign(cloneDeep(comp), {
        key: comp.type + '_' + nanoid(8),
        mode: 'edit',
    });
    compList.value.splice(index + 1, 0, duplicate);
};

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
                <a-popconfirm
                    title="确定要清空表单设计区吗？"
                    placement="bottom"
                    @confirm="handleFormClear"
                >
                    <div class="cursor-pointer" >
                        <BaseIcon icon="DeleteOutlined" />
                        <span class="ml-1 mr-2">清空</span>
                    </div>
                </a-popconfirm>
            </a-tooltip>
            <a-tooltip placement="top">
                <template #title>预览表单</template>
                <div class="cursor-pointer" @click="handleFormPreview">
                    <BaseIcon icon="EyeOutlined" />
                    <span class="ml-1">预览</span>
                </div>
            </a-tooltip>
        </div>
    </div>
    <div class="w-full h-[calc(100%-38px)] p-3">
        <a-form
            :class="['draw-area', viewType === 'desktop' ? 'as-desktop': 'as-mobile']"
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
                @click.self="handleCurrentClear"
            >
                <template v-for="(comp, i) in compList" :key="comp.key">
                    <FormComponent
                        :config="comp"
                        :active="currentComp?.key === comp.key"
                        :layout="formConf.layout"
                        @click="handleSelect(comp)"
                        @copy="handleCopy(i, comp)"
                        @delete="handleDelete(comp.key!)"
                    />
                </template>
            </vue-draggable>
            <div v-if="tipVisible" class="draw-tip">
                👈🏻 请从左侧组件库拖拽表单组件到此处
            </div>
        </a-form>
    </div>
</template>

<style scoped lang="less">
.draw-area {
    position: relative;
    overflow-y: auto;
    background-color: var(--colorBgContainer);
}

.as-desktop {
    width: 100%;
    height: 100%;
    border-radius: var(--borderRadiusLG);
    padding: 0.75rem;
}

.as-mobile {
    width: 360px;
    height: 780px;
    margin: 0 auto;
    position: relative;
    padding: 10px;
    box-shadow: 0 8px 40px var(--colorFill);
    border: 10px solid var(--colorBorderSecondary);
    border-radius: 24px;
}

.draw-tip {
    position: absolute;
    width: 290px;
    height: 7rem;
    line-height: 7rem;
    text-align: center;
    left: calc(50% - 145px);
    top: calc(50% - 3.5rem);
    color: var(--colorText);
    border: 1px dashed var(--colorBorder);
    border-radius: var(--borderRadiusLG);
    cursor: grab;

    &:hover {
        border: 1px dashed var(--colorPrimaryBorderHover);
    }
}
</style>
