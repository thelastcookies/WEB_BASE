import {defineConfig, loadEnv} from 'vite'
import {fileURLToPath, URL} from 'node:url'
import {createVitePlugins} from "./plugins";
// 导入 Antdv 的 Design Token 应用到 less 中
import { theme } from 'ant-design-vue';
import {resolve} from "node:path";
const { defaultAlgorithm, defaultSeed } = theme;
const mapToken = defaultAlgorithm(defaultSeed);

const baseSrc = fileURLToPath(new URL('./src', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    // 从 /env/.env 中读取环境变量
    const env = loadEnv('', process.cwd() + '/env', 'APP_');
    let conf = {};
    // 一些开发和构建时的配置
    if (command === 'serve') {
        Object.assign(conf, {
            server: {
                host: '0.0.0.0',
            }
        });
    } else if (command === 'build') {
        Object.assign(conf, {
            base: '/' + env.APP_BUILD_NAME + '/',
            build: {
                outDir: env.APP_BUILD_NAME,
                sourcemap: env.APP_SOURCE_MAP,
            },
        });
    }
    // 一些通用配置
    Object.assign(conf, {
        // .env 目录以及前缀设置
        envDir: 'env',
        envPrefix: 'APP_',
        // plugins
        plugins: createVitePlugins(),
        // assetsInclude: ['**/*.toml'],
        resolve: {
            alias: [{
                find: '@',
                replacement: baseSrc,
            }]
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: mapToken,
                }
            }
        }
    });
    return conf;
});
