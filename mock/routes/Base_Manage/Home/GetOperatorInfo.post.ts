import type {AdminResponseBody} from "../../../../src/api/admin";

export default eventHandler(async (event): Promise<AdminResponseBody<Object>> => {
    return {
        Success: true,
        ErrorCode: 0,
        Data: {
            UserInfo: {
                Id: 'SuperAdmin',
                UserName: 'Admin',
                RealName: '超级管理员',
            },
        },
        Msg: '',
    }
});

