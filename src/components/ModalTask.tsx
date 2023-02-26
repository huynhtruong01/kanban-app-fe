import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Box, IconButton, InputBase, Modal, Typography } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import debounce from 'lodash.debounce'
import moment from 'moment'
import { ChangeEvent, Dispatch, useCallback, useEffect, useState } from 'react'
import { taskApi } from '../api'
import { ITask } from '../types'
import './styles/editorStyles.css'

export interface IModalTaskProps {
    task: ITask
    open: boolean
    setOpen: Dispatch<React.SetStateAction<boolean>>
    onChange: (task: ITask) => void
    onDelete: (id: string) => void
}

const useStyles = makeStyles({
    modalContainer: {
        position: 'absolute',
        width: 900,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '8px',
        borderRadius: '4px',
        height: '80%',
        outline: 'none',
    },
    modalInner: {
        padding: '56px',
    },
})

export function ModalTask({ task, open, setOpen, onChange, onDelete }: IModalTaskProps) {
    const styles = useStyles()
    const [title, setTitle] = useState<string>(task.title)
    const [content, setContent] = useState<string>(task.content)

    useEffect(() => {
        setTitle(task.title)
        setContent(task.content)
    }, [task])

    const debounceChange = useCallback(
        debounce(async (task: ITask) => {
            await taskApi.update(task)
        }, 700),
        []
    )

    const handleClose = () => {
        setOpen(false)
    }

    const handleTitle = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const value = e.target.value
            const newTask: ITask = {
                ...task,
                title: value,
            }

            setTitle(value)
            onChange(newTask)
            debounceChange(newTask)
        } catch (error: any) {
            console.log('Title modal task: ', error)
        }
    }

    const handleContentChange = (e: any, editor: any) => {
        const data = editor.getData()
        const newTask: ITask = {
            ...task,
            content: data,
        }

        setContent(data)
        onChange(newTask)
        debounceChange(newTask)
    }

    const handleDeleteTask = () => {
        onDelete(task.id)
        setOpen(false)
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                className={styles.modalContainer}
                sx={{
                    bgcolor: 'background.paper',
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        right: '8px',
                        top: '8px',
                        '& > svg': {
                            color: red[500],
                        },
                    }}
                    onClick={handleDeleteTask}
                >
                    <DeleteOutlineIcon />
                </IconButton>
                <Box className={styles.modalInner}>
                    <Box
                        sx={{
                            padding: '32px 0',
                            borderBottom: `1px solid ${grey[500]}`,
                        }}
                    >
                        <InputBase
                            value={title}
                            placeholder="Title..."
                            sx={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                            }}
                            onChange={handleTitle}
                        />
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '14px',
                            }}
                        >
                            {moment(new Date()).format('YYYY-MM-DD')}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            paddingTop: '32px',
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            height: '80%',
                        }}
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onChange={handleContentChange}
                        />
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
