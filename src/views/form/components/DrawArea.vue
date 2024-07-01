<script setup lang="ts">

import { Form, FormItem, Tooltip } from "ant-design-vue";
import {
    DeleteOutlined,
    DesktopOutlined,
    EyeOutlined,
    MobileOutlined,
    RedoOutlined,
    UndoOutlined
} from "@ant-design/icons-vue";
import FormComponent from "@/views/form/component/FormComponent.vue";
import { VueDraggable } from "vue-draggable-plus";
</script>

<template>
    <div class="w-form-d-toolbar">
        <div>
            <Tooltip placement="top">
                <template #title>撤销</template>
                <UndoOutlined />
            </Tooltip>
            <Tooltip placement="top">
                <template #title>重做</template>
                <RedoOutlined />
            </Tooltip>
        </div>
        <div>
            <Tooltip placement="top">
                <template #title>电脑端</template>
                <DesktopOutlined />
            </Tooltip>
            <Tooltip placement="top">
                <template #title>手机端</template>
                <MobileOutlined />
            </Tooltip>
        </div>
        <div>
            <Tooltip placement="top">
                <template #title>清空设计</template>
                <div @click="clearForm">
                    <DeleteOutlined />
                    <span>清除</span>
                </div>
            </Tooltip>
            <Tooltip placement="top">
                <template #title>预览表单</template>
                <div @click="previewForm">
                    <EyeOutlined />
                    <span>预览</span>
                </div>
            </Tooltip>
        </div>
    </div>
    <Form
        :labelCol="labelCol"
        :size="_value.conf.size"
        :layout="_value.conf.layout"
        :label-align="_value.conf.labelAlign"
        class="w-form-d-ctx"
    >
        <vue-draggable
            v-model="_value.components"
            :animation="150"
            ghostClass="w-f-cp-select"
            @choose="onChoose"
            @add="showTip = false"
            @remove="showTip = true"
            group="FormDesign"
            class="w-form-d-ctx-ep"
        >
            <template v-for="(cp, i) in _value.components" :key="cp.id">
                <FormItem
                    v-if="!cp.props.isContainer"
                    :label="cp.name"
                    :required="cp.props.required"
                    @click="_onChoose(cp)"
                    :class="{
                'w-form-d-item': true,
                'w-form-cp-active': active?.id === cp.id,
                'w-form-cp-nlb': cp.props.hideLabel,
              }"
                >
                    <form-component
                        :index="i"
                        :parents="_value.components"
                        mode="free"
                        :type="cp.type"
                        :config="cp"
                        :size="_value.conf.size"
                        v-model:active="active"
                    />
                </FormItem>
                <form-component
                    v-else
                    :type="cp.type"
                    class="w-form-d-item"
                    :index="i"
                    :parents="_value.components"
                    :config="cp"
                    :size="_value.conf.size"
                    v-model:active="active"
                    @click="_onChoose(cp)"
                    mode="free"
                    :class="{ 'w-form-d-item': true, 'w-form-cp-active': active?.id === cp.id }"
                />
            </template>
        </vue-draggable>
        <div class="w-form-d-tip" v-if="_showTip">
            <span>💕 请从左侧组件库拖拽表单组件到此处</span>
        </div>
    </Form>
</template>

<style scoped lang="less">

</style>
