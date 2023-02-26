import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Box, IconButton, InputBase } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import debounce from 'lodash.debounce'
import { ChangeEvent, useCallback, useState } from 'react'
import Swal from 'sweetalert2'
import { sectionApi, taskApi } from '../../../api'
import { ISection, ITask } from '../../../types'
import { Tasks } from '../../Tasks'

export interface ISectionItemProps {
    section: ISection
    onDelete: (id: string) => void
}

export function SectionItem({ section, onDelete }: ISectionItemProps) {
    const [title, setTitle] = useState<string>(section.title)
    const [taskList, setTaskList] = useState<ITask[]>(section.tasks)

    const debounceUpdateTitle = useCallback(
        debounce(async (section: ISection) => {
            await sectionApi.update(section)
        }, 700),
        []
    )

    const handleTitleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const value = e.target.value
            const newSection: ISection = {
                ...section,
                title: value,
            }

            setTitle(value)
            debounceUpdateTitle(newSection)
        } catch (error: any) {
            console.log('Title: ', error)
        }
    }

    const handleDeleteSection = async () => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `You want to delete ${section.title}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: blue[700],
                cancelButtonColor: grey[500],
                confirmButtonText: 'Yes, delete it!',
                reverseButtons: true,
            })

            if (result.isConfirmed) {
                onDelete(section.id)
                Swal.fire('Deleted!', 'Your section has been deleted.', 'success')

                await sectionApi.remove(section.id)
            }
        } catch (error: any) {
            console.log('Delete section: ', error)
        }
    }

    const handleAddTask = async () => {
        try {
            const res = await taskApi.create(section.id)
            setTaskList((prev) => [...prev, res.data.task])
        } catch (error: any) {
            console.log('Add task: ', error)
        }
    }

    const handleTaskChange = (newTask: ITask) => {
        const newTaskList = [...taskList]
        const index = newTaskList.findIndex((task: ITask) => task.id === newTask.id)

        if (index >= 0) {
            newTaskList[index] = newTask
            setTaskList(newTaskList)
        }
    }

    const handleTaskDelete = async (id: string) => {
        try {
            console.log(id)
            const newTaskList: ITask[] = [...taskList].filter(
                (task: ITask) => task.id !== id
            )
            setTaskList(newTaskList)
            await taskApi.remove(id, section.id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    columnGap: '8px',
                    alignItems: 'center',
                    padding: '8px 0',
                }}
            >
                <InputBase
                    value={title}
                    onChange={handleTitleChange}
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '14px',
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <IconButton onClick={handleAddTask}>
                        <AddIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={handleDeleteSection}>
                        <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: '8px',
                }}
            >
                <Tasks
                    taskList={taskList}
                    onChange={handleTaskChange}
                    onDelete={handleTaskDelete}
                />
            </Box>
        </Box>
    )
}
