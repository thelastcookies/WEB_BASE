import type { AdminResponseBody, GetOptionRequest } from "@/api/admin";
import type { GetUserListRequest, SaveUserRequest } from "@/api/admin/user/types";

export const getUserList = (data: GetUserListRequest) => {
  return usePost<AdminResponseBody, GetUserListRequest>(
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

export const getOptionList = (data: GetOptionRequest) => {
  return usePost<AdminResponseBody, GetOptionRequest>(
    `${PERM_URL}/Base_Manage/Base_User/GetOptionList`,
    data,
  );
};

export const saveUser = (data: SaveUserRequest) => {
  return usePost<AdminResponseBody, SaveUserRequest>(
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
