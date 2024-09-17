/**
 * ht.Data 类型（简称为 Data）贯穿整个 HT 框架，是最基础的数据类型
 */

export declare class Data {

  constructor();

  /**
   * property 类型，常用属性
   */
  /**
   * ID
   */
  id: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 标签
   */
  tag: string;

  getName();

  setName();

  getId();

  setId();

  getTag();

  setTag();

  /**
   * style 类型，用于控制图元样式
   */

  /**
   * 获取属性
   * @param name 属性名
   */
  getStyle(name: string);

  /**
   * 设置属性
   * @param name 属性名
   * @param value 属性值
   */
  setStyle(name: string, value: any);

  s(name: string, value?: any, json?: any);

  /**
   * attr 类型，用于存储业务数据
   */

  getAttr(name: string);

  setAttr(name: string, value: any);

  a(name: string, value?: any, json?: any);

}
