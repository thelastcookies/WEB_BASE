/**
 * 页面类型
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

export enum ShowInMenuType {
    HIDE = "0",
    SHOW = "1",
    // 预留扩展
}

/**
 * 由接口获取的 Action 信息
 * 为构建路由、菜单、面包屑和 Tab 内容的基本数据
 */
export interface ActionItem {
    // 路由 id
    id?: string;
    // 父级 id
    pId?: string;
    // 路由短 id，与 id 职能相同，实践中一般使用该值来标识路由项
    menuId?: string;
    // 路由配置的中文描述
    title?: string;
    // 路由配置的类型
    type?: MenuPageType;
    // 路由配置的 url，具体含义要结合 type 属性
    url?: string;
    // 路由配置的icon，一般用于第一级菜单
    icon?: string;
    // 是否为固定页签
    affix?: boolean;
    // 组件配置
    component?: string;
    // 排序
    sort?: number;
    // 是否 KeepAlive
    keepAlive?: boolean
    // 配置携带的默认查询参数
    query?: object;
    // 该配置项是否在系统中展示
    showInMenu?: ShowInMenuType;
    // 子节点
    children?: ActionItem[];
}

export interface MenuTreeNode {
   key: string;
   title: string;
   icon?: string;
   disabled?: boolean;
   children?: MenuTreeNode[];
}
