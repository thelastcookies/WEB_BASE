<script setup lang="ts">
import { contextmenuConfig } from '@/views/common/diagram/config/contextmenu.ts';
import { message } from 'ant-design-vue';

const route = useRoute();
const href = computed(() => route?.meta?.href as string);
const name = computed(() => route?.meta?.name as string);

const dmContainer = ref<HTMLElement>();
const loading = ref(true);


const timeSliderOpen = ref(false);
const backBtnEnable = ref(false);

let dataModel: ht.DataModel;
let graphView: ht.graph.GraphView;

const FIT_CONTENT = true;

const nodeTagArr = ref<string[]>([]);

/**
 datePickerHis: [],
 * realTimeInterval
 * nodeTagArr
 *
 * trendDialogVisible
 */

const preprocessHref = (href: string) => {
  return href.startsWith('/') ? '/diagrams' + href : '/diagrams/' + href;
};

// 实时数据请求定时器
const { pause, resume } = useIntervalFn(() => {
  getRealTimeData(nodeTagArr.value);
}, 3000, {
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
  // setContextMenu(contextmenuConfig, graphView);


  // 给显示区域绑定事件
  // graphView.mi(e => {
  //   if (e.kind === 'clickData') {
  //     if (e.data.a('node.cate') === 'button') {
  //       let subPageUrl = e.data.a('button.link');
  //       // console.log(subPageUrl)
  //       // console.log(pageConf.subPage)
  //       let subPage = pageConf.children.find(item => item.diagramPath = subPageUrl);
  //       $store.dispatch('routeTo', { pageId: subPage.id });
  //     }
  //     if (e.data.a('node.tag')) {
  //       $message.success('绑定测点： ' + e.data.a('node.tag'));
  //     }
  //   } else if (e.kind === 'doubleClickData') {
  //
  //   } else if (e.kind === 'clickBackground') {
  //
  //   }
  // });
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
    // nodeTagArr.value = dataModel.getNodeTags();
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
 * @param contextmenu_config - 右键点击配置
 * @param graphView - graphView
 */
function setContextMenu(contextmenu_config, graphView) {
  let contextmenu = new ht.widget.ContextMenu([
    {
      label: '查看测点趋势',
      fordata: 1,
      action: (item, event) => {
        datePicker = [$moment().subtract(2, 'hours'), $moment()];
        getTrend();
      },
    },
    {
      label: '查看历史回放',
      fordata: 2,
      action: (item, event) => {
        timeSliderOpen.value = true;
        datePickerHis = [$moment().subtract(2, 'hours'), $moment()];
        graphView.fitContent(true);
        clearInterval(realTimeInterval);
        getHistoricalData();
        // showHistoryDataDialog();
      },
      disabled: (item) => {
        return timeSliderOpen.value;
      },
    },
    {
      label: '关闭历史回放',
      fordata: 2,
      action: (item, event) => {
        timeSliderOpen.value = false;
        graphView.fitContent(true);
        // progressBar.destroy();
        // pageMainView.setStatus("cr");
        // graphView.fitContent(true);
        // getRealTimeData(nodeArr);
        getRealTimeData(nodeTagArr);
        realTimeInterval = setInterval(() => {
          getRealTimeData(nodeTagArr);
        }, 3000);
      },
      disabled: (item) => {
        return !timeSliderOpen.value;
      },
    },
  ]);
  contextmenu.enableGlobalKey();
  contextmenu.setVisibleFunc(function (item) {
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
};


/**
 * handleBackToMainPage 进入子图后点击按钮返回主接线图事件
 */
const handleBackToMainPage = () => {
  dataModelUpdate(pageConf);
  backBtnVisible = false;
};


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
    dataModel.setNodeStatusByValue(tagData);
  }
};
/**
 * getHistoricalData 获取页面内所有测点的历史数据，用于历史回放
 */
const getHistoricalData = () => {
  $axios({
    method: 'POST',
    url: 'http://172.22.116.20:7303/base/getHist',
    data: {
      'tags': nodeTagArr.join('|'),
      'startTime': $moment(datePickerHis[0]).format('yyyyMMDDHHmmss'),
      'endTime': $moment(datePickerHis[1]).format('yyyyMMDDHHmmss'),
      'period': 60,
    },
  }).then(res => {
    if (!res.data.values) return;
    let dataArr = res.data.values.split('|');

    let tagDataArr = dataArr.map(item => item.split(','));
    let tagDataArrTranspose = tagDataArr[0].map((col, ci) => {
      return tagDataArr.map((row, ri) => {
        return {
          nodeTag: nodeTagArr[ri],
          value: row[ci],
        };
      });
    });
    let timestampArr = [];
    let time = datePickerHis[0];
    while (time <= datePickerHis[1]) {
      timestampArr.push($moment(time).format('HH:mm:ss'));
      time = $moment(time).add('60', 's');
    }
    progressData = tagDataArrTranspose;
    timestampArr = timestampArr;
    // console.log(tagDataArrTranspose);
    // console.log(timestampArr);

    dataModel.setNodeStatusByValue(progressData[0]);

    // 初始化时间显示
    currentTime = timestampArr[0];
    endTime = timestampArr[progressData.length - 1];
    //初始化进度条
    timeSliderMax = progressData.length - 1;
  });
};


/**
 * mounted
 */

window.addEventListener('resize', () => {
  graphView.fitContent(fitContent);
});

// window.addEventListener("resize", function (e) {
//   graphView.invalidate();
// }, false);


const resize = useDebounceFn(() => {
  graphView.fitContent(true);
}, 200);


useResizeObserver(dmContainer, () => {
  resize();
});


// graphView.setHeight($refs.dmContainer.offsetHeight);


tryOnUnmounted(() => {
  pause();
});
</script>

<template>
  <div class="w-full h-full relative of-hidden diagram-container">
    <div ref="dmContainer"
         class="w-full relative"
         :class="[timeSliderOpen ? 'h-[calc(100%-60px)]' : 'h-full']"
    ></div>
    <a-button @click="handleBackToMainPage">
      <BaseIcon icon="i-mdi-arrow-left-bold" />
    </a-button>
    <!--    <button v-if="backBtnEnable"-->
    <!--            class="absolute top-4 left-4"-->
    <!--            @click="handleBackToMainPage"-->
    <!--    >返回-->
    <!--    </button>-->
  </div>
</template>
