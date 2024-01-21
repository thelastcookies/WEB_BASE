import type {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import axios from 'axios'
// import {AxiosLoading} from '@/utils/loading'
import router from '@/router'
import {ContentTypeEnum, RequestEnum} from "@/enums/http.ts";
import {notification} from 'ant-design-vue';
import {useTokenStore} from "@/stores/token.ts";
import {NamingStyleTransfer} from "@/enums/naming-style-transfer.ts";
import {RE_URL_FIRST_CUT} from "@/utils/regexp.ts";

const {token} = storeToRefs(useTokenStore());

/**
 * Represents the response body returned by an API request.
 * @template T The type of the data contained in the response body.
 */
export interface ResponseBody<T = any> {
    code: number
    data?: T
    msg: string
}

export interface RequestConfigExtra {
    token?: boolean;
    mock?: boolean;
    loading?: boolean;
    namingStyleTransfer?: NamingStyleTransfer;
}

const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API ?? '/',
    timeout: 60000,
    headers: {'Content-Type': ContentTypeEnum.JSON},
});

instance.interceptors.request.use(requestHandler);

instance.interceptors.response.use(responseHandler, errorHandler);

export default instance;

// const axiosLoading = new AxiosLoading();

async function requestHandler(config: InternalAxiosRequestConfig & RequestConfigExtra): Promise<InternalAxiosRequestConfig> {
    if (import.meta.env.DEV
        && import.meta.env.APP_API_MOCK_URL
        && config.mock) {
        const urlProc = config.url?.replace(RE_URL_FIRST_CUT, "/");
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

function responseHandler(response: any): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any {
    return response.data
}

function errorHandler(error: AxiosError): Promise<any> {
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

function instancePromise<R = any, T = any>(options: AxiosOptions<T> & RequestConfigExtra): Promise<ResponseBody<R>> {
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
}

export function useGet<R = any, T = any>(url: string, params?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
    const options = {
        url,
        params,
        method: RequestEnum.GET,
        ...config,
    };
    return instancePromise<R, T>(options);
}

export function usePost<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
    const options = {
        url,
        data,
        method: RequestEnum.POST,
        ...config,
    };
    return instancePromise<R, T>(options);
}

export function usePut<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
    const options = {
        url,
        data,
        method: RequestEnum.PUT,
        ...config,
    };
    return instancePromise<R, T>(options);
}

export function useDelete<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
    const options = {
        url,
        data,
        method: RequestEnum.DELETE,
        ...config,
    };
    return instancePromise<R, T>(options);
}
