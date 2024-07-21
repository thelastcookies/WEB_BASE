import type { ChangePwdRequest, LoginRequest } from "./types";
import type { AdminResponseBody } from "@/api/admin";

export const login = (data: LoginRequest) => {
  return usePost<AdminResponseBody, LoginRequest>(
    `${PERM_URL}/Base_Manage/Home/SubmitLogin`,
    data, {
      // mock: true,
    }
  );
};

export const changePwd = (data: ChangePwdRequest) => {
  return usePost<AdminResponseBody, ChangePwdRequest>(
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
