<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";
import type { ComponentConfig, ComponentConfigProps, FormConfig } from "@/views/form/types";

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

function previewForm() {
    // previewVisible.value = true;
}

const compList = defineModel<ComponentConfig<ComponentConfigProps>[]>('compList', {
    default: [],
});
const currentComp = defineModel<ComponentConfig<ComponentConfigProps>>('currentComp');

const formConf = defineModel<FormConfig>('formConf', {
    default: {
        layout: 'horizontal',
        labelAlign: 'right',
        labelWidth: 100,
    },
});

const viewType = ref("desktop" as "desktop" | "mobile");

const handleSelect = (comp: ComponentConfig) => {
    currentComp.value = comp;
};

const dragActive = ref(false);
const tipVisible = computed(() => {
    return !dragActive.value || compList.length;
});

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
                <div @click="clearForm">
                    <BaseIcon icon="DeleteOutlined" />
                    <span class="ml-1 mr-2">清除</span>
                </div>
            </a-tooltip>
            <a-tooltip placement="top">
                <template #title>预览表单</template>
                <div @click="previewForm">
                    <BaseIcon icon="EyeOutlined" />
                    <span class="ml-1">预览</span>
                </div>
            </a-tooltip>
        </div>
    </div>
    <div class="w-full h-[calc(100%-38px)] p-3">
        <a-form
            class="w-full h-full bg-ant.bg-container border-rd-2 relative p-3"
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
            >
                <template v-for="(comp, i) in compList" :key="comp.key">
                    <template v-if="comp.props && !('isContainer' in comp.props)">
                        <a-form-item
                            :label="comp.name"
                            :required="comp.props.required"
                            @click="handleSelect(comp)"
                        >
                            <FormComponent
                                :index="i"
                                :config="comp"
                                @click="handleSelect(comp)"
                            />
                        </a-form-item>
                    </template>
                    <template v-else>
                        <FormComponent
                            :index="i"
                            :config="comp"
                            @click="handleSelect(comp)"
                        />
                        <!--                    <FormComponent-->
                        <!--                        :type="comp.type"-->
                        <!--                        class="w-form-d-item"-->
                        <!--                        :index="i"-->
                        <!--                        :parents="compList"-->
                        <!--                        :config="comp"-->
                        <!--                        :size="formConf.size"-->
                        <!--                        v-model:active="currentComp"-->
                        <!--                        @click="handleSelect(comp)"-->
                        <!--                        mode="free"-->
                        <!--                        :class="{ 'w-form-d-item': true, 'w-form-cp-active': currentComp?.key === comp.key }"-->
                        <!--                    />-->
                    </template>
                </template>
            </vue-draggable>
            <div v-if="tipVisible"
                 class="absolute top-50% color-ant.text absolute px-20px py-35px
                 border border-ant.primary-border border-dashed border-rd-2xl">
                👈🏻 请从左侧组件库拖拽表单组件到此处
            </div>
        </a-form>
    </div>
</template>

<style scoped lang="less">
.w-form-d-toolbar {
    display: flex;
    //height: @tool-nav-height;
    align-items: center;
    background: white;
    position: relative;
    padding: 0 20px;

    .w-f-d-t-active {
        color: #656363;
    }

    & > div {
        color: #989898;
        font-size: medium;

        & > * {
            padding: 2px;
            margin: 0 5px;
            cursor: pointer;

            &:focus {
                outline: none;
            }

            &:hover {
                color: #656363;
            }
        }
    }

    & > div:nth-child(2) {
        margin-left: 20px;
    }

    & > div:nth-child(3) {
        font-size: small;
        position: absolute;
        right: 20px;
        display: flex;

        & > div {
            display: flex;
            align-items: center;

            span {
                margin-left: 5px;
            }
        }

        & > div:first-child {
            color: var(--el-color-danger);
        }

        & > div:last-child {
            color: var(--el-color-primary);
        }
    }
}

.w-form-d-item {
    position: relative;
    border: 1px dashed white;
}

.w-form-d-item:hover {
    border: 1px dashed #8D8D8D;
}

.w-form-cp-active {
    border: 1px dashed var(--el-color-primary) !important;
}

.w-f-cp-select {
    //border-radius: 2px;
    //border: 1px dashed var(--el-color-primary) !important;
}

.w-form-d-ctx {
    margin: 10px;
    padding: 5px;
    position: relative;
    background-color: white;
    border-radius: 5px;
    min-height: calc(100vh - 220px);

    .w-form-d-tip {
        padding: 20px;
        color: #8D8D8D;
        position: relative;
        display: flex;
        justify-content: center;

        span {
            position: absolute;
            top: -25vh;
        }
    }

    :deep(.w-form-d-ctx-ep) {
        min-height: 80%;
    }
}
</style>
