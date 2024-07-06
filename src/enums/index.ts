export enum AccessEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

/**
 * 加载 Action 模式
 * FRONTEND 模式从 static-actions.ts 中加载
 * BACKEND 模式向接口请求加载
 */
export enum LoadActionTypeEnum {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
}

export enum StatusEnum {
  OFF = '0',
  RUNNING = '1',
  ONLINE = '2',
  ERROR = '3',
}

/**
 * 菜单页面类型
 */
export enum MenuPageType {
  // 菜单类型
  MENU = 0,
  // 页面类型，实际关联 .vue 文件
  PAGE = 1,
  // 外链
  LINK = 2,
  // iframe
  IFRAME = 3,
  // 组态图
  DIAGRAM = 9
}

/**
 * 菜单是否展示
 */
export enum ShowInMenuType {
  HIDE = "0",
  SHOW = "1",
  // 预留扩展
}

/**
 * 步骤
 */
export enum StepEnum {
  STEP1,
  STEP2,
  STEP3,
  STEP4,
  STEP5,
  STEP6,
  STEP7,
  STEP8,
}

export enum EditEnum {
  NEW,
  EDIT
}
