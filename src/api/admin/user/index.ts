// 用户相关接口
import {axios} from "@/utils/axios-interseptor";
import {permUrl} from "@/api/admin";

export function getUserList(data: any) {
    return axios({
        url: `${permUrl}/Base_Manage/Base_User/GetDataList`,
        method: 'POST',
        data
    });
}

export function getUser() {
    return axios({
        url: `${permUrl}/Base_Manage/Base_User/GetTheData`,
        method: 'POST'
    });
}

export function getOptionList() {
    return axios({
        url: `${permUrl}/Base_Manage/Base_User/GetOptionList`,
        method: 'POST'
    });
}

export function saveUser(data: any) {
    return axios({
        url: `${permUrl}/Base_Manage/Base_User/SaveData`,
        method: 'POST',
        data
    });
}

export function deleteUser() {
    return axios({
        url: `${permUrl}/Base_Manage/Base_User/DeleteData`,
        method: 'POST'
    });
}
