import echarts from "./echarts";
import type { Ref } from "vue";
import type { ECBasicOption } from "echarts/types/dist/shared";
import type ECharts from "./ECharts.vue";

type EChartsType = typeof ECharts | undefined;

type EchartsThemeType = "dark" | "light" | null;
const { isDarkTheme } = useTheme();

function useEcharts(chartRef: Ref<EChartsType>) {
  let chartInstance: echarts.ECharts | null = null;
  let cacheOptions: ECBasicOption = {};

  const initCharts = (t?: EchartsThemeType) => {
    const el = chartRef?.value?.$el;
    if (!el) {
      return;
    }
    chartInstance = echarts.init(el, t || isDarkTheme.value ? "dark" : null);
    return chartInstance;
  };

  const renderECharts = (options: ECBasicOption, clear = false) => {
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
          cacheOptions = chartInstance?.getOption()!;
          resolve(null);
        }, 30);
      });
    });
  };

  watch(isDarkTheme, () => {
    if (chartInstance) {
      chartInstance.dispose();
      initCharts();
      renderECharts(cacheOptions);
      resize();
    }
  });

  const resize = useDebounceFn(() => {
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: "quadraticIn",
      },
    });
  }, 200);
  useResizeObserver(chartRef as unknown as Ref<HTMLElement>, () => {
    resize();
  });

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
