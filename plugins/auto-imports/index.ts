import {PluginOption} from "vite";
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
    dirs: [],
    ignoreDts: [],
}) as PluginOption;
