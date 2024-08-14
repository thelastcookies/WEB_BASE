import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

import { BarChart, LineChart, PieChart, RadarChart } from "echarts/charts";
import {
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
} from "echarts/components";

// 常用的组件
echarts.use([
  // Renderer
  CanvasRenderer,
  // 各组件
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  // 数据集
  DatasetComponent,
  // 数据转换器
  TransformComponent,
  // 各图表类型
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
]);

export default echarts;
