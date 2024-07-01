<script setup lang="ts">

import { FormComponentConfigs } from "@/views/form/FormComponents.ts";
</script>

<template>
    <Form
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
    >
        <a-tabs v-model:activeKey="settTabActiveKey" centered>
            <a-tab-pane tab="组件设置" key="comp">
                <div style="padding: 10px" v-if="active">
                    <component :is="FormComponentConfigs[active.type]" :config="active" />
                </div>
            </a-tab-pane>
            <a-tab-pane tab="表单设置" key="form">
                <div style="padding: 10px">
                    <a-form-item label="标签布局">
                        <a-radio-group v-model:value="_value.conf.layout" button-style="solid">
                            <a-radio-button value="horizontal">水平</a-radio-button>
                            <a-radio-button value="vertical">垂直</a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="标签对齐">
                        <a-radio-group v-model:value="_value.conf.labelAlign" button-style="solid">
                            <a-radio-button value="left">靠左</a-radio-button>
                            <a-radio-button value="right">靠右</a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="标签宽度">
                        <a-input-number v-model:value="_value.conf.labelWidth"></a-input-number>
                    </a-form-item>
                    <a-form-item label="组件尺寸">
                        <a-radio-group v-model:value="_value.conf.size" button-style="solid">
                            <a-radio-button value="large">大</a-radio-button>
                            <a-radio-button value="default">中</a-radio-button>
                            <a-radio-button value="small">小</a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                </div>
            </a-tab-pane>
        </a-tabs>
    </Form>
</template>

<style scoped lang="less">

</style>
