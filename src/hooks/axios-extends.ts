/**
 * 对于 axios 请求的扩展，包括请求拦截器、响应拦截器和错误处理
 * 提供 axios 实例
 */
import axios from 'axios';
import type {NamingStyleTransfer} from "@/types/enums/naming-style.ts";
import type {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";

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
        const urlProc = config.url?.replace(ReCutUrlPrefix, "/");
        config.url = import.meta.env.APP_API_MOCK_URL + urlProc;
    }
    if (config.token) {
        const {getToken} = useTokenStore();
        const token = getToken();
        if (token) {
            config.headers.set('Authorization', "Bearer " + token);
        } else {
            console.error(`function "requestHandler": Token is required for request '${config.method}' ${config.url}, but it is missing.`);
        }
    }
    if (config.loading) {
        // axiosLoading.addLoading();
    }
    return config;
}

// const responseHandler = (response: any): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any => {
const responseHandler = (response: any): AxiosResponse<any> | Promise<any> | any => {
    /******************************************
     * 预留 NamingStyleTransfer 的处理
     */
    return response.data;
}

const errorHandler = (error: AxiosError): Promise<any> => {
    // const [notificationApi] = notification.useNotification();

    if (error.response) {
        // const {data, status, statusText} = error.response as AxiosResponse<ResponseBody>;
        // if (status === 401) {
        //     notificationApi?.error({
        //         message: '401',
        //         description: data?.msg || statusText,
        //         duration: 3,
        //     });
        //     token.value = "";
        //     router.push({
        //         path: '/login',
        //         query: {
        //             redirect: router.currentRoute.value.fullPath,
        //         },
        //     }).then(() => {
        //     });
        // } else if (status === 403) {
        //     notificationApi?.error({
        //         message: '403',
        //         description: data?.msg || statusText,
        //         duration: 3,
        //     });
        // } else if (status === 500) {
        //     notificationApi?.error({
        //         message: '500',
        //         description: data?.msg || statusText,
        //         duration: 3,
        //     });
        // } else {
        //     notificationApi?.error({
        //         message: '服务错误',
        //         description: data?.msg || statusText,
        //         duration: 3,
        //     });
        // }
    }
    return Promise.reject(error)
}

interface AxiosOptions<T> {
    url: string
    params?: T
    data?: T
}

export const instancePromise = <R = any, T = any>(options: AxiosOptions<T> & RequestConfigExtra): Promise<R> => {
    const {loading} = options;
    return new Promise((resolve, reject) => {
        instance.request(options).then((res) => {
            resolve(res as R);
        }).catch((e: Error | AxiosError) => {
            console.error(`function "instancePromise": ${e}.`);
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
