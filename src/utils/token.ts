const tokenKey = 'token';

export const Token = {
    getToken() {
        return localStorage.getItem(tokenKey);
    },
    setToken(newToken: string) {
        localStorage.setItem(tokenKey, newToken);
    },
    removeToken() {
        localStorage.removeItem(tokenKey);
    }
}
