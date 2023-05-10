import { setUser } from '@/redux/features/auth'
import { store } from '@/redux/store'
import axios from 'axios'
import { toast } from 'react-toastify'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use(config => {
    const token = store.getState().authorization.user.token
    config.headers.authorization = token ? `Bearer ${token}` : ''
    return config
})

api.interceptors.response.use(response => response, error => {
    const respStatusCode = error.response.data.statusCode

    if(respStatusCode === 401 && error.config.url !== '/auth/login') {
        toast.error('Você não está autenticado, será redirecionado para tela de login.')
        setUser({})
        return window.location.pathname = "/"
    } else if (respStatusCode === 403) {
        toast.error('Você não tem acesso a esse recurso.')
        return window.location.pathname = "/dashboard"
    }

    return Promise.reject(error)
})