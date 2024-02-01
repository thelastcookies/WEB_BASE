import type {AdminResponseBody} from "../../../../src/api/admin";

export default eventHandler(async (event): Promise<AdminResponseBody<string>> => {
    return {
        Success: true,
        ErrorCode: 0,
        Data: 'jfldsahofwbikbfdjovafajopfenwaonofdjoivjoapkf[da',
        Msg: '',
    }
});

