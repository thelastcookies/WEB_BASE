<script setup lang="ts">
import {legacyLogicalPropertiesTransformer} from "ant-design-vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import {theme} from 'ant-design-vue';

const themeAlgo = theme.defaultAlgorithm;
// const themeAlgo = theme.darkAlgorithm;

const isDarkTheme = ref(true);

</script>

<template>
    <a-config-provider
        :locale="zhCN"
        :theme="{algorithm: themeAlgo}"
    >
        <a-style-provider
            :transformers="[legacyLogicalPropertiesTransformer]">
            <a-app w-full h-full>
                <div id="app" ref="app">
                    <RouterView/>
                </div>
                <div class="absolute right-0 bottom-0">
                    <a-switch v-model:checked="isDarkTheme" >
                        <template #checkedChildren><BaseIcon type="image" size="18" icon="~/icons/light-mode.svg" /></template>
                        <template #unCheckedChildren><BaseIcon type="image" size="18" icon="~/icons/dark-mode.svg" /></template>
                    </a-switch>
                </div>
            </a-app>
        </a-style-provider>
    </a-config-provider>
</template>

<style scoped lang="less">
</style>
