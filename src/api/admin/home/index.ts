import type { ChangePwdRequestBody, LoginRequestBody } from "./types";
import type { AdminResponseBody } from "@/api/admin";

export const login = (data: LoginRequestBody) => {
  return usePost<AdminResponseBody, LoginRequestBody>(
    `${PERM_URL}/Base_Manage/Home/SubmitLogin`,
    data, {
      // mock: true,
    }
  );
};

export const changePwd = (data: ChangePwdRequestBody) => {
  return usePost<AdminResponseBody, ChangePwdRequestBody>(
    `${PERM_URL}/Base_Manage/Home/ChangePwd`,
    data,
  );
}

export const getOperatorInfo = () => {
  return usePost<AdminResponseBody>(
    `${PERM_URL}/Base_Manage/Home/GetOperatorInfo`,
    null, {
      token: true,
      // mock: true,
    }
  );
};

export const getOperatorMenuList = () => {
  return usePost<AdminResponseBody>(
    `${PERM_URL}/Base_Manage/Home/GetOperatorMenuList`,
    null,
    {
      token: true,
    }
  );
};

export const getOperatorMenuListByUsername = () => {
  return usePost<AdminResponseBody>(
    `${PERM_URL}/Base_Manage/Home/GetOperatorMenuListByUserName`,
  );
};
