import type { AdminResponseBody } from '@/api/admin/types';
import type { HisTagParams, HistoricalRequestBody, IntervalRequestBody } from '@/api/base/historical/types';
import type { ValueResponseBody } from '@/api/base/types';
import { HisDataType } from '@/enums';

export const getHistorical = (data: HistoricalRequestBody) => {
  return usePost<AdminResponseBody<ValueResponseBody>, HistoricalRequestBody>(
    `${ADMIN_URL}/RealTime/GetHst`,
    data,
  );
};

export const getInterval = (data: IntervalRequestBody) => {
  return usePost<AdminResponseBody<ValueResponseBody>, IntervalRequestBody>(
    `${ADMIN_URL}/RealTime/GetInterp`,
    data,
  );
};

/**
 * 获取历史数据
 * @param tags 测点，多个测点中间用|隔开
 * @param st 开始时间
 * @param ed 结束时间，默认为当前时间
 * @param period 间隔，单位为s，默认为30
 * @param type 返回时数据的组织类型，
 *      传参为"TAG"时，按照 tag: [{time: value}, ...] 的格式返回，
 *      传参为"TIME"时，按照 time: [{tag: value}, ...] 的格式返回，
 *      传参为"TIME_VALUE_ARR"时，按照 [[time1, time2, ...], [tag1Value1, tag1Value2, ...], [tag2Value1, tag2Value2, ...]] 的格式返回，如：
 *      默认为"TAG"
 *
 * @param decimal 小数位数，默认为 undefined，即不作处理，用于规范返回数据的小数位数
 */
export const getIntervalData = async (
  {
    tags,
    st,
    ed = dayjs(),
    interval = 30,
    type = HisDataType.TAG,
    decimal,
  }: HisTagParams,
) => {
  let stStr = st.format('YYYYMMDDHHmmss');
  let edStr = ed.format('YYYYMMDDHHmmss');
  const res = await getInterval({
    tags,
    time: stStr + '-' + edStr,
    interval,
  });
  if (!res.Success) return;
  let tagValueArr = res.Data!.values.split('|').map(item => item.split(';'));
  let timeArr: string[] = [];
  for (
    let time = dayjs(st);
    dayjs(time).isSameOrBefore(ed);
    time = time.add(interval, 's')
  ) {
    timeArr.push(time.format('YYYY-MM-DD HH:mm:ss'));
  }
  if (type === HisDataType.TAG) {
    let tagMap: Map<string, Map<string, number>> = new Map();
    tags.split('|').forEach((tag, idx) => {
      let timeValueMap: Map<string, number> = new Map();
      timeArr.forEach((time, tIdx) => {
        let num = 0;
        if (!isNaN(Number(tagValueArr[idx][tIdx]))) {
          num = Number(tagValueArr[idx][tIdx]);
          if (decimal) num = unref(usePrecision(num, decimal));
        }
        timeValueMap.set(time, num);
      });
      tagMap.set(tag, timeValueMap);
    });
    return tagMap;
  } else if (type === HisDataType.TIME) {
    let timeMap: Map<string, Map<string, number>> = new Map();
    timeArr.forEach((time, tIdx) => {
      let tagValueMap: Map<string, number> = new Map();
      tags.split('|').forEach((tag, idx) => {
        let num = 0;
        if (!isNaN(Number(tagValueArr[idx][tIdx]))) {
          num = Number(tagValueArr[idx][tIdx]);
          if (decimal) num = unref(usePrecision(num, decimal));
        }
        tagValueMap.set(tag, num);
      });
      timeMap.set(time, tagValueMap);
    });
    return timeMap;
  } else if (type === HisDataType.TIME_VALUE_ARR) {
    return zip(timeArr, ...tagValueArr);
  }
};
