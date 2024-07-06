<script setup lang="ts">
/**
 * Sample 页面用于开发时页面/组件的快速测试
 * 位于顶层路由，独立于系统存在
 */
import dayjs from "dayjs";
import type { PickerItem, PickerTopic } from "@/components/slide-picker/types.ts";

// 处理时段选择
const pickerActive = ref(true);
const pickerTopic = ref(null as PickerTopic);
const handleSetDuration = (topic: PickerTopic) => {
  pickerActive.value = false;
  pickerTopic.value = topic;
}
const pickerValue = ref([
  [10, 11, 12],
  [6, 7, 8, 9, 13, 14, 15, 16],
  [2, 3, 4, 5, 17, 18, 19, 20, 21],
  [0, 1, 22, 23],
]);
const durations = computed(() => {
  return {
    // tip: pickerValueToTime(pickerValue.value.tip),
    // peak: pickerValueToTime(pickerValue.value.peak),
    // flat: pickerValueToTime(pickerValue.value.flat),
    // valley: pickerValueToTime(pickerValue.value.valley),
  }
});

const groupByConsecutiveNumbers = (numbers: number[]): number[][] => {
  if (numbers.length === 0) return [];

  numbers.sort((a, b) => a - b);

  let result: number[][] = [];
  let currentGroup: number[] = [numbers[0]];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] === numbers[i - 1] + 1) {
      currentGroup.push(numbers[i]);
    } else {
      result.push(currentGroup);
      currentGroup = [numbers[i]];
    }
  }
  result.push(currentGroup);

  return result;
}

const pickerValueToTime = (arr: number[]) => {
  const groupedArr = groupByConsecutiveNumbers(arr);
  const timeArr = groupedArr.map(item => {
    const st = item[0];
    const ed = item[item.length - 1] + 1;
    return dayjs().startOf('day').add(st, 'hour').format('HH:mm') +
      '-' + dayjs().startOf('day').add(ed, 'hour').format('HH:mm')
  });
  return timeArr.join(',');
}

const max = 24;
const step = 24 / max * 60;

// const marks = ref<Record<number, any>>({
//     0: '0°C',
//     26: '26°C',
//     37: '37°C',
//     100: {
//         style: {
//             color: '#F50',
//         },
//         label: '100°C',
//     },
// });

const picker = [{
  key: 'tip',
  label: '主题一',
  color: '#FFF'
}, {
  key: 'tip',
  label: '主题二',
  color: '#000'
}, {
  key: 'tip',
  label: '主题三',
}, {
  key: 'tip',
  label: '主题四',
}, {
  key: 'tip',
  label: '主题五',
}, {
  key: 'tip',
  label: '主题六',
}, {
  key: 'tip',
  label: '主题七',
}, {
  key: 'tip',
  label: '主题八',
}] as PickerItem[];

</script>
<template>
  <div class="w-full flex justify-center">
    <!--        <button class="mr-8" @click="handleSetDuration('topic0')">尖 {{ durations.tip }}</button>-->
    <!--        <button class="mr-8" @click="handleSetDuration('topic1')">峰 {{ durations.peak }}</button>-->
    <!--        <button class="mr-8" @click="handleSetDuration('topic2')">平 {{ durations.flat }}</button>-->
    <!--        <button class="mr-8" @click="handleSetDuration('topic3')">谷 {{ durations.valley }}</button>-->
    {{ pickerValue }}
  </div>
  <div class="w-full flex justify-center">
    <SlidePicker
      :picker="picker"
      v-model:value="pickerValue"
      :max="max"
      :topic="pickerTopic"
      mark-type="center"
    >
      <template #mark="{ value, index }">
        {{ dayjs().startOf('day').add(index, 'hour').format('HH:mm') }}
      </template>
    </SlidePicker>
  </div>
</template>
