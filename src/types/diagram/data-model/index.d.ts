/**
 * 数据容器 ht.DataModel (简称 DataModel) 作为承载 Data 数据的容器，管理着 Data 数据的增删以及变化事件派发；
 * HT 中所有视图组件都是通过绑定 DataModel，以不同的形式呈现到用户界面；
 * 同时组件也会监听 DataModel 模型的变化事件， 实时同步更新界面数据信息
 */
import type Data from './data';

export declare class DataModel {
  constructor(data?: Data);

  /**
   * 添加 Data 对象，index 一般无需指定，其只在 data 的 parent 为空时才起作用，指定插入 roots 数组的索引位置
   * @param data
   * @param index
   */
  add(data: Data, index: number);

  /**
   * 删除 Data 对象，删除节点会同步执行以下操作：
   * - 其子孙被递归从 DataModel 中删除
   * - 被断开父子关系 data.setParent(null)
   * - Edge 类型通过 Edge#setSource(null) 和 Edge#setTarget(null) 断开节点关系
   * - Node 类型会将其关联的连线从DataModel中删除
   * - Node 类型通过 Data#setHost(null) 断开与宿主吸附节点关系
   * @param data
   */
  remove(data: Data);

  /**
   * 删除指定 id 的 Data 对象
   * @param id
   */
  removeDataById(id: string);

  /**
   * 删除指定 tag 标示的 Data 对象
   * @param tag
   */
  removeDataByTag(tag: string);

  /**
   * 删除容器中所有 Data 对象，该操作一次性清空，没有逐个 remove 的过程，不会影响 Data 父子关系
   */
  clear();


  /**
   * 返回指定 id 的 Data 对象
   * @param id
   */
  getDataById(id: string);


  /**
   * 返回指定 tag 标识的 Data 对象
   * @param tag
   */
  getDataByTag(tag: string);

  /**
   * 返回所有 parent 为空的 Data 对象
   */
  getRoots();

  /**
   * 返回所有添加到容器的 Data 数据 ht.List 数组
   */
  getDatas();

  /**
   * 返回筛选后的新 ht.List 对象数组，第一参数为空相当于复制全部对象数组
   * @param matchFunc
   * @param scope
   */
  toDatas(matchFunc, scope);


  /**
   * 遍历所有 Data 对象
   * @param func
   * @param scope
   */
  each(func, scope);

  /**
   * 以 data 为起始深度优先遍历 Data 对象
   * @param func
   * @param data
   * @param scope
   */
  eachByDepthFirst(func, data, scope);

  /**
   * 以 data 为起始广度优先遍历 Data 对象
   * @param func
   * @param data
   * @param scope
   */
  eachByBreadthFirst(func, data, scope);


  /**
   * 图元添加时回调函数，可重载做后续处理
   * @param data
   */
  onAdded(data)

  /**
   * 图元删除时回调函数，可重载做后续处理
   * @param data
   */
  onRemoved(data)

  /**
   * 增加数据模型自身变化事件监听器，可用简写为 mm
   * - e.kind === 'add' 代表添加 Data 对象，e.data 为被添加的对象
   * - e.kind === 'remove' 代表删除 Data 对象，e.data 为被删除的对象
   * - e.kind === 'clear' 代表容器被清除
   */

  addDataModelChangeListener(func, scope);

  mm(func, scope);



  /**
   * 删除数据模型增删变化事件监听器，可用简写为 umm
   * @param func
   * @param scope
   */
  removeDataModelChangeListener(func, scope);
  umm(func, scope);

  /**
   * 增加对数据模型中 Data 上的数据属性变化事件监听器，可用简写为 md
   * - e.data 代表属性变化的对象
   * - e.property 代表变化属性的名字
   * - e.newValue 代表属性的新值
   * - e.oldValue 代表属性的老值
   * - Data对象在设置属性值函数内调用 firePropertyChange(property, oldValue, newValue) 触发属性变化事件：
   *   - get/set类型属性，如 setAge(98) 触发事件的 e.property为age
   *   - style类型属性名前加 s: 前缀以区分，如 setStyle('age', 98) 触发事件的 e.property 为 s:age
   *   - attr类型属性名前加 a: 前缀以区分，如 setAttr('age', 98) 触发事件的 e.property 为 a:age
   */
  addDataPropertyChangeListener(func, scope);
  md(func, scope);

  /**
   * 删除模型中Data数据属性变化事件监听器，可用简写为 umd
   * @param func
   * @param scope
   */
  removeDataPropertyChangeListener(func, scope)

  umd(func, scope)

  /**
   * 将数据模型序列化成 JSON 格式字符串，space 为缩进空格数
   * @param space
   */
  serialize(space)

  /**
   * 将数据模型序列化成 JSON 格式对象
   */
  toJSON()

  /**
   * 反序列化数据到数据模型
   * @param json 数据信息对象，用于解析生成对应的Data对象并添加到数据容器
   * @param rootParent 父节点对象，如果不为空，则反序列化的对象若无父亲者，设置rootParent为其父亲
   * @param setId 指定反序列化时，是否设置json信息上的id值
   */
  deserialize(json, rootParent, setId)
}

