import axios from "axios";
import msg from "./message";

export interface ApiResponse {
    code: number
    msg: string
    data: any
    details?: string[]
}
// request 拦截器
// 修改请求超时时间，增加请求 token
axios.interceptors.request.use(req => {
    // 超时时间
    req.timeout = 30000;
    return req;
}, err => {
    return Promise.reject(err);
});

// response 拦截器
// 主要负责对网络以及服务器错误进行筛选
axios.interceptors.response.use(res => {
    if (res.config.url?.includes(':8192')) {
        if (
            res.status === 200 ||
            res.status === 201 ||
            res.status === 204
        ) {
            return res.data;
        } else {
            const err = `Message: ${res.data.msg}, Code: ${res.data.code};`
            msg.error(err);
            console.error(err);
            return Promise.reject(err);
        }
    } else if (res.data.code === 200 && res.data.msg === 'success') {
        return res.data.data;
    } else if (res.data.ErrorCode === 0 && res.data.Success === true) {
        return res;
    } else {
        const err = `Message: ${res.data.msg || res.data.Msg}, Code: ${res.data.code || res.data.ErrorCode};`
        msg.error(err);
        console.error(err);
        return Promise.reject(err);
    }
}, err => {
    // if (err.code === "ECONNABORTED")
    // msg.timeoutError();
    // else
    // msg.networkError(err.response.status);
    return Promise.reject(err);
});

export {axios};
