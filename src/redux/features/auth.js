import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        token: null,
        name: null,
        email: null,
        id: null
    },
    isLoading: false
}

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        toggleIsLoading: (state) => { state.isLoading = !state.isLoading },
        setUser: (state, action) => { state.user = action.payload }
    }
})

const { actions, reducer } = authorizationSlice
export const { setUser, toggleIsLoading } = actions
export const authorizationReducer = reducer