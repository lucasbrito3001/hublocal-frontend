import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: {
        value: null
    }
}

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        setToken: (state, action) => {
            console.log(action)
            state.token.value = action.payload.token
        }
    }
})

export const { setToken } = authorizationSlice.actions
export const authorizationReducer = authorizationSlice.reducer