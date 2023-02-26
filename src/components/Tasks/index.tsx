import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useState } from 'react'
import { initTaskModal } from '../../data'
import { ITask } from '../../types'
import { ModalTask } from '../ModalTask'

export interface ITasksProps {
    taskList: ITask[]
    onChange: (task: ITask) => void
    onDelete: (id: string) => void
}

export function Tasks({ taskList, onChange, onDelete }: ITasksProps) {
    const [taskModal, setTaskModal] = useState<ITask>(initTaskModal)
    const [open, setOpen] = useState<boolean>(false)

    const handleSetTask = (task: ITask) => {
        const newTaskModal: ITask = {
            ...task,
        }
        setTaskModal(newTaskModal)
        setOpen(true)
    }

    const handleDeleteTask = (id: string) => {
        onDelete(id)
    }

    const handleTaskChange = (newTaskModal: ITask) => {
        onChange(newTaskModal)
    }

    return (
        <Box>
            {taskList.map((task: ITask) => (
                <Box
                    key={task.id}
                    sx={{
                        backgroundColor: '#292929',
                        padding: '8px',
                        marginBottom: '12px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        border: '2px solid transparent',
                        transition: '0.3s ease-in-out',

                        '&:hover': {
                            borderColor: grey[700],
                        },
                    }}
                    onClick={() => handleSetTask(task)}
                >
                    {task.title}
                </Box>
            ))}
            <ModalTask
                task={taskModal}
                open={open}
                setOpen={setOpen}
                onChange={handleTaskChange}
                onDelete={handleDeleteTask}
            />
        </Box>
    )
}
