// 角色相关接口
import {axios} from "@/utils/axios-interseptor";
import {permUrl} from "@/api/admin";

export function getRoleList() {
    return axios({
        url: `${permUrl}/Base_Manage/Base_Role/GetDataList`,
        method: 'POST',
        data: {}
    });
}

export function getRole() {
    return axios({
        url: `${permUrl}/Base_Manage/Base_Role/GetTheData`,
        method: 'POST'
    });
}

export function saveRole(data: any) {
    return axios({
        url: `${permUrl}/Base_Manage/Base_Role/SaveData`,
        method: 'POST',
        data
    });
}

export function deleteRole(id: string) {
    return axios({
        url: `${permUrl}/Base_Manage/Base_Role/DeleteData`,
        method: 'POST',
        data: [id]
    });
}
