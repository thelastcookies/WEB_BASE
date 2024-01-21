import type {PluginOption} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';


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
            imports: [
                'vue',
                'vue-router',
                'pinia',
            ],
            dts: 'src/types/auto-imports.d.ts',
            dirs: ['src/stores', 'src/hooks', 'src/api/**/index.ts', 'src/utils/**.ts'],
        }),
    ]
    return vitePluginList
}
