<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import componentMixin from './FormComponentMixin.ts';
// import FormRender from './FormRender.vue';
// import WDialog from '../../common/WDialog.vue';
// import FormComponent from './component/FormComponent.vue';
// import { formJson } from './FormInterface.ts';
// import { useMessage } from '/@/hooks/web/useMessage';
import * as icons from "@ant-design/icons-vue";
import { ComponentConfig, FormConfig } from "@/views/form/types";

// const { createConfirm } = useMessage();

// //保存编辑历史
// const history = [];
//
// const pcMode = ref(true);
// const showTip = ref(true);
// const active = ref({});
// const previewVisible = ref(false);
// const formData = ref({});
//
// defineExpose({ validate });
// const props = defineProps({
//     ...componentMixin.props,
//     modelValue: {
//         type: Object,
//         default: () => {
//             return {
//                 conf: {
//                     labelWidth: 100, //标签宽度，
//                     size: 'default',
//                     layout: 'horizontal',
//                     labelAlign: 'right',
//                 },
//                 components: [],
//             };
//         },
//     },
// });
// const emit = defineEmits([...componentMixin.emits]);
// const _value = computed(componentMixin.computed._value(props, emit));
// const _showTip = computed(() => {
//     return showTip.value && _value.value.components.length === 0;
// });
// //初始化设置表单数据
// onMounted(() => {
//     formJson.value = _value.value.components;
// });
//
// watch(
//     () => _value.value.components,
//     () => {
//         formJson.value = _value.value.components;
//     },
//     { deep: true },
// );
//
//
//
// function addHis(v) {
//     history.push(v);
//     if (history.length >= 50) {
//         history.splice(0, 1);
//     }
// }
//
// function onChoose(ev) {
//     //activeKey.value = ev.oldIndex
//     console.log(ev);
// }
//

//

//
// function validate() {
//     return new Promise((resolve, reject) => {
//         if (_value.value.components.length > 0) {
//             resolve();
//         } else {
//             reject(['表单组件为空']);
//         }
//     });
// }
//

const compList = ref([] as ComponentConfig[]);
const currentComp = ref({} as ComponentConfig);
const formConf = ref({
    layout: 'horizontal',
    labelAlign: 'right',
    labelWidth: 100,
    size: undefined,
} as FormConfig);

</script>

<template>
    <div class="w-full h-full flex border border-ant.border border-solid">
        <aside class="w-300px h-full border-r border-ant.border border-r-solid">
            <CompLib />
        </aside>
        <main class="h-full w-[calc(100%-602px)]">
            <DrawArea v-model:comp-list="compList" :current-comp="currentComp" :form-conf="formConf" />
        </main>
        <aside class="w-300px h-full border-l border-ant.border border-l-solid">
            <CompSetts v-model:comp-conf="currentComp" v-model:form-conf="formConf" />
        </aside>
    </div>
</template>

<style lang="less" scoped>
@tool-nav-height: 35px;

.w-form-designer {
    --el-border-color: #DCDFE6;
    --el-text-color-primary: #303133;
    --el-color-primary-light-9: #ECF5FF;
    --el-color-primary: #1989FA;
    --el-color-danger: #F56C6C;
    --el-color-success: #35B881;
    --el-color-warning: #F78F5F;
    --el-color-primary-light-3: #79BBFF;
    //font-size: var(--el-font-size-base);
    //color: var(--el-text-color);
}


.w-form-d-lib {
    border-right: 1px solid var(--el-border-color);
}

:deep(.w-form-d-conf) {
    border-left: 1px solid var(--el-border-color);

    .el-tabs__header {
        background-color: white;

        .el-tabs__nav {
            height: calc(@tool-nav-height);
        }

        .el-tabs__item {
            font-size: small;
            height: calc(@tool-nav-height);
        }
    }
}

.w-cp-lib,
.w-cp-conf {
    font-size: small;

    & > div:first-child {
        height: @tool-nav-height;
        line-height: @tool-nav-height;
        text-align: center;
        background: white;
    }

    & > div:last-child {
        padding: 0 15px;
    }
}

.w-cp-group {
    & > div:first-child {
        padding: 15px 0;
    }

    .w-cp-items {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
}

.w-cp-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    background: white;
    width: 130px;
    border: 1px solid white;
    margin-bottom: 5px;
    color: var(--el-text-color-primary);

    & > span {
        margin-left: 5px;
    }

    &:hover {
        background-color: var(--el-color-primary-light-9);
        border-color: var(--el-color-primary);
        color: var(--el-color-primary);
        cursor: grab;
    }
}



</style>
