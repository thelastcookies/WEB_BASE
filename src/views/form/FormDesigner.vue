<script setup lang="ts">
import { ref } from 'vue';
import { ComponentConfig, type ComponentConfigProps, FormConfig } from "@/views/form/types";

/**
 * 待完善：
 * 拖拽表单组件后立马 active
 * 删除所有组件后，编辑提示没有正确显示
 * 预览功能，清除功能
 * 更多表单组件
 * 表单的多端展示功能
 * 历史编辑功能
 * 表单验证功能
 */

const compList = ref([] as ComponentConfig<ComponentConfigProps>[]);
const currentComp = ref({} as ComponentConfig<ComponentConfigProps>);
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
            <DrawArea v-model:comp-list="compList" v-model:current-comp="currentComp" :form-conf="formConf" />
        </main>
        <aside class="w-300px h-full border-l border-ant.border border-l-solid">
            <CompSetts v-model:comp-conf="currentComp" v-model:form-conf="formConf" />
        </aside>
    </div>
</template>
