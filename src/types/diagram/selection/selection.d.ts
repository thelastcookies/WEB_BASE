export declare class SelectionModel {
  /**
   * 获取选中模式
   */
  getSelectionMode();

  /**
   * 设置选中模式
   * @param selectionMode
   * none：不可选中。
   * single：只可单选。
   * multiple：默认值，允许多选。
   */
  setSelectionMode(selectionMode: 'none' | 'multiple' | 'single');

  /**
   * 获取自定义过滤器
   */
  getFilterFunc();

  /**
   * 设置自定义过滤器
   * @param cb
   */
  setFilterFunc(cb: Function);

  /**
   * 获取所有被选中对象数组（只读）
   */
  getSelection();

  /**
   * 直接设置选中对象，参数可为单个 ht.Data，也可为 ht.List 或 Array数组，简写为 ss
   * @param data
   */
  setSelection(data: ht.Data | ht.Data[]);

  ss(data: ht.Data | ht.Data[]);


  /**
   * 增加监听器，监听选中变化事件，简写为 ms
   @param listener 监听方法
   */
  addSelectionChangeListener(listener: (SelectionEvents) => void);

  ms(e: (SelectionEvents) => void);

  /**
   * 删除选中变化事件监听器，简写为 ums
   * @param listener
   */
  removeSelectionChangeListener(listener: (SelectionEvents) => void);

  ums(listener: (SelectionEvents) => void);


  /**
   * 追加选中对象，参数可为单个 ht.Data，也可为 ht.List 或 Array 数组，简写为 as
   * @param data
   */
  appendSelection(data: ht.Data | ht.Data[]);

  as(data: ht.Data | ht.Data[]);


  /**
   * 移除某些选中对象，取消选中对象，参数可为单个 ht.Data，也可为 ht.List 或 Array 数组，简写为 rs
   * @param data
   */
  removeSelection(data: ht.Data | ht.Data[]);

  rs(data: ht.Data | ht.Data[]);

  /**
   * 清空选中对象，取消所有选中对象，简写为 cs
   */
  clearSelection();

  cs();

  /**
   * 选中全部，选中 DataModel 中所有对象，简写为 sa
   */
  selectAll();

  sa();

  /**
   * 获取首个被选中的对象，如果没有选中对象则返回空，简写为 fd
   */
  getFirstData(): ht.Data | ht.Data[];

  fd(): ht.Data | ht.Data[];

  /**
   * 获取最后被选中的对象，如果没有选中对象则返回空，简写为 ld
   */
  getLastData(): ht.Data | ht.Data[];

  ld(): ht.Data | ht.Data[];

}

