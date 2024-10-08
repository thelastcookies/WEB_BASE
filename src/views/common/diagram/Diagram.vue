<script setup lang="ts">
import { message } from 'ant-design-vue';
import type { HTContextMenuConfig } from '@/types/diagram/widget/context-menu';
import { getNodeTags, setNodeStatusByValue } from '@/views/common/diagram/ht-extends.ts';
import { getTrendData, type TrendTimeTag } from '@/api/base/historical';
import { HisDataType } from '@/enums';

const route = useRoute();
const href = computed(() => (route?.meta as any)?.href);
const name = computed(() => (route?.meta as any)?.name);

const dmContainer = ref<HTMLElement>();
const loading = ref(true);

let dataModel: ht.DataModel;
let graphView: ht.graph.GraphView;

const FIT_CONTENT = true;

const nodeTagArr = ref<string[]>([]);

// 历史回放相关
const timeSliderOpen = ref(false);
const hisTimeRange = ref([dayjs().subtract(2, 'h'), dayjs()]);
const timeSliderValue = ref(0);
const timeSliderData = ref<TrendTimeTag[]>();

const preprocessHref = (href: string) => {
  return href.startsWith('/') ? '/diagrams' + href : '/diagrams/' + href;
};

// 实时数据请求定时器
const { pause, resume } = useIntervalFn(() => {
  getRealTimeData(nodeTagArr.value);
}, 5000, {
  immediate: false,
});

// ht 初始化
const init = () => {
  dataModel = new ht.DataModel();
  graphView = new ht.graph.GraphView(dataModel);
  graphView.setMovableFunc(() => {
  });
  graphView.setSelectableFunc((data: ht.Data) => {
    return data.a('node.cate') === 'm-point' || data.a('node.cate') === 'button' || data.a('node.tag');
  });
  // 设定可多选
  graphView.getSelectionModel().setSelectionMode('multiple');
  // 设定可滚动
  // graphView.handleScroll = function () {
  // };
  graphView.addToDOM(dmContainer.value);

  // 配置右键菜单
  setContextMenu();

  // 给显示区域绑定事件
  graphView.mi(e => {
    if (e.kind === 'clickData') {
      // if (e.data.a('node.cate') === 'button') {
      //   let subPageUrl = e.data.a('button.link');
      //   // console.log(subPageUrl)
      //   // console.log(pageConf.subPage)
      //   let subPage = pageConf.children.find(item => item.diagramPath = subPageUrl);
      //   $store.dispatch('routeTo', { pageId: subPage.id });
      // }
      if (e.data.a('node.tag')) {
        message.success('绑定测点： ' + e.data.a('node.tag'));
      }
    } else if (e.kind === 'doubleClickData') {

    } else if (e.kind === 'clickBackground') {

    }
  });
};

// 加载组态文件
const load = async () => {
  try {
    const res = await fetch(preprocessHref(href.value));
    const data = await res.json();

    // if (realTimeInterval) clearInterval(realTimeInterval);
    dataModel.clear();
    dataModel.deserialize(data, null, false);

    graphView.fitContent(FIT_CONTENT);
    nodeTagArr.value = getNodeTags(dataModel);
    // 请求实时数据并定时
    resume();
  } catch (_) {
    message.error('加载文件失败: ' + (name.value ? name.value : href.value));
  }
};

tryOnMounted(() => {
  init();
  load();
});

/**
 * setContextMenu 设置右键点击事件
 */
function setContextMenu() {
  let contextmenu = new ht.widget.ContextMenu([
    {
      label: '查看测点趋势',
      fordata: 1,
      action: (item, event) => {
        // getTrend();
      },
    },
    {
      label: '查看历史回放',
      fordata: 2,
      action: () => {
        hisTimeRange.value = [dayjs().subtract(2, 'hours'), dayjs()];
        timeSliderOpen.value = true;
        graphView.fitContent(true);
        pause();
        getHistoricalData();
      },
      disabled: () => {
        return timeSliderOpen.value;
      },
    },
    {
      label: '关闭历史回放',
      fordata: 2,
      action: () => {
        timeSliderOpen.value = false;
        graphView.fitContent(true);
        resume();
      },
      disabled: () => {
        return !timeSliderOpen.value;
      },
    },
  ] as HTContextMenuConfig);

  contextmenu.setVisibleFunc((item) => {
    let data = graphView.sm().ld();
    if (data instanceof ht.Node) {
      if (
        (data.a('node.tag') !== undefined) ||
        (data.a('node.state') !== undefined && data.a('node.switch') !== undefined)
      ) {
        return item.fordata === 1;
      } else {
        return item.fordata === 2;
      }
    } else {
      return item.fordata === 2;
    }
  });
  contextmenu.addTo(graphView.getView());
}

/**
 * getRealTimeData 获取实时数据
 * @param tags
 */
const getRealTimeData = async (tags: string[]) => {
  const { Data } = await getRealtime(tags.join('|'));
  if (!Data) return;
  const dataArr = Data.values.split('|');

  if (nodeTagArr.value.length) {
    const tagData = nodeTagArr.value.map((item, index) => {
      return {
        tag: item,
        value: dataArr[index],
      };
    });
    setNodeStatusByValue(dataModel, tagData);
  }
};
/**
 * getHistoricalData 获取页面内所有测点的历史数据，用于历史回放
 */
const getHistoricalData = async () => {
  timeSliderData.value = await getTrendData({
    tags: nodeTagArr.value.join('|'),
    st: dayjs(hisTimeRange.value[0]),
    ed: dayjs(hisTimeRange.value[1]),
    interval: 60,
    type: HisDataType.TIME_ARR,
  });

  if (timeSliderData.value) {
    setNodeStatusByValue(dataModel, timeSliderData.value[0].tagValue);
  }
};

watch(timeSliderValue, idx => {
  if (timeSliderData.value) {
    setNodeStatusByValue(dataModel, timeSliderData.value[idx].tagValue);
  }
});

const resize = useDebounceFn(() => {
  graphView.fitContent(FIT_CONTENT);
}, 200);

useResizeObserver(dmContainer, () => {
  resize();
});

tryOnUnmounted(() => {
  pause();
});

</script>

<template>
  <div class="w-full h-full relative of-hidden diagram-container">
    <div ref="dmContainer"
         class="w-full relative"
         :class="[timeSliderOpen ? 'h-[calc(100%-68px)]' : 'h-full']"
    ></div>
    <div v-if="timeSliderOpen" class="p-2">
      <diagram-time-slider v-model:value="timeSliderValue" v-model:time-range="hisTimeRange"></diagram-time-slider>
    </div>
  </div>
</template>
