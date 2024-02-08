import type {PluginOption} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import {Options} from "unplugin-auto-import/types";
import UnoCSS from 'unocss/vite';
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';

/**
 * 注入 vite 的插件
 * 目前包括：
 *  Vue
 *  VueJsx
 *  unplugin-auto-import
 *  unplugin-vue-components
 */
// vite.config.ts
export function createVitePlugins() {
    const vitePluginList: (PluginOption | PluginOption[])[] = [
        vue(),
        vueJsx(),
        UnoCSS({
            configFile: './plugins/uno/uno.config.ts'
        }),
        Components({
            include: [
                /\.tsx?$/, // .ts, .tsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
            ],
            dirs: [
                'src/components',
                'src/views'
            ],
            dts: './plugins/vue-components/components.d.ts',
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false,
                }),
            ],
        }),
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
        } as Options),
    ]
    return vitePluginList
}
