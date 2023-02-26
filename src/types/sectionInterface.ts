import { ITask } from './taskInterface'

export interface ISectionInfo {
    board: string
    title: string
    tasks: ITask[]
}

export interface ISectionId {
    id: string
}

export type ISection = ISectionInfo & ISectionId

export interface ISectionStore {
    sections: ISection[]
}
