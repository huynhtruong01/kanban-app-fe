import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit'
import { boardApi } from '../../api'
import { IBoard, IBoardInitState } from '../../types'

export const getBoards = createAsyncThunk('board/getBoards', async () => {
    const res = await boardApi.getAll()

    return res.data.boards
})

export const getFavorites = createAsyncThunk('board/getFavorites', async () => {
    const res = await boardApi.getAllFavorites()
    return res.data.favorites
})

export const createBoard = createAsyncThunk('board/createBoard', async () => {
    const res = await boardApi.create()

    return res.data.board
})

export const updateBoardApi = createAsyncThunk(
    'board/updateBoard',
    async (board: IBoard) => {
        await boardApi.update(board)
    }
)

export const deleteBoardApi = createAsyncThunk(
    'board/deleteBoardApi',
    async (id: string) => {
        await boardApi.remove(id)
    }
)

export const extraReducers = (builders: ActionReducerMapBuilder<any>) => {
    builders.addCase(
        getFavorites.fulfilled,
        (state: IBoardInitState, action: PayloadAction<IBoard[]>) => {
            state.favorites = action.payload
        }
    )

    builders.addCase(
        getBoards.fulfilled,
        (state: IBoardInitState, action: PayloadAction<IBoard[]>) => {
            state.boards = action.payload
        }
    )

    builders.addCase(
        createBoard.fulfilled,
        (state: IBoardInitState, action: PayloadAction<IBoard>) => {
            state.boards.push(action.payload)
            return
        }
    )
}
