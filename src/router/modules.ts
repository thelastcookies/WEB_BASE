/**
 * 将从接口中取到的路由配置的 component 字段进行校验与实际导入
 */
const modules = import.meta.glob([
  '/src/views/**/*.vue',
  '/src/views/**/*.tsx',
  '!/src/views/common',
  '!/src/views/**/exceptions',
  '!/src/views/**/components',
  '!/src/views/**/test',
]);

export const basicRouteMap = {
  // 用于 App 的根页面
  Layout: () => import('@/views/layouts/Layout.vue'),
  // 用于 iframe 外嵌页面
  IFrame: () => import('@/views/common/IFrame.vue'),
  // 用于链接跳转的页面
  Link: () => import('@/views/common/Link.vue'),
  // 用于存在 children 的页面
  Parent: () => import('@/views/common/Parent.vue'),
  // 空页面
  ComponentError: () => import('@/views/exceptions/ComponentError.vue'),
};

const checkEager = (module: any) => {
  return typeof module === 'object' && 'default' in module ? module.default : module;
};

export const getRouterModule = (path?: string): any => {
  if (!path) {
    return basicRouteMap.ComponentError;
  }
  // 判断是否在 basicRouteMap 中存在
  if (path in basicRouteMap) {
    return (basicRouteMap as any)[path];
  }
  // 判断开头是不是 '/'
  if (path.startsWith('/')) {
    path = path.slice(1);
  }
  // 组装页面路径
  const fullPath = `/src/views/${path}`;
  const fullPathIndex = `/src/views/${path}/index`;
  if (fullPath in modules) {
    return checkEager(modules[fullPath]);
  } else if (fullPathIndex in modules) {
    return checkEager(modules[fullPathIndex]);
  } else {
    return basicRouteMap.ComponentError;
  }
};

export default modules;
