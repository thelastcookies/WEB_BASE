import { Data } from '@/types/diagram/base/data';

export declare type HTContextMenuConfig = (HTContextMenuConfigItem | 'separator')[];

export declare interface HTContextMenuConfigItem {
  label: string;
  // 菜单 icon
  icon?: string;
  // 可多选的菜单项
  type?: 'radio' | 'check';
  // 菜单项分组
  groupId?: number | string;
  // 禁用菜单项，可以是函数，由返回值决定是否禁用
  disabled?: boolean | ((item: any) => boolean);
  // 点击时的回调
  action?: (item?: any, event?: Event) => void;

  // 用于动态构建菜单
  fordata?: number | string;

  // 配置超链接
  href?: string;
  // 超链目标，默认 _self
  linkTarget?: '_self' | '_blank';
  // 键盘快捷键配置
  key?: string[];
  // 是否阻止快捷键默认的行为，默认为true
  preventDefault?: boolean,
  items?: HTContextMenuConfigItem[];
}

export declare class ContextMenu extends Data {
  constructor(config?: HTContextMenuConfig);

  /**
   * 设置菜单项，参数为 JSON 对象
   * @param json
   */
  setItems(json);

  /**
   * 参数为 HTML 元素，使其支持右键菜单
   * @param dom
   */
  addTo(dom: HTMLElement);

  /**
   * 销毁此右键菜单
   */
  dispose();

  /**
   * 显示菜单，x 与 y 为菜单显示页面在中的坐标
   */
  show(x: number, y: number);

  /**
   * 隐藏菜单
   */
  hide();

  /**
   * 启用全局快捷键，一旦启用此选项，菜单不再使用时需要显式调用 dispose() 销毁菜单
   */
  enableGlobalKey();

  /**
   * 禁用全局快捷键
   */
  disableGlobalKey();

  /**
   * 菜单显示之前被调用，可以重写此方法实现动态菜单功能
   */
  beforeShow(event: Event);

  /**
   * 查找属性名为 property，值为 value 的菜单项，只返回第一个查找结果，注意：如果菜单显示时修改此查找结果，则菜单界面在下次显示时更新
   */
  getItemByProperty(property, value);

  /**
   * 菜单显示之后被调用
   */
  afterShow(event: Event);

  /**
   * 菜单隐藏之后被调用
   */
  afterHide();

  /**
   * 检测菜单是否显示
   */
  isShowing();

  /**
   * 设置菜单中 label 的最大宽度，如果 label 过长会出现跑马灯效果
   */
  setLabelMaxWidth(width: number);

  /**
   * 设置可见过滤器
   */
  setVisibleFunc(func: (item: any) => boolean);
}
