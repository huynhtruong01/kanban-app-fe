import Picker from '@emoji-mart/react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { Box, Button, IconButton, InputBase } from '@mui/material'
import { blue, grey, red, yellow } from '@mui/material/colors'
import debounce from 'lodash.debounce'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { boardApi, sectionApi } from '../api'
import { CircularProgressLoading } from '../components/Loading/CircularProgressLoading'
import Sections from '../components/Sections'
import { initBoard } from '../data'
import { AppDispatch, AppState } from '../store'
import { deleteBoard, updateBoard, updateFavorite } from '../store/board'
import { deleteBoardApi, updateBoardApi } from '../store/board/thunkApi'
import { IBoard, IBoardParamsUpdate, ISection } from '../types'

export interface IBoardProps {
    boards: IBoard[]
    pUpdateBoard: (board: IBoard) => void
    pUpdateBoardApi: (board: IBoard) => Promise<unknown>
    pDeleteBoard: (id: string) => void
    pDeleteBoardApi: (id: string) => Promise<unknown>
}

function Board({
    boards,
    pUpdateBoard,
    pUpdateBoardApi,
    pDeleteBoard,
    pDeleteBoardApi,
}: IBoardProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const [board, setBoard] = useState<IBoard>(initBoard)
    const [showIcon, setShowIcon] = useState<boolean>(false)
    const [icon, setIcon] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [favorite, setFavorite] = useState<boolean>(false)
    const [sectionList, setSectionList] = useState<ISection[]>([])
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const getBoard = async () => {
            try {
                if (id) {
                    setLoading(true)
                    const res = await boardApi.get(id)
                    const newBoard: IBoard = res.data.board

                    setBoard(newBoard)
                    setIcon(newBoard.icon)
                    setFavorite(newBoard.favorite)
                    setTitle(newBoard.title)
                    setDescription(newBoard.description)
                    setSectionList(newBoard.sections)
                }
            } catch (error: any) {
                console.log(error)
            }
            setLoading(false)
        }
        getBoard()
    }, [navigate, id])

    const handleUpdateFavorite = async () => {
        try {
            if (id) {
                const newBoard: IBoardParamsUpdate = {
                    id,
                    title,
                    description,
                    icon,
                    favorite: !favorite,
                }

                setFavorite((prev) => !prev)
                dispatch(updateFavorite(newBoard))
                await boardApi.update(newBoard)
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleShowPicker = () => {
        setShowIcon((prev) => !prev)
    }

    const handleUpdateBoard = async (key: string, board: IBoard) => {
        try {
            if (id) {
                await pUpdateBoardApi(board)
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }

    const debounceUpdateBoard = useCallback(debounce(handleUpdateBoard, 700), [])

    const handleSetIcon = async (e: any) => {
        try {
            const sym = e.unified.split('-')
            const codesArray: number[] = []
            sym.forEach((el: string) => codesArray.push(Number(`0x${el}`)))
            const newIcon = String.fromCodePoint(...codesArray)

            setBoard({ ...board, icon: newIcon })
            setIcon(newIcon)
            setShowIcon(false)

            const newBoard: IBoard = {
                ...board,
                icon: newIcon,
            }

            pUpdateBoard(newBoard)
            await handleUpdateBoard('icon', newBoard)
        } catch (error: any) {
            console.log('Icon: ', error)
        }
    }

    const handleUpdateTitle = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const value: string = e.target.value
        const newBoard: IBoard = {
            ...board,
            title: value,
        }

        debounceUpdateBoard('title', newBoard)
        pUpdateBoard(newBoard)
        setTitle(value)
        setBoard({ ...newBoard })
    }

    const handleUpdateDescription = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        const value: string = e.target.value
        const newBoard: any = {
            ...board,
            description: value,
        }

        debounceUpdateBoard(key, newBoard)
        pUpdateBoard(newBoard)
        setDescription(value)
        setBoard({ ...newBoard })
    }

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete ${title}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: blue[700],
            cancelButtonColor: grey[500],
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: true,
        })

        if (result.isConfirmed && id) {
            pDeleteBoard(id)
            navigate(`/boards/${boards[0].id}`)
            Swal.fire('Deleted!', 'Your board has been deleted.', 'success')
            await pDeleteBoardApi(id)
        }
    }

    const handleCreateSection = async () => {
        try {
            if (id) {
                const res = await sectionApi.create(id)
                setSectionList((prev) => [...prev, res.data.section])
            }
        } catch (error: any) {
            console.log('Create section: ', error)
        }
    }

    const handleSetSections = (id: string) => {
        const newSectionList: ISection[] = [...sectionList].filter(
            (section: ISection) => section.id !== id
        )
        setSectionList(newSectionList)
    }

    return loading ? (
        <Box>
            <CircularProgressLoading fullHeight />
        </Box>
    ) : (
        <Box
            sx={{
                padding: '12px',
                '& .MuiInputBase-root': {
                    width: '100%',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <IconButton
                    onClick={handleUpdateFavorite}
                    sx={{
                        color: yellow[500],
                    }}
                >
                    {favorite ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
                <IconButton
                    sx={{
                        color: red[500],
                    }}
                    onClick={handleDelete}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    width: '90%',
                    margin: 'auto',
                }}
            >
                <Box
                    sx={{
                        p: '16px 0 20px',
                        borderBottom: `1px solid ${grey[300]}`,
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                        }}
                    >
                        <IconButton
                            onClick={handleShowPicker}
                            sx={{
                                fontSize: '2rem',
                            }}
                        >
                            {icon}
                        </IconButton>

                        <Box
                            sx={{
                                display: showIcon ? 'block' : 'none',
                                position: 'absolute',
                                top: 0,
                                zIndex: 9999,
                            }}
                        >
                            <Picker
                                theme="dark"
                                data={board?.icon}
                                onEmojiSelect={handleSetIcon}
                                showPreview={false}
                            />
                        </Box>
                    </Box>
                    <Box>
                        <InputBase
                            value={title}
                            sx={{
                                fontSize: '2rem',
                                fontWeight: 600,
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleUpdateTitle(e, 'title')
                            }
                        />
                    </Box>
                    <Box>
                        <InputBase
                            value={description}
                            placeholder="Add a description"
                            multiline
                            sx={{
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                paddingLeft: '16px',
                                lineHeight: 2.2,
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleUpdateDescription(e, 'description')
                            }
                        />
                    </Box>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        sx={{
                            mt: '16px',
                            fontWeight: 600,
                        }}
                        onClick={handleCreateSection}
                    >
                        Add Section
                    </Button>
                </Box>
                <Box
                    sx={{
                        padding: '12px',
                    }}
                >
                    <Sections sectionList={sectionList} onDelete={handleSetSections} />
                </Box>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        boards: state.board.boards,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pUpdateBoard: (board: IBoard) => dispatch(updateBoard(board)),
        pUpdateBoardApi: (board: IBoard) => dispatch(updateBoardApi(board)),
        pDeleteBoard: (id: string) => dispatch(deleteBoard(id)),
        pDeleteBoardApi: (id: string) => dispatch(deleteBoardApi(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
