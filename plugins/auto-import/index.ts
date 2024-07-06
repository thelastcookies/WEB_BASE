import AutoImport from "unplugin-auto-import/vite";
import type { PluginOption } from "vite";
import { customImports } from "./custom-imports";

export const AutoImportPluginConfig: PluginOption = AutoImport({
  include: [
    /\.tsx?$/, // .ts, .tsx
    /\.vue$/,
    /\.vue\?vue/, // .vue
  ],
  imports: [
    'vue',
    'vue-router',
    'pinia',
    customImports,
  ],
  dts: './plugins/auto-import/auto-imports.d.ts',
  dirs: [
    'src/api/**/*.ts',
    'src/enums/**/*.ts',
    'src/hooks',
    'src/router',
    'src/stores/**/*.ts',
    'src/types/**/*.ts',
    'src/utils/**/*.ts',
    'src/views/**/*.vue',
    'src/views/**/*.ts',
  ],
  ignoreDts: [
    'src/views/form/libs'
  ],
  vueTemplate: true,
});
