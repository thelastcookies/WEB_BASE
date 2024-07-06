import type { LoginParams } from "./types";
import type { AdminResponseBody } from "@/api/admin";

export const login = (params: LoginParams) => {
  return usePost<AdminResponseBody, LoginParams>(
    `${PERM_URL}/Base_Manage/Home/SubmitLogin`,
    params, {
      // mock: true,
    }
  );
}

// export function changePwd() {
//     return axios({
//         url: `${PERM_URL}/Base_Manage/Home/ChangePwd`,
//         method: 'POST'
//     });
// }

export function getOperatorInfo() {
  return usePost<AdminResponseBody>(
    `${PERM_URL}/Base_Manage/Home/GetOperatorInfo`,
    null, {
      token: true,
      // mock: true,
    }
  );
}

export function getOperatorMenuList() {
  return usePost<AdminResponseBody>(
    `${PERM_URL}/Base_Manage/Home/GetOperatorMenuList`,
    null,
    {
      token: true,
    }
  );
}

export function getOperatorMenuListByUsername() {
  return usePost<AdminResponseBody>(
    `${PERM_URL}/Base_Manage/Home/GetOperatorMenuListByUserName`,
  );
}
