/**
 * v0.24.0 新增
 * CSS 变量的全局注入，变量配置来自于 Antdv token
 * @param tokens Antdv mapToken
 */
import type { GlobalToken } from 'ant-design-vue/es/theme';

export const generateThemeStyle = (tokens: GlobalToken) => {
  const styleDom = document.createElement('style');
  let style = `:root {`;
  Object.entries(tokens).forEach(([key, value]) => {
    style += `--${key}: ${value};`;
    console.log(`--${key}: ${value};`);
  });
  style += `}`;
  styleDom.textContent = style;
  styleDom.id = 'antdv-theme-static';
  try {
    document.head.replaceChild(styleDom, document.getElementById('antdv-theme-static')!);
  } catch (_) {
    document.head.appendChild(styleDom);
  }
};
