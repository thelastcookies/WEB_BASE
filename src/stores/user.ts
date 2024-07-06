import type { UserInfo } from "@/api/admin/home/types";

export const useUserStore = defineStore('user', () => {
  const userInfo = shallowRef({} as UserInfo);
  const userPerms = shallowRef([] as any[]);

  const getUserInfo = async () => {
    return new Promise<void | Error>((resolve, reject) => {
      // 获取用户信息
      getOperatorInfo().then(res => {
        if (!res.Success) {
          reject(new Error(WITH_UNAUTHORIZED));
        } else {
          userInfo.value = preprocessUserInfo(res.Data.UserInfo) as UserInfo;
          userPerms.value = res.Data.Permissions;
          resolve();
        }
      }).catch(e => reject(e));
    });
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
    userName: info.UserName,
    realName: info.RealName,
  } as UserInfo;
}
