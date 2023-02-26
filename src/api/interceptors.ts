import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import { getLS } from '../utils'

const onRequestConfig = (config: InternalAxiosRequestConfig) => {
    const token = getLS('token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
}

const onError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
}

const onResponseConfig = (res: AxiosResponse): AxiosResponse => {
    return res
}

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(onRequestConfig, onError)
    axiosInstance.interceptors.response.use(onResponseConfig, onError)
}
