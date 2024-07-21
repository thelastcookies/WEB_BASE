import type { AdminResponseBody } from "@/api/admin";
import type { GetActionsRequest, SaveActionRequest } from "@/api/admin/action/types";

export const getAction = (id: string) => {
  return usePost<AdminResponseBody, Record<string, string>>(
    `${PERM_URL}/Base_Manage/Base_Action/GetTheData`,
    { id },
  );
};

export const getPermissionList = (data: GetActionsRequest) => {
  return usePost<AdminResponseBody, GetActionsRequest>(
    `${PERM_URL}/Base_Manage/Base_Action/GetPermissionList`,
    data,
  );
};

export const getActionList = () => {
  return usePost<AdminResponseBody>(
    `${PERM_URL}/Base_Manage/Base_Action/GetAllActionList`,
  );
};

export const getMenuTreeList = (data: GetActionsRequest) => {
  return usePost<AdminResponseBody, GetActionsRequest>(
    `${PERM_URL}/Base_Manage/Base_Action/GetMenuTreeList`,
    data,
  );
};

export const getActionTreeList = (data: GetActionsRequest) => {
  return usePost<AdminResponseBody, GetActionsRequest>(
    `${PERM_URL}/Base_Manage/Base_Action/GetActionTreeList`,
    data,
  );
};

export const saveAction = (data: SaveActionRequest) => {
  return usePost<AdminResponseBody, SaveActionRequest>(
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
