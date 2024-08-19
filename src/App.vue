<script setup lang="ts">
import { legacyLogicalPropertiesTransformer } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
const { designToken, themeAlgorithm } = storeToRefs(useThemeStore());

useEnvironmentCheck();
</script>

<template>
  <a-config-provider
    :locale="zhCN"
    :theme="{
      algorithm: themeAlgorithm,
      token: designToken,
    }"
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
