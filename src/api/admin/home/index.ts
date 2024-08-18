import type { ChangePwdRequestBody, LoginRequestBody, OperatorInfo, UserNameRequestBody } from "./types";
import type { AdminResponseBody } from "@/api/admin";
import type { MenuResponseRecord } from "@/api/admin/action/types";

export const login = (data: LoginRequestBody) => {
  return usePost<AdminResponseBody<string>, LoginRequestBody>(
    `${ADMIN_URL}/Base_Manage/Home/SubmitLogin`,
    data,
    {
      // mock: true,
    }
  );
};

export const changePwd = (data: ChangePwdRequestBody) => {
  return usePost<AdminResponseBody, ChangePwdRequestBody>(
    `${ADMIN_URL}/Base_Manage/Home/ChangePwd`,
    data,
    {
      token: true,
    }
  );
}

export const getOperatorInfo = () => {
  return usePost<AdminResponseBody<OperatorInfo>>(
    `${ADMIN_URL}/Base_Manage/Home/GetOperatorInfo`,
    null,
    {
      token: true,
      // mock: true,
    }
  );
};

export const getOperatorMenuList = () => {
  return usePost<AdminResponseBody<MenuResponseRecord[]>>(
    `${ADMIN_URL}/Base_Manage/Home/GetOperatorMenuList`,
    null,
    {
      token: true,
    }
  );
};

export const getOperatorMenuListByUsername = (data: UserNameRequestBody) => {
  return usePost<AdminResponseBody<MenuResponseRecord[]>, UserNameRequestBody>(
    `${ADMIN_URL}/Base_Manage/Home/GetOperatorMenuListByUserName`,
    data,
  );
};
