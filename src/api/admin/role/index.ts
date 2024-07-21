import type { AdminResponseBody } from "@/api/admin";
import type { GetRoleListRequest, SaveRoleRequest } from "@/api/admin/role/types";

export const getRoleList = (data: GetRoleListRequest) => {
  return usePost<AdminResponseBody, GetRoleListRequest>(
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

export const saveRole = (data: SaveRoleRequest) => {
  return usePost<AdminResponseBody, SaveRoleRequest>(
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
