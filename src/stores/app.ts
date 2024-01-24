import {defineStore} from "pinia";
import {ref} from "vue";
import {Token} from "@/utils/token";
import {useRouterStore} from "@/stores/router";
import {useUserStore} from "@/stores/user";
import {useTokenStore} from "@/stores/token.ts";

export const useAppStore = defineStore('app', () => {
    const windowInnerWidth = ref(0);
    const windowInnerHeight = ref(0);

    const signOut = () => {
        Token.removeToken();
        const routerStore = useRouterStore();
        routerStore.$reset();
        const userStore = useUserStore();
        userStore.$reset();
        const tokenStore = useTokenStore();
        tokenStore.$reset();

        const router = useRouter();

        if (import.meta.env.APP_LOGIN_ENABLE === "true") {
            router.push("/login");
        } else {
            parent.window.location.assign("");
        }
    }
    return {
        windowInnerWidth,
        windowInnerHeight,
        signOut
    }
});
