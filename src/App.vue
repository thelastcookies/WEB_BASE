<script setup lang="ts">
const { zhCN, designToken, themeAlgo, legacyLogicalPropertiesTransformer } = useTheme();
useEnvironmentCheck();
</script>

<template>
  <a-config-provider
    :locale="zhCN"
    :theme="{
      algorithm: themeAlgo,
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
