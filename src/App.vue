<script setup lang="ts">
import { legacyLogicalPropertiesTransformer } from "ant-design-vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { theme } from 'ant-design-vue';

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const isDarkTheme = ref(darkModeMediaQuery.matches);

darkModeMediaQuery.addEventListener('change', (e) => {
  isDarkTheme.value = e.matches;
  console.log(isDarkTheme.value ? '🌒 深色模式开启' : '🌖 浅色模式开启');
});

const themeAlgo = computed(() => {
  return isDarkTheme.value ? theme.darkAlgorithm : theme.defaultAlgorithm;
});

</script>

<template>
  <a-config-provider
    :locale="zhCN"
    :theme="{algorithm: themeAlgo}"
  >
    <a-style-provider
      :transformers="[legacyLogicalPropertiesTransformer]">
      <a-app w-full h-full>
        <div id="web-app" ref="webApp" class="w-full h-full">
          <RouterView />
        </div>
      </a-app>
    </a-style-provider>
  </a-config-provider>
</template>
