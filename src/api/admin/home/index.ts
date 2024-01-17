import {axios} from '@/utils/axios-interseptor'
import {permUrl} from "src/api/admin";

export interface LoginForm {
    userName: string
    password: string
}

export function login(form: LoginForm) {
    return axios({
        url: `${permUrl}/Base_Manage/Home/SubmitLogin`,
        method: 'POST',
        data: form
    });
}

export function changePwd() {
    return axios({
        url: `${permUrl}/Base_Manage/Home/ChangePwd`,
        method: 'POST'
    });
}

export function getOperatorInfo() {
    return axios({
        url: `${permUrl}/Base_Manage/Home/GetOperatorInfo`,
        method: 'POST'
    });
}

export function getOperatorMenuList() {
    return axios({
        url: `${permUrl}/Base_Manage/Home/GetOperatorMenuList`,
        method: 'POST'
    });
}

export function getOperatorMenuListByUsername() {
    return axios({
        url: `${permUrl}/Base_Manage/Home/GetOperatorMenuListByUsername`,
        method: 'POST'
    });
}
