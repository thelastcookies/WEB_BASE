export declare type HTEventKind =
// 单击图元
  'clickData' |
  // 双击图元
  'doubleClickData' |
  // 点击背景
  'clickBackground' |
  // 双击背景
  'doubleClickBackground' |
  // 开始框选图元
  'beginRectSelect' |
  // 框选图元过程中
  'betweenRectSelect' |
  // 结束框选图元
  'endRectSelect' |
  // 鼠标悬浮在节点上
  'hover' |
  // 开始旋转图元
  'beginEditRotation' |
  // 旋转图元过程中
  'betweenEditRotation' |
  // 结束旋转图元
  'endEditRotation' |
  // 开始移动图元
  'beginMove' |
  // 移动图元过程中
  'betweenMove' |
  // 结束移动图元
  'endMove' |
  // 开始手抓图移动图元
  'beginPan' |
  // 手抓图移动图元过程中
  'betweenPan' |
  // 结束手抓图移动图元
  'endPan' |
  // 开始编辑图元矩形区域
  'beginEditRect' |
  // 编辑图元矩形区域过程中
  'betweenEditRect' |
  // 结束编辑图元矩形区域
  'endEditRect' |
  // 开始编辑多边形的点
  'beginEditPoint' |
  // 编辑多边形的点过程中
  'betweenEditPoint' |
  // 结束编辑多边形的点
  'endEditPoint' |
  // 开始编辑曲线
  'beginEditPoints' |
  // 结束编辑曲线
  'endEditPoints' |
  // 左方向键左移图元一个像素
  'moveLeft' |
  // 右方向键左移图元一个像素
  'moveRight' |
  // 上方向键左移图元一个像素
  'moveUp' |
  // 下方向键左移图元一个像素
  'moveDown';

export declare interface HTEvent {
  // 浏览器原生的事件
  event: Event;
  // 当前触发事件的类型
  kind: HTEventKind;
  // 触发当前事件的对象
  data: ht.Data;
  // 当前事件具体触发的图元类型
  type: string;

  // 代表变化属性的名字
  property: string;
  // 代表属性的新值
  newValue: string;
  // 代表属性的老值
  oldValue: string;
}

export declare interface SelectionEvents extends HTEvent {
  /**
   * set 代表此事件由 setSelection() 引发
   * remove 代表此事件由 removeSelection() 引发
   * append 代表此事件由 appendSelection() 引发
   * clear 代表此事件由 clearSelection() 引发
   */
  kind: 'add' | 'set' | 'remove' | 'clear';
}

export declare interface GraphViewEvents extends HTEvent {
  /**
   * data 代表是 GraphView 组件上的节点触发的
   * image 代表是整个矢量图标触发的
   * comp 代表是矢量图标中某个组件触发的
   */
  type: 'data' | 'image' | 'comp' | 'clear';
}
