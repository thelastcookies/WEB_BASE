import type { Ref } from "vue";
import type { EChartsOption } from "echarts";
import type ECharts from "./ECharts.vue";

import echarts from "./echarts";

type EChartsType = typeof ECharts | undefined;

type EchartsThemeType = "dark" | "light" | null;

function useEcharts(chartRef: Ref<EChartsType>) {
  let chartInstance: echarts.ECharts | null = null;
  let cacheOptions: EChartsOption = {};

  // const { isDark } = usePreferences();
  const { height, width } = useWindowSize();
  const resizeHandler: () => void = useDebounceFn(resize, 200);

  const getOptions = computed((): EChartsOption => {
    // if (!isDark.value) {
    //   return cacheOptions;
    // }

    return {
      backgroundColor: "transparent",
      ...cacheOptions,
    };
  });

  const initCharts = (t?: EchartsThemeType) => {
    const el = chartRef?.value?.$el;
    if (!el) {
      return;
    }
    // chartInstance = echarts.init(el, t || isDark.value ? 'dark' : null);
    chartInstance = echarts.init(el);

    return chartInstance;
  };

  const renderEcharts = (options: EChartsOption, clear = true) => {
    cacheOptions = options;
    return new Promise((resolve) => {
      if (chartRef.value?.offsetHeight === 0) {
        useTimeoutFn(() => {
          renderEcharts(getOptions.value);
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
          chartInstance?.setOption(getOptions.value);
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

  // watch(isDark, () => {
  //   if (chartInstance) {
  //     chartInstance.dispose();
  //     initCharts();
  //     renderEcharts(cacheOptions);
  //     resize();
  //   }
  // });

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
    renderEcharts,
    resize,
  };
}

export { useEcharts };

export type { EChartsType };
