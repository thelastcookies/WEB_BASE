import AutoImport from "unplugin-auto-import/vite";
import {Options} from "unplugin-auto-import/types";

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
        'src/stores',
        'src/hooks',
        'src/router',
        'src/utils',
        'src/api/**/*.ts',
        'src/types/**/*.ts',
        'src/views/**/*.vue',
    ],
    ignoreDts: [],
} as Options);
