import type { EChartsOption } from "echarts";

export const generalLineChartOption = <EChartsOption>{
  grid: { top: "50px", bottom: "20px", left: "30px", right: "20px" },
  // color: ["#1C84EC", "#3DEEC9", "#0D56A0", "#099175", "#1A65B2", "#00A2A1"],
  // textStyle: {
  //   color: "rgba(255, 255, 255, 0.8)",
  // },
  legend: {
    itemWidth: 10,
    itemHeight: 10,
    top: "20px",
    // textStyle: {
    //   color: "rgba(255, 255, 255, 0.8)",
    // },
  },
  tooltip: {
    trigger: "axis",
    // backgroundColor: "rgba(18, 43, 58, 0.8)",
    // color: "black",
    textStyle: {
      // color: "#FFF",
      align: "left",
    },
    axisPointer: {
      type: "cross",
      crossStyle: {
        // color: "#999",
      },
    },
    valueFormatter: (value: string | number | null | undefined) =>
      isNaN(Number(value)) ? "-" : usePrecision(Number(value), 2),
  },
  xAxis: {
    type: "category",
    gridIndex: 0,
    axisTick: { show: false },
    axisLabel: {},
  },
  yAxis: {
    type: "value",
    gridIndex: 0,
    axisTick: { show: false },
    axisLabel: {
      hideOverlap: true,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
      },
    },
  },
};
