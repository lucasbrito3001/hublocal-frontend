import { toast } from "react-toastify";

const { api } = require("./api");

export async function signUp({ name, email, password }) {
    try {
        await api.post('/users', { name, email, password })

        toast.success('Registrado com sucesso!')
        
        window.location.pathname = '/signin'
    } catch (error) {
        const errorData = error.response?.data

        const errorsMessage = {
            400: 'Todos os campos são obrigatórios, preencha e tente novamente',
            409: 'Email já cadastrado',
        }

        toast.error(errorsMessage[errorData.statusCode])
    }
}