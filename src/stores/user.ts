import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', () => {
    const userInfo = {};
    const userPerms = [] as any[];
    return {
        userInfo,
        userPerms,
    }
});
