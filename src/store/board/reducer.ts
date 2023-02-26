import { PayloadAction } from '@reduxjs/toolkit'
import { IBoard, IBoardInitState, IBoardParamsUpdate } from '../../types'

export const boardReducer = {
    setBoards: (state: IBoardInitState, action: PayloadAction<IBoard[]>) => {
        state.boards = action.payload
    },
    setFavorites: (state: IBoardInitState, action: PayloadAction<IBoard[]>) => {
        state.favorites = action.payload
    },
    updateFavorite: (
        state: IBoardInitState,
        action: PayloadAction<IBoardParamsUpdate>
    ) => {
        const index = state.boards.findIndex(
            (board: IBoard) => board.id === action.payload.id
        )
        if (index > -1) {
            state.boards[index].favorite = action.payload.favorite
        }

        state.boards = [...state.boards]
        state.favorites = [...state.boards.filter((board: IBoard) => board.favorite)]
    },
    updateBoard: (state: IBoardInitState, action: PayloadAction<IBoard>) => {
        const index = state.boards.findIndex(
            (board: IBoard) => board.id === action.payload.id
        )

        if (index >= 0) {
            state.boards[index] = action.payload
            state.boards = [...state.boards]
        }

        const indexFavorite = state.favorites.findIndex(
            (favorite: IBoard) => favorite.id === action.payload.id
        )
        if (indexFavorite >= 0) {
            state.favorites[indexFavorite] = action.payload
            state.favorites = [...state.favorites]
        }
    },
    deleteBoard: (state: IBoardInitState, action: PayloadAction<string>) => {
        const id = action.payload
        const index = state.boards.findIndex((board: IBoard) => board.id === id)
        const indexFavorite = state.favorites.findIndex(
            (board: IBoard) => board.id === id
        )

        if (index >= 0) {
            state.boards = [...state.boards.filter((board: IBoard) => board.id !== id)]
        }

        if (indexFavorite >= 0) {
            state.favorites = [
                ...state.favorites.filter((favorite: IBoard) => favorite.id !== id),
            ]
        }
    },
}
