import { Box, ListItemButton, Typography } from '@mui/material'
import { Dispatch } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { boardApi } from '../api'
import { AppDispatch, AppState } from '../store'
import { setFavorites } from '../store/board'
import { IBoard } from '../types'

export interface IFavoriteListProps {
    favoriteList: IBoard[]
    selected: string
    setSelected: Dispatch<React.SetStateAction<string>>
}

export function FavoriteList({
    favoriteList,
    selected,
    setSelected,
}: IFavoriteListProps) {
    const { favorites } = useSelector((state: AppState) => state.board)
    const dispatch = useDispatch<AppDispatch>()
    const handleSetSelected = (index: string, title: string) => {
        setSelected(index)
        document.title = title
    }

    const handleFavoriteDragEnd = async (result: any) => {
        if (!result.destination) return

        const newFavorites = [...favorites]
        const [remove] = newFavorites.splice(result.source.index, 1)
        newFavorites.splice(result.destination.index, 0, remove)
        dispatch(setFavorites(newFavorites))

        try {
            await boardApi.updateFavoritePosition(newFavorites)
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <Box>
            <DragDropContext onDragEnd={handleFavoriteDragEnd}>
                <Droppable droppableId={'list-favorite'} key={'list-favorite'}>
                    {(provided) => (
                        <Box {...provided.droppableProps} ref={provided.innerRef}>
                            {favoriteList.map((favorite: IBoard, index: number) => (
                                <Draggable
                                    key={favorite.id}
                                    draggableId={favorite.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <Link
                                            to={`/boards/${favorite.id}`}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                        >
                                            <ListItemButton
                                                selected={selected === favorite.id}
                                                sx={{
                                                    pl: '20px',
                                                    pt: '10px',
                                                    color: '#fff',
                                                    cursor: snapshot.isDragging
                                                        ? 'grab'
                                                        : 'pointer !important',
                                                }}
                                                onClick={() =>
                                                    handleSetSelected(
                                                        favorite.id,
                                                        favorite.title
                                                    )
                                                }
                                            >
                                                <Typography
                                                    variant="body2"
                                                    noWrap
                                                    sx={{
                                                        textOverflow: 'ellipsis',
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {favorite.icon} {favorite.title}
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
        </Box>
    )
}
