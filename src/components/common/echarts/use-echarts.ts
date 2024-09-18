import echarts from './echarts';
import type { Ref } from 'vue';
import type { EChartsOption } from 'echarts/types/dist/shared';

type EchartsThemeType = 'dark' | 'light' | null;
const { isDarkTheme } = storeToRefs(useThemeStore());

export function useECharts(chartRef: Ref<ComponentPublicInstance | undefined>) {
  let chartInstance: echarts.ECharts | null = null;
  let cacheOptions: EChartsOption = {};

  const initCharts = (t?: EchartsThemeType) => {
    const el = chartRef?.value?.$el;
    if (!el) {
      return;
    }
    chartInstance = echarts.init(el, t || isDarkTheme.value ? 'dark' : null);
    return chartInstance;
  };

  const renderECharts = (options: EChartsOption, notMerge: boolean = false, replaceMerge?: string | string[]) => {
    return new Promise((resolve) => {
      nextTick(() => {
        useTimeoutFn(() => {
          if (!chartInstance) {
            const instance = initCharts();
            if (!instance) return;
          }
          chartInstance?.setOption(options, { notMerge, replaceMerge });
          cacheOptions = merge(cacheOptions, options);
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
        easing: 'quadraticIn',
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
