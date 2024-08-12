import type { AdminResponseBody, GetOptionRequestBody } from "@/api/admin";
import type {
  GetUserListRequestBody,
  SaveUserRequestBody,
  UserListOptionItem,
  UserRecord,
} from "@/api/admin/user/types";

export const getUserList = (data: GetUserListRequestBody) => {
  return usePost<AdminResponseBody<UserRecord[]>, GetUserListRequestBody>(
    `${PERM_URL}/Base_Manage/Base_User/GetDataList`,
    data,
  );
};

export const getUser = (id: string) => {
  return usePost<AdminResponseBody<UserRecord>, Record<string, string>>(
    `${PERM_URL}/Base_Manage/Base_User/GetTheData`,
    { id },
  );
};

// 按照 UserListOptionItem 的结构返回用户列表，便于在组件内使用
export const getOptionList = (data: GetOptionRequestBody) => {
  return usePost<AdminResponseBody<UserListOptionItem>, GetOptionRequestBody>(
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

export const deleteUser = (ids: string[]) => {
  return usePost<AdminResponseBody, string[]>(
    `${PERM_URL}/Base_Manage/Base_User/DeleteData`,
    ids,
  );
};
