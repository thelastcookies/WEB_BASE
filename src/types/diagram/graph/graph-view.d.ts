import type { DataModel } from '@/types/diagram/data-model';
import type { GraphViewEvents } from '@/types/diagram/events';

export declare class GraphView {
  constructor(dataModel: DataModel);

  /**
   * 所有HT组件最根层都为一个 div 组件，可通过组件的 getView() 函数获取
   */
  getView(): HTMLElement;

  // 获取视图组件对应的画布。
  getCanvas: Function;
  // 传入 HTML 事件对象，将事件坐标转换为拓扑中的逻辑坐标
  getLogicalPoint: Function;
  // 传入拓扑中的逻辑坐标，将逻辑坐标转换为浏览器内坐标
  getScreenPoint: Function;

  // 设定可移动
  setMovableFunc: Function;
  // 设定可选择
  setSelectableFunc: Function;
  // 设定滚动方法
  handleScroll: Function;

  /**
   * 将视图组件添加到页面的 DOM 元素中
   * 接受一个 DOM 元素作为参数，可以将 HT 的视图组件添加到指定的 DOM 元素底下，如果不传参数的话，默认会添加到页面的 body 元素下。
   * @param element DOM
   */
  addToDOM(element?: HTMLElement): void;

  /**
   * 缩放平移整个拓扑视图组件以展示所有的图元
   * @param anim 表示在缩放过程中是否使用动画，可以设置为 true/false，或者 animation 动画对象，默认为 false
   * @param padding 缩放后图元区域与拓扑视图组件边缘的距离，默认为 20
   * @param notZoomIn 是否将最小缩放值限定为 1
   */
  fitContent(anim?: boolean, padding?: number, notZoomIn?: number);

  /**
   * 获取当前组件使用的选中模型，简写为 sm，selectionModelShared 为 false 时，返回 view 专用的选择模型
   */
  getSelectionModel(): ht.SelectionModel;

  sm(): ht.SelectionModel;

  /**
   * 对视图组件添加事件监听，简写为 mi
   */

  addInteractorListener(cb: (event: GraphViewEvents) => void)

  mi(cb: (event: GraphViewEvents) => void);

  /**
   * 移除视图组件事件监听，简写为 umi
   */
  removeInteractorListener();

  umi();

  /**
   * 不明
   */
  fireInteractorEvent();

  fi();

  /**
   * 图元被点击时回调
   */
  onDataClicked(data: ht.Data, event: GraphViewEvents);
}
