import UnoCSS from 'unocss/vite';

export const UnoCSSPluginConfig = UnoCSS({
  mode: 'vue-scoped',
  configFile: './plugins/unocss/uno.config.ts',
});
