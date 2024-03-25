import type {PluginOption} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {VueComponentPluginConfig} from "./vue-components";
import {AutoImportPluginConfig} from "./auto-imports";

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
        VueComponentPluginConfig,
        AutoImportPluginConfig,
    ];
    return vitePluginList;
}
