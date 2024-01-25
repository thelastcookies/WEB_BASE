export const useTokenStore = defineStore('token', () => {
    const token = ref("");

    const setToken = (t: string) => {
        Token.setToken(t);
        token.value = t;
    };

    const $reset = () => {
        Token.removeToken();
        token.value = "";
    };

    return {
        token,
        setToken,
        $reset
    }
});
