import {defineStore} from 'pinia'
import {getOperatorInfo} from "@/api/admin/home";
import {UserInfo} from "@/api/admin/home/types.ts";

export const useUserStore = defineStore('user', () => {
    const userInfo = shallowRef<UserInfo>();
    const userPerms = shallowRef([] as any[]);

    const getUserInfo = async () => {
        // 获取用户信息
        const { data } = await getOperatorInfo();
        userInfo.value = data;
    };

    const $reset = () => {
        userInfo.value = {} as UserInfo;
        userPerms.value = [];
    };

    return {
        userInfo,
        userPerms,
        getUserInfo,
        $reset
    }
});
