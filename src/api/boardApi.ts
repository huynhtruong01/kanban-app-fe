import AxiosClient from '.'
import { IBoard, IBoardParams, IBoardParamsUpdate } from '../types'

const url = '/boards'

export const getAll = () => {
    return AxiosClient.get(url).then((res) => res.data)
}

export const getAllFavorites = () => {
    return AxiosClient.get(`${url}/favorites`).then((res) => res.data)
}

export const get = (id: string) => {
    return AxiosClient.get(`${url}/${id}`).then((res) => res.data)
}

export const create = () => {
    return AxiosClient.post(url).then((res) => res.data)
}

export const update = ({ id, ...params }: IBoardParamsUpdate) => {
    return AxiosClient.put(`${url}/${id}`, params).then((res) => res.data)
}

export const updatePosition = (params: IBoard[]) => {
    return AxiosClient.put(`${url}`, {
        boards: params,
    }).then((res) => res.data)
}

export const updateFavoritePosition = (params: IBoard[]) => {
    return AxiosClient.post(`${url}/favorites`, {
        favorites: params,
    }).then((res) => res.data)
}

export const remove = (id: string) => {
    return AxiosClient.delete(`${url}/${id}`)
}
