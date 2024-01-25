import type {PluginOption} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import {Options} from "unplugin-auto-import/types";


/**
 * 注入 vite 的插件
 * 目前包括：
 *  Vue
 *  VueJsx
 *  AutoImport
 */
export function createVitePlugins() {
    const vitePluginList: (PluginOption | PluginOption[])[] = [
        vue(),
        vueJsx(),
        AutoImport({
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
            dts: 'src/types/auto-imports.d.ts',
            dirs: [
                'src/stores',
                'src/hooks',
                'src/router',
                'src/utils',
                'src/api/**/*.ts',
                'src/types/**/*.ts',
                'src/views/**/*.vue',
            ],
            ignoreDts: [
            ],
        } as Options),
    ]
    return vitePluginList
}
