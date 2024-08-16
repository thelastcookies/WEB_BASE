import type { UserRecord } from "@/api/admin/user/types";

export const useUserStore = defineStore("user", () => {
  const userInfo = shallowRef({} as UserRecord);
  const userPerms = shallowRef([] as string[]);

  const getUserInfo = async () => {
    return new Promise<void | Error>((resolve, reject) => {
      const { loginEnable } = useAppStore();
      // 如果关闭了路由守卫
      if (!loginEnable) {
        userInfo.value = { Id: "ROUTER_GUARD_DISABLE_PLACEHOLDER" };
        return resolve();
      }
      // 获取用户信息
      getOperatorInfo().then(res => {
        if (!res.Success) {
          reject(new Error(WITH_UNAUTHORIZED));
        } else {
          userInfo.value = res.Data!.UserInfo;
          userPerms.value = res.Data!.Permissions;
          resolve();
        }
      }).catch(e => reject(e));
    });
  };

  const $reset = () => {
    userInfo.value = {};
    userPerms.value = [];
  };

  return {
    userInfo,
    userPerms,
    getUserInfo,
    $reset,
  };
});

