import {defineStore} from "pinia";
import {ref} from "vue";
import {Token} from "@/utils/token";
import {useRouterStore} from "@/stores/router";
import {useUserStore} from "@/stores/user";
import router from "@/router";

export const useAppStore = defineStore('app', () => {
    const windowInnerWidth = ref(0);
    const windowInnerHeight = ref(0);

    const logOut = () => {
        Token.removeToken();
        const routerStore = useRouterStore();
        const userStore = useUserStore();
        routerStore.routerConf = [];
        userStore.userToken = "";
        userStore.userInfo = {};
        userStore.userPerms = [];

        if (import.meta.env.APP_LOGIN_ENABLE === "true") {
            router.push("/login");
        } else {
            parent.window.location.assign("http://172.22.116.13:8080/cas/logout?service=http://172.22.116.13:8080/cas/login?service=http%3A%2F%2F172.22.116.20%3A7303%2Fportal%2F");
        }
    }
    return {
        windowInnerWidth,
        windowInnerHeight,
        logOut
    }
});
