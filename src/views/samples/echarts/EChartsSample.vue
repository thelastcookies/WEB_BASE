<script lang="ts" setup>
import type { EChartsType } from "@/components/common/echarts";

const chartRef = ref<EChartsType>();
const { renderECharts } = useEcharts(chartRef);

onMounted(async () => {
  await renderECharts(generalLineChartOption);
  await renderECharts(
    {
      legend: {
        data: [
          { name: "实时负荷", icon: "rect" },
          { name: "预测负荷", icon: "rect" },
        ],
      },
      yAxis: {
        name: "MW",
      },
      xAxis: {},
      series: [
        {
          name: "实时负荷",
          type: "line",
          symbol: "none",
        },
        {
          name: "预测负荷",
          type: "line",
          step: "start",
          connectNulls: true,
        },
      ],
    });
});

const dataMap = ref<any>();

const getHistoricalData = async () => {
  const startTime = dayjs().startOf("day");
  const map = await getTrendData({
    tags: "tag1|tag2",
    st: startTime,
    interval: 1000,
    type: HisDataType.TIME,
  });
  if (!map) return;
  const data: (string | number)[][] = [];
  map.forEach((tagValue, time) => {
    let arr: number[] = [];
    tagValue.forEach((value, tag) => {
      arr.push(value);
    });
    data.push([dayjs(time).format("HH:mm:ss"), ...arr]);
  });
  dataMap.value = map;
  console.log(data);
  const options = {
    dataset: {
      source: data,
    },
  };
  await renderECharts(options);
};

getHistoricalData();

</script>

<template>
  <div class="w-full h-full">
    <div class="w-full h-300px flex p-8">
      <ECharts class="w-50%" ref="chartRef" />
      <div class="w-50% h-full pl-8 overflow-y-auto">
        <div class="text-5 sticky top-0 bg-pixel-matrix">DataMap</div>
        <div v-for="(item, key) in dataMap" class=""> {{ item }}</div>
      </div>
    </div>
  </div>
</template>
