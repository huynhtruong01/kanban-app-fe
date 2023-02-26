import { ISection } from './sectionInterface'

export interface IBoardParams {
    user: string
}

export interface IBoardParamsUpdate {
    id: string
    title: string
    description: string
    favorite: boolean
    icon: string
}

export interface IBoardInfo {
    icon: string
    title: string
    description: string
    favorite: boolean
    favoritePosition: number
    sections: ISection[]
    position: number
}

export interface IBoardId {
    id: string
}

export type IBoard = IBoardInfo & IBoardId

export interface IBoardInitState {
    favorites: IBoard[]
    boards: IBoard[]
}
