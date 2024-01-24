import {permUrl} from "@/api/admin";
import {LoginParams, LoginResultModel, UserInfo} from "./types.ts";

export const login = (params: LoginParams) => {
    return usePost<LoginResultModel, LoginParams>(
        `${permUrl}/Base_Manage/Home/SubmitLogin`,
        params,
        {
            token: true,
        }
    );
}

// export function changePwd() {
//     return axios({
//         url: `${permUrl}/Base_Manage/Home/ChangePwd`,
//         method: 'POST'
//     });
// }

export function getOperatorInfo() {
    return usePost<UserInfo>(
        `${permUrl}/Base_Manage/Home/GetOperatorInfo`,
        null,
        {
            token: true,
        }
    );
}

export function getOperatorMenuList() {
    return usePost<any>(
        `${permUrl}/Base_Manage/Home/GetOperatorMenuList`,
        null,
        {
            token: true,
        }
    );
}

export function getOperatorMenuListByUsername() {
    return usePost<LoginResultModel>(
        `${permUrl}/Base_Manage/Home/GetOperatorMenuListByUserName`,
    );
}
