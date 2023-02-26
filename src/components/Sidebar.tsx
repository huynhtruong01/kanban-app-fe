import AddBoxIcon from '@mui/icons-material/AddBox'
import LogoutIcon from '@mui/icons-material/Logout'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { boardApi } from '../api'
import { AppDispatch, AppState } from '../store'
import { setBoards } from '../store/board'
import { createBoard, getBoards, getFavorites } from '../store/board/thunkApi'
import { IBoard, IUser } from '../types'
import { removeItemLS, setDocumentTitle } from '../utils'
import { FavoriteList } from './FavoriteList'
import { CircularProgressLoading } from './Loading/CircularProgressLoading'

export interface ISidebarProps {
    user: IUser | null
    favorites: IBoard[]
    boards: IBoard[]
    getBoards: () => Promise<unknown>
    getFavorites: () => Promise<unknown>
    createBoard: () => Promise<unknown>
    setBoards: (boards: IBoard[]) => void
}

function Sidebar({
    user,
    favorites,
    boards,
    getBoards,
    getFavorites,
    createBoard,
    setBoards,
}: ISidebarProps) {
    const [selected, setSelected] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const { id } = useParams()
    const navigate = useNavigate()

    const sidebarWidth = 250

    useEffect(() => {
        const getData = async () => {
            setLoading(true)

            try {
                await getFavorites()
                await getBoards()
            } catch (error: any) {
                console.log(error)
            }

            setLoading(false)
        }

        getData()
    }, [])

    useEffect(() => {
        if (boards.length === 0) return

        if (id) {
            setSelected(id)
            const board = boards.find((b) => b.id === id)
            if (board) {
                setDocumentTitle(board.title)
            }
        } else {
            navigate(`/boards/${boards[0]?.id}`)
            setSelected(boards[0]?.id)
            setDocumentTitle(boards[0]?.title)
        }
    }, [boards, id])

    const handleLogout = () => {
        removeItemLS('token')
        navigate('/login')
    }

    const handleCreateBoard = async () => {
        try {
            await createBoard()
        } catch (error: any) {
            console.log(error)
        }
    }

    const handleSetSelected = (index: string, title: string) => {
        setSelected(index)
        setDocumentTitle(title)
    }

    const handlePositionDragEnd = async (result: any) => {
        if (!result.destination) return
        console.log(result, boards, result.source.index)

        const newBoards = [...boards]
        const [remove] = newBoards.splice(result.source.index, 1)
        newBoards.splice(result.destination.index, 0, remove)
        setBoards(newBoards)

        try {
            await boardApi.updatePosition(newBoards)
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <Drawer
            container={window.document.body}
            variant="permanent"
            open={true}
            sx={{
                width: sidebarWidth,
                height: '100%',
                '& > div': {
                    borderRadius: 'none',
                },
            }}
        >
            <List
                disablePadding
                sx={{
                    width: sidebarWidth,
                    height: '100vh',
                    backgroundColor: '#292929',
                }}
            >
                <ListItem>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="body2" fontWeight="700">
                            {user?.username}
                        </Typography>
                        <IconButton onClick={handleLogout}>
                            <LogoutIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </ListItem>

                <Divider
                    sx={{
                        mb: '10px',
                    }}
                />

                <ListItem>
                    <Box
                        sx={{
                            width: '100%',
                        }}
                    >
                        <Typography variant="body2" fontWeight="700">
                            Favorites
                        </Typography>
                    </Box>
                </ListItem>
                {loading ? (
                    <Box
                        sx={{
                            height: '70px',
                        }}
                    >
                        <CircularProgressLoading />
                    </Box>
                ) : (
                    <FavoriteList
                        favoriteList={favorites}
                        selected={selected}
                        setSelected={setSelected}
                    />
                )}
                <Divider
                    sx={{
                        mt: '10px',
                    }}
                />

                <ListItem>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="body2" fontWeight="700">
                            Privates
                        </Typography>
                        <IconButton onClick={handleCreateBoard}>
                            <AddBoxIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </ListItem>
                <Box>
                    {loading ? (
                        <Box
                            sx={{
                                height: '70px',
                            }}
                        >
                            <CircularProgressLoading />
                        </Box>
                    ) : (
                        <DragDropContext onDragEnd={handlePositionDragEnd}>
                            <Droppable key={'list-board'} droppableId={'list-board'}>
                                {(provided: any) => (
                                    <Box
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {boards.map((board: IBoard, index: number) => (
                                            <Draggable
                                                key={board.id}
                                                draggableId={board.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <Link
                                                        ref={provided.innerRef}
                                                        {...provided.dragHandleProps}
                                                        {...provided.draggableProps}
                                                        to={`/boards/${board.id}`}
                                                    >
                                                        <ListItemButton
                                                            selected={
                                                                selected === board.id
                                                            }
                                                            sx={{
                                                                pl: '20px',
                                                                pt: '10px',
                                                                cursor: snapshot.isDragging
                                                                    ? 'grab'
                                                                    : 'pointer!important',
                                                            }}
                                                            onClick={() =>
                                                                handleSetSelected(
                                                                    board.id,
                                                                    board.title
                                                                )
                                                            }
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                noWrap
                                                                sx={{
                                                                    textOverflow:
                                                                        'ellipsis',
                                                                    fontWeight: 700,
                                                                    color: '#ffffff',
                                                                    '& > span:first-of-type':
                                                                        {
                                                                            marginRight:
                                                                                '6px',
                                                                        },
                                                                }}
                                                            >
                                                                <span>{board.icon}</span>
                                                                <span>{board.title}</span>
                                                            </Typography>
                                                        </ListItemButton>
                                                    </Link>
                                                )}
                                            </Draggable>
                                        ))}
                                    </Box>
                                )}
                            </Droppable>
                        </DragDropContext>
                    )}
                </Box>
            </List>
        </Drawer>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        user: state.user.user,
        boards: state.board.boards,
        favorites: state.board.favorites,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        setBoards: (boards: IBoard[]) => dispatch(setBoards(boards)),
        getBoards: () => dispatch(getBoards()),
        getFavorites: () => dispatch(getFavorites()),
        createBoard: () => dispatch(createBoard()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
