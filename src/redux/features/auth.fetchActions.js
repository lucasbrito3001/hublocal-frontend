import { api } from "@/services/api"
import { toast } from 'react-toastify'
import { setUser, toggleIsLoading } from "./auth"

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