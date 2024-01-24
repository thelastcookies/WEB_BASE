/**
 * 对于 axios 请求的扩展，包括请求拦截器、响应拦截器和错误处理
 * 提供 axios 实例
 */
import type {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import axios from 'axios'
import router from '@/router'
import {ContentTypeEnum} from "@/enums/http.ts";
import {notification} from 'ant-design-vue';
import {useTokenStore} from "@/stores/token.ts";
import {NamingStyleTransfer} from "@/enums/naming-style-transfer.ts";
import {RE_CUT_URL_PREFIX} from "@/utils/regexp.ts";

const {token} = storeToRefs(useTokenStore());

export interface ResponseBody<T = any> {
    code: number
    data?: T
    msg: string
}

export interface RequestConfigExtra {
    // 请求时是否携带 token
    token?: boolean;
    // 是否使用 mock
    mock?: boolean;
    loading?: boolean;
    namingStyleTransfer?: NamingStyleTransfer;
}

// const axiosLoading = new AxiosLoading();

const requestHandler = async (
    config: InternalAxiosRequestConfig & RequestConfigExtra
): Promise<InternalAxiosRequestConfig> => {
    if (import.meta.env.DEV
        && import.meta.env.APP_API_MOCK_URL
        && config.mock) {
        const urlProc = config.url?.replace(RE_CUT_URL_PREFIX, "/");
        config.url = import.meta.env.APP_API_MOCK_URL + urlProc;
    }
    if (token.value && config.token !== false) {
        config.headers.set('Authorization', "Bearer " + token.value);
    }
    if (config.loading) {
        // axiosLoading.addLoading();
    }
    // if (config.)
    return config;
}

const responseHandler = (response: any): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any => {
    /******************************************
     * 预留 NamingStyleTransfer 的处理
     */
    return response.data;
}

const errorHandler = (error: AxiosError): Promise<any> => {
    const [notificationApi] = notification.useNotification();

    if (error.response) {
        const {data, status, statusText} = error.response as AxiosResponse<ResponseBody>;
        if (status === 401) {
            notificationApi?.error({
                message: '401',
                description: data?.msg || statusText,
                duration: 3,
            });
            token.value = "";
            router.push({
                path: '/login',
                query: {
                    redirect: router.currentRoute.value.fullPath,
                },
            }).then(() => {
            });
        } else if (status === 403) {
            notificationApi?.error({
                message: '403',
                description: data?.msg || statusText,
                duration: 3,
            });
        } else if (status === 500) {
            notificationApi?.error({
                message: '500',
                description: data?.msg || statusText,
                duration: 3,
            });
        } else {
            notificationApi?.error({
                message: '服务错误',
                description: data?.msg || statusText,
                duration: 3,
            });
        }
    }
    return Promise.reject(error)
}

interface AxiosOptions<T> {
    url: string
    params?: T
    data?: T
}

export const instancePromise = <R = any, T = any>(options: AxiosOptions<T> & RequestConfigExtra): Promise<ResponseBody<R>> => {
    const {loading} = options;
    return new Promise((resolve, reject) => {
        instance.request(options).then((res) => {
            resolve(res as any);
        }).catch((e: Error | AxiosError) => {
            reject(e);
        }).finally(() => {
            if (loading) {
                // axiosLoading.closeLoading();
            }
        });
    });
};

const instance: AxiosInstance = axios.create({
    baseURL: '/',
    timeout: 60000,
    headers: {'Content-Type': ContentTypeEnum.JSON},
});

instance.interceptors.request.use(requestHandler);

instance.interceptors.response.use(responseHandler, errorHandler);

export default instance;
