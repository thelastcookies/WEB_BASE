import {defineStore} from 'pinia'

export const useTokenStore = defineStore('token', () => {
    const token = ref("");

    const $reset = () => {

    };

    return {
        token,
        $reset
    }
});
