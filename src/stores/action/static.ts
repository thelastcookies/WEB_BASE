import type { ActionRecordRaw } from '@/types/action';

export const staticActions: ActionRecordRaw[] = createTree([
  {
    id: '1336647905518030848',
    actionId: 'menu',
    title: '示例菜单',
    type: MenuTypeEnum.MENU,
    icon: 'i-mdi-format-list-text',
    sort: 1,
    showInMenu: true,
    url: 'page',
    children: [{
      id: '1336647905518030849',
      pId: '1336647905518030848',
      actionId: 'page',
      title: '示例页面',
      type: MenuTypeEnum.PAGE,
      sort: 11,
      showInMenu: true,
      url: '',
      resource: 'pages/SamplePage.vue',
      meta: {
        title: '示例页面的示例标题',
        backEnable: true,
      },
    }],
  }, {
    id: '1536643442430447616',
    actionId: 'settings',
    title: '系统管理',
    type: MenuTypeEnum.MENU,
    icon: 'i-mdi-cog-outline',
    sort: 9,
    showInMenu: true,
    url: 'settings',
    children: [
      {
        id: '1536652592875048960',
        pId: '1536643442430447616',
        actionId: 'userSett',
        title: '用户管理',
        type: MenuTypeEnum.PAGE,
        sort: 91,
        showInMenu: true,
        url: 'user',
        resource: 'settings/user/UserManagement.vue',
      }, {
        id: '1536652666153734144',
        pId: '1536643442430447616',
        actionId: 'roleSett',
        title: '角色管理',
        type: MenuTypeEnum.PAGE,
        sort: 92,
        showInMenu: true,
        url: 'role',
        resource: 'settings/role/RoleManagement.vue',
      }, {
        id: '1536652853853032448',
        pId: '1536643442430447616',
        actionId: 'menuSett',
        title: '菜单管理',
        type: MenuTypeEnum.PAGE,
        sort: 92,
        showInMenu: true,
        url: 'menu',
        resource: 'settings/action/ActionManagement.vue',
      }, {
        id: '1536652773624385536',
        pId: '1536643442430447616',
        actionId: 'permSett',
        title: '权限管理',
        type: MenuTypeEnum.PAGE,
        sort: 94,
        showInMenu: true,
        url: 'permission',
        resource: 'settings/perm/PermissionManagement.vue',
      }, {
        id: '1536652915467358208',
        pId: '1536643442430447616',
        actionId: 'orgSett',
        title: '组织机构管理',
        type: MenuTypeEnum.PAGE,
        sort: 95,
        showInMenu: true,
        url: 'organization',
        resource: 'settings/org/OrganizationManagement.vue',
      },
      {
        id: '1536653005456150528',
        pId: '1536643442430447616',
        actionId: 'pwdSett',
        title: '密码管理',
        type: MenuTypeEnum.PAGE,
        sort: 96,
        showInMenu: true,
        url: 'password',
        resource: 'settings/pwd/PasswordManagement.vue',
      }, {
        id: '1536653005456150529',
        pId: '1536643442430447616',
        actionId: 'formDesigner',
        title: '表单设计器',
        type: MenuTypeEnum.PAGE,
        sort: 97,
        showInMenu: true,
        url: 'form',
        resource: 'form/FormDesigner.vue',
      },
    ],
  }, {
    id: '1436644431724154880',
    actionId: 'link',
    title: '外链',
    type: MenuTypeEnum.LINK,
    icon: 'i-mdi-link',
    sort: 7,
    showInMenu: true,
    url: 'link',
    resource: 'https://www.baidu.com',
  }, {
    id: '1436644431724154881',
    actionId: 'iframe',
    title: 'IFrame',
    type: MenuTypeEnum.IFRAME,
    icon: 'i-mdi-image-filter-drama-outline',
    sort: 8,
    showInMenu: true,
    url: 'iframe',
    resource: 'https://next.antdv.com/components/overview-cn',
  },
]);
