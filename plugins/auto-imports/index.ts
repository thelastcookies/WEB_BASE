import { PluginOption } from "vite";
import AutoImport from "unplugin-auto-import/vite";

export const AutoImportPluginConfig = AutoImport({
    include: [
        /\.tsx?$/, // .ts, .tsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
    ],
    imports: [
        'vue',
        'vue-router',
        'pinia',
    ],
    dts: './plugins/auto-imports/auto-imports.d.ts',
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
}) as PluginOption;
