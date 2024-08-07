import type { AdminResponseBody } from "@/api/admin";
import type { GetActionsRequestBody, SaveActionRequestBody } from "@/api/admin/action/types";

export const getAction = (id: string) => {
  return usePost<AdminResponseBody, Record<string, string>>(
    `${PERM_URL}/Base_Manage/Base_Action/GetTheData`,
    { id },
  );
};

export const getPermissionList = (data: GetActionsRequestBody) => {
  return usePost<AdminResponseBody, GetActionsRequestBody>(
    `${PERM_URL}/Base_Manage/Base_Action/GetPermissionList`,
    data,
  );
};

export const getActionList = () => {
  return usePost<AdminResponseBody>(
    `${PERM_URL}/Base_Manage/Base_Action/GetAllActionList`,
  );
};

export const getMenuTreeList = (data: GetActionsRequestBody) => {
  return usePost<AdminResponseBody, GetActionsRequestBody>(
    `${PERM_URL}/Base_Manage/Base_Action/GetMenuTreeList`,
    data,
  );
};

export const getActionTreeList = (data: GetActionsRequestBody) => {
  return usePost<AdminResponseBody, GetActionsRequestBody>(
    `${PERM_URL}/Base_Manage/Base_Action/GetActionTreeList`,
    data,
  );
};

export const saveAction = (data: SaveActionRequestBody) => {
  return usePost<AdminResponseBody, SaveActionRequestBody>(
    `${PERM_URL}/Base_Manage/Base_Action/SaveData`,
    data,
  );
};

export const deleteAction = (ids: string[]) => {
  return usePost<AdminResponseBody, string[]>(
    `${PERM_URL}/Base_Manage/Base_Action/DeleteData`,
    ids,
  );
};
