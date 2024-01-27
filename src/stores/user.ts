import type {UserInfo} from "@/api/admin/home/types";
import type {ActionMeta} from "@/router/types.ts";

export const useUserStore = defineStore('user', () => {
    const userInfo = shallowRef<UserInfo>();
    const userPerms = shallowRef([] as any[]);

    const getUserInfo = async () => {
        // 获取用户信息
        const {Data} = await getOperatorInfo();
        userInfo.value = preprocessUserInfo(Data.UserInfo);
        userPerms.value = Data.Permissions;
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

export const preprocessUserInfo = (info: any): UserInfo => {
    return {
        id: info.Id,
        userId: info.UserName,
        realName: info.RealName,
    } as UserInfo;
}
