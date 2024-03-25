import type {PluginOption} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

/**
 * 注入 vite 的插件
 * 目前包括：
 *  Vue
 *  VueJsx
 */
export function createVitePlugins() {
    const vitePluginList: (PluginOption | PluginOption[])[] = [
        vue(),
        vueJsx(),
    ];
    return vitePluginList;
}
