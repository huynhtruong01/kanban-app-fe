export interface ITaskInfo {
    section: string
    title: string
    content: string
    position: number
}

export interface ITaskId {
    id: string
}

export type ITask = ITaskInfo & ITaskId

export interface ITaskModal {
    id: string
    title: string
    content: string
}
