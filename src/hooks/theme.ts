import { legacyLogicalPropertiesTransformer, theme } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import designToken from "@/assets/theme/design-token.ts";

export const useTheme = () => {
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const isDarkTheme = ref(darkModeMediaQuery.matches);

  darkModeMediaQuery.addEventListener("change", (e) => {
    isDarkTheme.value = e.matches;
    console.log(isDarkTheme.value ? "🌒 深色模式开启" : "🌖 浅色模式开启");
  });

  const themeAlgo = computed(() => {
    return isDarkTheme.value ? theme.darkAlgorithm : theme.defaultAlgorithm;
  });

  return { zhCN, themeAlgo, designToken, legacyLogicalPropertiesTransformer };
};

