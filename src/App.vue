<script setup lang="ts">
import { legacyLogicalPropertiesTransformer, notification } from "ant-design-vue";
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

const { userAgent } = useAppStore();
const browser = userAgent.getBrowser();
if (
  (browser.name === 'Chrome' && Number(browser.version?.split('.')[0]) < 90)
  || (browser.name === 'Microsoft Edge' && Number(browser.version?.split('.')[0]) < 90)
  || (browser.name === 'Safari' && Number(browser.version?.split('.')[0]) < 14)
) {
  notification.warning( {
    message: "浏览器版本过低",
    description: `当前浏览器版本过低，可能会导致页面显示不正确或功能无法正常使用。
    为了获得最佳体验，请将浏览器升级到推荐版本以上。感谢您的理解与支持。`,
    duration: 10,
  });
}
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
