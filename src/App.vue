<script setup lang="ts">
import {legacyLogicalPropertiesTransformer} from "ant-design-vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>

<template>
    <a-config-provider
        :locale="zhCN">
        <a-style-provider
            :transformers="[legacyLogicalPropertiesTransformer]">
            <div id="app" ref="app">
                <Suspense>
                    <router-view/>
                    <template #fallback>
                        Loading...
                    </template>
                </Suspense>
            </div>
        </a-style-provider>
    </a-config-provider>
</template>

<style scoped lang="less">
</style>
