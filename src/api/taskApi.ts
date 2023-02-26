import AxiosClient from '.'
import { ITask } from '../types'

const url = '/tasks'

export const create = (id: string) => {
    return AxiosClient.post(url, {
        sectionId: id,
    }).then((res) => res.data)
}

export const update = ({ id, ...params }: ITask) => {
    return AxiosClient.put(`${url}/${id}`, params).then((res) => res.data)
}

export const remove = (id: string, sectionId: string) => {
    return AxiosClient.put(`${url}/${id}`, {
        sectionId,
    }).then((res) => res.data)
}
