export interface BaseResponseBody<T = any> {
    code: number
    data?: T
    msg: string
}
