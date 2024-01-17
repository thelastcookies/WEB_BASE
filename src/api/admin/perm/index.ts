// 系统权限相关接口
import {axios} from "@/utils/axios-interseptor";
import {permUrl} from "@/api/admin";

export function getPermission() {
    return axios({
        url: `${permUrl}/Base_Manage/Base_Action/GetTheData`,
        method: 'POST'
    });
}

export function getPermissionList() {
    return axios({
        url: `${permUrl}/Base_Manage/Base_Action/GetPermissionList`,
        method: 'POST'
    });
}

export function getActionList() {
    return axios({
        url: `${permUrl}/Base_Manage/Base_Action/GetAllActionList`,
        method: 'POST'
    });
}

export function getActionTreeList() {
    return axios({
        url: `${permUrl}/Base_Manage/Base_Action/GetActionTreeList`,
        method: 'POST'
    });
}

export function getMenuTreeList() {
    return axios({
        url: `${permUrl}/Base_Manage/Base_Action/GetMenuTreeList`,
        method: 'POST',
        data: {}
    });
}

export function saveAction() {
    return axios({
        url: `${permUrl}/Base_Manage/Base_Action/SaveData`,
        method: 'POST'
    });
}

export function deleteAction() {
    return axios({
        url: `${permUrl}/Base_Manage/Base_Action/DeleteData`,
        method: 'POST'
    });
}
