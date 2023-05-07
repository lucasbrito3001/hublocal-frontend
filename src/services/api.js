import axios from 'axios'
import { persistor } from '@/redux/store'
import { useSelector } from 'react-redux'

const token = useSelector((state) => state.authorization.token)
console.log(token)

export const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})