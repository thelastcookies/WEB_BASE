<script setup lang="ts">
import {legacyLogicalPropertiesTransformer, message} from "ant-design-vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';

</script>

<template>
    <a-config-provider
        :locale="zhCN">
        <a-style-provider
            :transformers="[legacyLogicalPropertiesTransformer]">
            <a-app w-full h-full>
                <div id="app" ref="app">
                    <RouterView/>
                </div>
            </a-app>
        </a-style-provider>
    </a-config-provider>
</template>

<style scoped lang="less">
</style>
