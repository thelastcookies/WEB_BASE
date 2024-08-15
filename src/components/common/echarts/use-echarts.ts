import type { Ref } from "vue";
import type { EChartsOption } from "echarts";
import type ECharts from "./ECharts.vue";

import echarts from "./echarts";

type EChartsType = typeof ECharts | undefined;

type EchartsThemeType = "dark" | "light" | null;
const { isDarkTheme } = useTheme();

function useEcharts(chartRef: Ref<EChartsType>) {
  let chartInstance: echarts.ECharts | null = null;
  let cacheOptions: EChartsOption = {};

  const { height, width } = useWindowSize();
  const resizeHandler: () => void = useDebounceFn(resize, 200);

  const initCharts = (t?: EchartsThemeType) => {
    const el = chartRef?.value?.$el;
    if (!el) {
      return;
    }
    chartInstance = echarts.init(el, t || isDarkTheme.value ? "dark" : null);

    return chartInstance;
  };

  const renderECharts = (options: EChartsOption, clear = true) => {
    cacheOptions = clear ? options : Object.assign(cacheOptions, options);
    return new Promise((resolve) => {
      if (chartRef.value?.offsetHeight === 0) {
        useTimeoutFn(() => {
          renderECharts(options);
          resolve(null);
        }, 30);
        return;
      }
      nextTick(() => {
        useTimeoutFn(() => {
          if (!chartInstance) {
            const instance = initCharts();
            if (!instance) return;
          }
          clear && chartInstance?.clear();
          chartInstance?.setOption(options);
          resolve(null);
        }, 30);
      });
    });
  };

  function resize() {
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: "quadraticIn",
      },
    });
  }

  watch([width, height], () => {
    resizeHandler?.();
  });

  watch(isDarkTheme, () => {
    if (chartInstance) {
      chartInstance.dispose();
      initCharts();
      renderECharts(cacheOptions);
      resize();
    }
  });

  // watch(
  //   [
  //     () => preferences.sidebar.collapsed,
  //     () => preferences.sidebar.extraCollapse,
  //     () => preferences.sidebar.hidden,
  //     () => preferences.app.contentCompact,
  //   ],
  //   () => {
  //     // 折叠动画200ms
  //     setTimeout(() => {
  //       resize();
  //     }, 200);
  //   },
  // );

  tryOnUnmounted(() => {
    // 销毁实例，释放资源
    chartInstance?.dispose();
  });

  return {
    renderECharts,
    resize,
  };
}

export { useEcharts };

export type { EChartsType };
