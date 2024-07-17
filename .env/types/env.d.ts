/// <reference types="vite/client" />

interface ImportMetaEnv {
    // 项目标题
    readonly APP_TITLE: string;
    // 项目打包生成文件
    readonly APP_BUILD_NAME: string;
    /**
     * APP_ROUTE_PAGE_MODE
     * 项目页面路由模式，可多选，配置之间使用「,」隔开
     * 可选的配置项包括：
     *   MENU：左侧展示菜单栏，纵向排列
     *   MENU_TOP：顶部展示菜单栏，横向排列
     *   TAB：tab标签栏可用，且单个页面对应单个tab
     *   MULTI_TAB：tab标签栏可用，且单个页面支持tab多开
     *   BREADCRUMB：面包屑导航可用
     */
    readonly APP_ROUTE_PAGE_MODE: string;
    readonly APP_LOAD_ACTION_TYPE: 'FRONTEND' | 'BACKEND';
    readonly APP_HOMEPAGE_ID: string;
    // 打包时是否开启 sourcemap
    readonly APP_SOURCE_MAP: 'true' | 'false';
    /**
     * APP_ROUTER_GUARD_ENABLE
     * 是否启用路由守卫，影响到是否进行登录、权限验证等
     * 通常开启，在无用户概念的、简单的系统里可以关闭
     * 关闭后，routeTo 等路由封装方法将不起作用，只可使用 push 等 Router 原生方法操作路由
     */
    readonly APP_ROUTER_GUARD_ENABLE: 'true' | 'false';
    readonly APP_API_BASE_URL: string;
    readonly APP_API_PERM_URL: string;
    readonly APP_API_GO_URL: string;
    readonly APP_API_MOCK_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
