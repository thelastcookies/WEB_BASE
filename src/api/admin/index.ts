export const PERM_URL = import.meta.env.APP_API_PERM_URL;

export interface AdminResponseBody<T = any> {
    Success: boolean;
    ErrorCode: number;
    Data: T;
    Msg: string;
}
