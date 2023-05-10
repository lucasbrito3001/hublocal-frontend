import { api } from '@/services/api'
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

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

export const { setUser } = authorizationSlice.actions
export const { toggleIsLoading } = authorizationSlice.actions
export const authorizationReducer = authorizationSlice.reducer

// fetchActions
export function signIn({ email, password }) {
    return async dispatch => {

        try {
            dispatch(toggleIsLoading())

            const { data: { token, user } } = await api.post('/auth/login', { email, password })

            dispatch(setUser({ token, ...user }))
            toast.success('Logado com sucesso!')
            window.location.pathname = '/dashboard'
        } catch (error) {
            const dataError = error.response.data
            dispatch(setUser(initialState.user))
            toast.error(
                dataError?.statusCode === 401
                    ? 'Email e/ou senha incorretos'
                    : 'Erro inesperado, entre em contato com o administrador'
            )
            
            dispatch(toggleIsLoading())
        }
    }
}

export function logOut() {
    return async dispatch => {
        dispatch(setUser(initialState.user))
        window.location.pathname = '/signin'
    }
}