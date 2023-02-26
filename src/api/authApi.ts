import AxiosClient from '.'
import { IAuthLogin, IAuthSignup } from '../types'

const url = '/auth'

export const login = (params: IAuthLogin) => {
    return AxiosClient.post(`${url}/login`, params).then((res) => res.data)
}

export const signup = (params: IAuthSignup) => {
    return AxiosClient.post(`${url}/signup`, params).then((res) => res.data)
}

export const verifyToken = () => {
    return AxiosClient.post(`${url}/verify-token`).then((res) => res.data)
}
