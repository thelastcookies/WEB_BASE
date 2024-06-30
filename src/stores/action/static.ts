import type { ActionRecordRaw } from "@/types/action";

export const staticActions = [
    {
        id: "menu",
        pId: "",
        actionId: "menu",
        title: "示例菜单",
        type: MenuPageType.MENU,
        sort: 1,
        showInMenu: ShowInMenuType.SHOW,
        url: "page",
        children: [{
            id: "page",
            pId: "menu",
            actionId: "page",
            title: "示例页面",
            type: MenuPageType.PAGE,
            sort: 11,
            showInMenu: ShowInMenuType.SHOW,
            url: "",
            component: "pages/SamplePage.vue",
        }],
    }, {
        id: "link",
        pId: "",
        actionId: "link",
        title: "外链",
        type: MenuPageType.LINK,
        sort: 97,
        showInMenu: ShowInMenuType.SHOW,
        url: "https://www.baidu.com",
    }, {
        id: "iframe",
        pId: "",
        actionId: "iframe",
        title: "IFrame",
        type: MenuPageType.IFRAME,
        sort: 98,
        showInMenu: ShowInMenuType.SHOW,
        url: "iframe",
        href: "http://10.0.0.10:6678/",
    }
] as ActionRecordRaw[];
