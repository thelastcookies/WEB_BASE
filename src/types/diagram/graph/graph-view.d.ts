export declare class GraphView {
  constructor(dataModel: ht.DataModel);

  // 设定可移动
  setMovableFunc: Function;
  // 设定可选择
  setSelectableFunc: Function;
  // 设定可滚动
  getSelectionModel: Function;

  /**
   * 将视图组件添加到页面的 DOM 元素中
   * 接受一个 DOM 元素作为参数，可以将 HT 的视图组件添加到指定的 DOM 元素底下，如果不传参数的话，默认会添加到页面的 body 元素下。
   * @param element DOM
   */
  addToDOM(element?: HTMLElement): void;
}
