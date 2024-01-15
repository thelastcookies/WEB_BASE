import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', () => {
    const userInfo = {};
    const userPerms = [] as any[];
    const userToken = ""
    return {
        userInfo,
        userPerms,
        userToken
    }
});
