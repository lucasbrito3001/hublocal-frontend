import { httpClient } from "./api";

export async function signIn({ email, password }) {
    try {
        const { data: { statusCode, token, message } } = await httpClient.post('/auth/login', { email, password })

        if(statusCode === 401) throw new Error(message)

        return { status: true, token }
    } catch (error) {
        return { status: false, error: error.message }
    }
}