import {AxiosError} from "axios";
import {message} from "ant-design-vue";
import type {ActionRecordPage} from "@/types/action";

const accessWhileList = ['/login', '/error', '/401', '/404', '/403'];
const loginPath = '/login';

router.beforeEach(async (to) => {
    setRouteEmitter(to);
    // 获取 token 进行校验
    const {getToken} = useTokenStore();
    const token = getToken();
    if (!token) {
        if (accessWhileList.includes(to.path)) {
            // 如果目标在白名单内则不干涉
            return;
        } else {
            // 否跳转到登录页
            return ({
                path: loginPath,
                query: {redirect: encodeURIComponent(to.fullPath)},
            });
        }
    } else {
        // 获取用户信息
        const userStore = useUserStore();
        if (!Object.keys(userStore.userInfo).length && !accessWhileList.includes(to.path)) {
            message.loading({
                content: '系统加载中，请稍候。',
                key: SYS_LOADING_KEY,
                duration: 0,
            });
            // 如果用户信息不存在则视作系统未初始化，尝试获取各信息并进行初始化。
            try {
                await userStore.getUserInfo();
                // 获取 Actions 并生成路由配置
                const {getActions} = useActionStore();
                const {url} = generateRouterConf(await getActions()) as ActionRecordPage;

                message.success({
                    content: '加载完成。',
                    key: SYS_LOADING_KEY,
                });
                return ({
                    path: url,
                    replace: true,
                });
            } catch (e) {
                console.error(e);
                if (e instanceof AxiosError) {
                    if (e.code === "ECONNABORTED") {
                        message.error({
                            content: '请求超时。',
                            key: SYS_LOADING_KEY,
                        });
                    } else if (e.code === "ERR_NETWORK") {
                        message.error({
                            content: '网络连接失败。',
                            key: SYS_LOADING_KEY,
                        });
                    } else if (e?.response?.status === 401) {
                        message.destroy(SYS_LOADING_KEY);
                        // 跳转到error页面
                        return ({
                            //////// 401 页面
                            path: '/401',
                        });
                    } else {
                        message.destroy(SYS_LOADING_KEY);
                    }
                } else if ((e as Error).message === WITH_UNAUTHORIZED) {
                    const {signOut} = useAppStore();
                    signOut().then(() => {
                        message.error({
                            content: '会话已过期，请重新登录。',
                            key: SYS_LOADING_KEY,
                            duration: 5
                        });
                    });
                } else {
                    message.error({
                        content: '加载失败。',
                        key: SYS_LOADING_KEY,
                    });
                }
            }
        } else if (to.path === loginPath) {
            // 如果当前是登录页面就跳转到首页
            return ({
                path: '/',
            })
        }
    }
});

// router.afterEach((to) => {
//     useMetaTitle(to)
//     useLoadingCheck()
//     useScrollToTop()
// })
