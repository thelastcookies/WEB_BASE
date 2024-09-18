import type { EChartsOption } from 'echarts/types/dist/shared';

export const generalLineChartOption = <EChartsOption>{
  grid: { top: '60px', bottom: '30px', left: '40px', right: '20px' },
  legend: {
    itemWidth: 10,
    itemHeight: 10,
    top: '20px',
  },
  tooltip: {
    trigger: 'axis',
    textStyle: {
      align: 'left',
    },
    axisPointer: {
      type: 'cross',
    },
  },
  xAxis: {
    type: 'category',
    gridIndex: 0,
    axisTick: { show: false },
    axisLabel: {},
  },
  yAxis: {
    type: 'value',
    gridIndex: 0,
    axisTick: { show: false },
    axisLabel: {
      hideOverlap: true,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
  },
};
