import type { AdminResponseBody } from "@/api/admin";
import type { GetRoleListRequestBody, SaveRoleRequestBody } from "@/api/admin/role/types";

export const getRoleList = (data: GetRoleListRequestBody) => {
  return usePost<AdminResponseBody, GetRoleListRequestBody>(
    `${PERM_URL}/Base_Manage/Base_Role/GetDataList`,
    data,
  );
};

export const getRole = (id: string) => {
  return usePost<AdminResponseBody, Record<string, string>>(
    `${PERM_URL}/Base_Manage/Base_Role/GetTheData`,
    { id },
  );
};

export const saveRole = (data: SaveRoleRequestBody) => {
  return usePost<AdminResponseBody, SaveRoleRequestBody>(
    `${PERM_URL}/Base_Manage/Base_Role/SaveData`,
    data,
  );
};

export const deleteRole = (ids: string[]) => {
  return usePost<AdminResponseBody, string[]>(
    `${PERM_URL}/Base_Manage/Base_Role/DeleteData`,
    ids,
  );
};
