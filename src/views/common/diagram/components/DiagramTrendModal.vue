<script setup lang="ts">

import { HisDataType } from '@/enums';
import type { QueryFormField } from '@/components/common/query-form/types';
import type QueryForm from '@/components/common/query-form/QueryForm.vue';
import type { Recordable } from '@/types';

const open = defineModel('open', { default: false });

const props = defineProps<{
  tags?: string[];
}>();

const emit = defineEmits<{
  (e: 'submit'): void
}>();

const loading = ref<boolean>(false);

const tagStatList = ref<{
  nodeTag: string;
  max: number;
  min: number;
  avg: number;
}[]>([]);

const qForm = ref<Recordable<any>>({
  time: [dayjs().subtract(2, 'hours'), dayjs()],
  multiCheck: [],
});
const queryFields: QueryFormField[] = [
  {
    field: 'time',
    component: 'RangePicker',
    labelCol: { span: 4 },
    wrapperCol: { span: 24 },
    compProps: {
      placeholder: ['请选择开始时间', '请选择结束时间'],
      showTime: { defaultValue: dayjs('00:00:00', 'HH:mm:ss') },
    },
  },
  {
    field: 'multiCheck',
    component: 'Checkbox',
    compProps: {
      options: [{
        label: '多坐标轴',
        value: 'multiCheck',
      }],
    },
  },
];

watch(open, (v) => {
  if (v && props.tags) {
    fetch();
  }
});

// ECharts 初始化
const chartRef = ref<ComponentPublicInstance>();
const { renderECharts, setEChartsLoading } = useECharts(chartRef!);

const fetch = async () => {
  if (!props.tags) return;
  setEChartsLoading(true);
  const data = await getTrendData({
    tags: props.tags.join('|'),
    st: qForm.value.time[0],
    ed: qForm.value.time[1],
    interval: 60,
    type: HisDataType.TIME_VALUE_ARR,
  });

  tagStatList.value = [];
  props.tags.forEach((item, index) => {
    const tagValue = data.map((it: string[]) => isNaN(Number(it[index + 1])) ? 0 : Number(it[index + 1]));
    const sm = sum(tagValue);
    const avg = unref(usePrecision(sm / tagValue.length, 2));
    tagStatList.value.push({
      nodeTag: item,
      max: max(tagValue),
      min: min(tagValue),
      avg,
    });
  });

  const multiCheck = qForm.value.multiCheck?.includes('multiCheck');

  const yAxisItem = {
    type: 'value',
    position: 'left',
    axisTick: { show: false },
    alignTicks: true,
    axisLabel: {
      hideOverlap: true,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
  };

  await renderECharts(merge({}, generalLineChartOption, {
    grid: {
      left: multiCheck ? 40 + (props.tags.length - 1) * 30 + 'px' : '40px',
    },
    legend: {
      data: props.tags.map(item => {
        return { name: item, icon: 'rect' };
      }),
    },
    yAxis: multiCheck ? props.tags.map((_, index) => {
      return Object.assign({}, yAxisItem, {
        // name: item,
        offset: 30 * index,
      });
    }) : [yAxisItem],
    series: props.tags.map((item, index) => {
      let series = {
        name: item,
        type: 'line',
        symbol: 'none',
      };
      if (multiCheck) {
        series = Object.assign(series, {
          yAxisIndex: index,
        });
      }
      return series;
    }),
    dataset: {
      source: data,
    },
  }), true);
  setEChartsLoading(false);
};

</script>

<template>
  <a-modal v-model:open="open"
    title="测点趋势"
    width="1100px"
    :confirm-loading="loading"
    :footer="null"
  >
    <QueryForm class="pt-4 pb-1 sticky top-0 z-12"
      :fields="queryFields"
      v-model:form="qForm"
      @query="fetch"
      :itemInLine="3">
    </QueryForm>
    <ECharts class="h-500px" ref="chartRef" />
    <a-descriptions v-if="tagStatList.length"
      mt-3 bordered :column="4"
    >
      <template v-for="item in tagStatList">
        <a-descriptions-item label="测点">{{ item.nodeTag }}</a-descriptions-item>
        <a-descriptions-item label="平均值">{{ item.avg }}</a-descriptions-item>
        <a-descriptions-item label="最大值">{{ item.max }}</a-descriptions-item>
        <a-descriptions-item label="最小值">{{ item.min }}</a-descriptions-item>
      </template>
    </a-descriptions>
  </a-modal>
</template>
