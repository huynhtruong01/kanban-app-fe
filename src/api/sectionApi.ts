import AxiosClient from '.'
import { ISection } from '../types'

const url = '/sections'

export const create = (id: string) => {
    return AxiosClient.post(`${url}`, {
        boardId: id,
    }).then((res) => res.data)
}

export const update = ({ id, ...params }: ISection) => {
    return AxiosClient.put(`${url}/${id}`, params).then((res) => res.data)
}

export const remove = (id: string) => {
    return AxiosClient.delete(`${url}/${id}`).then((res) => res.data)
}
