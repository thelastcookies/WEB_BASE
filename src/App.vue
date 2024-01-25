<script setup lang="ts">
import {legacyLogicalPropertiesTransformer} from "ant-design-vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const msgContextHolder = inject(MsgContextHolderInjectionKey) as Function;
const notiContextHolder = inject(NotiContextHolderInjectionKey) as Function;

</script>

<template>
    <a-config-provider
        :locale="zhCN">
        <a-style-provider
            :transformers="[legacyLogicalPropertiesTransformer]">
            <div id="app" ref="app">
                <msg-context-holder />
                <noti-context-holder />
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
