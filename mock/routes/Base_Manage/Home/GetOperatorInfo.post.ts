import type {AdminResponseBody} from "../../../../src/api/admin";

export default eventHandler(async (event): Promise<AdminResponseBody<Object>> => {
    return {
        Success: true,
        ErrorCode: 0,
        Data: {
            UserInfo: {
                Id: 'Admin',
            },
        },
        Msg: '',
    }
});

