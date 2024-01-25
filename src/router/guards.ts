import {AxiosError} from "axios";
import router from '@/router'

const accessWhileList = ['/login', '/error', '/401', '/404', '/403'];
const loginPath = '/login';

router.beforeEach(async (to, _, next) => {
    setRouteEmitter(to);
    // 获取 token 进行校验
    const {token} = useTokenStore();
    if (!token) {
        //  如果 token 不存在就跳转到登录页面
        if (!accessWhileList.includes(to.path) && !to.path.startsWith('/redirect')) {
            next({
                path: loginPath,
                query: {redirect: encodeURIComponent(to.fullPath)},
            });
            return;
        }
    } else {
        // 获取用户信息
        const userStore = useUserStore();
        if (!userStore.userInfo && !accessWhileList.includes(to.path) && !to.path.startsWith('/redirect')) {
            // 如果用户信息不存在则尝试去获取
            try {
                await userStore.getUserInfo();
                const {generateRouterConf} = useRouterStore();
                // 获取并生成路由配置
                await generateRouterConf();
                next({
                    ...to,
                    replace: true,
                });
                return;
            } catch (e) {
                if (e instanceof AxiosError && e?.response?.status === 401) {
                    // 跳转到error页面
                    next({
                        path: '/401',
                    })
                }
            }
        } else {
            // 如果当前是登录页面就跳转到首页
            if (to.path === loginPath) {
                next({
                    path: '/',
                })
                return
            }
        }
    }
    next();
});

// router.afterEach((to) => {
//     useMetaTitle(to)
//     useLoadingCheck()
//     useScrollToTop()
// })
