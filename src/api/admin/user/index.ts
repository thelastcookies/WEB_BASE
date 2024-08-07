import type { AdminResponseBody, GetOptionRequestBody } from "@/api/admin";
import type { GetUserListRequestBody, SaveUserRequestBody } from "@/api/admin/user/types";

export const getUserList = (data: GetUserListRequestBody) => {
  return usePost<AdminResponseBody, GetUserListRequestBody>(
    `${PERM_URL}/Base_Manage/Base_User/GetDataList`,
    data,
  );
};

export const getUser = (id: string) => {
  return usePost<AdminResponseBody, Record<string, string>>(
    `${PERM_URL}/Base_Manage/Base_User/GetTheData`,
    { id },
  );
};

export const getOptionList = (data: GetOptionRequestBody) => {
  return usePost<AdminResponseBody, GetOptionRequestBody>(
    `${PERM_URL}/Base_Manage/Base_User/GetOptionList`,
    data,
  );
};

export const saveUser = (data: SaveUserRequestBody) => {
  return usePost<AdminResponseBody, SaveUserRequestBody>(
    `${PERM_URL}/Base_Manage/Base_User/SaveData`,
    data,
  );
};

export const deleteData = (ids: string[]) => {
  return usePost<AdminResponseBody, string[]>(
    `${PERM_URL}/Base_Manage/Base_User/DeleteData`,
    ids,
  );
};
