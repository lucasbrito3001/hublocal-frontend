import { api } from "@/services/api"
import { setLocations, setTotalLocations, toggleIsOpenDialog } from "./locations"
import { toast } from "react-toastify"
import { store } from "../store"
import { setPage } from "./dynamicTable"

export function getLocations(companyId, page = 0, rowsPerPage = 10) {
    return async dispatch => {
        try {
            const { data: { content, extra }} = await api.get('/locations', { params: { companyId, page, rowsPerPage } })

            dispatch(setLocations(content))
            dispatch(setTotalLocations(extra.totalLocations))
        } catch (error) {
            const dataError = error.response.data

            toast.error(
                dataError?.statusCode === 403
                    ? 'Você não tem acesso a esse recurso' 
                    : 'Erro inesperado, entre em contato com o administrador'
            )
        }
    }
}

export function createLocation(values) {
    return async dispatch => {
        try {
            await api.post('/locations', values)

            toast.success('Local criado com sucesso')

            const { page, rowsPerPage } = store.getState().dynamicTable
            const { list } = store.getState().locations

            const isPageFull = list.length == rowsPerPage

            dispatch(setPage(page + (isPageFull ? 1 : 0)))
            dispatch(getLocations(values.companyId, page, rowsPerPage))
            dispatch(toggleIsOpenDialog())
        } catch (error) {
            const dataError = error.response.data

            toast.error(
                dataError?.statusCode === 403
                    ? 'Você não é dono dessa empresa, portanto não pode criar um local para ela' 
                    : 'Erro inesperado, entre em contato com o administrador'
            )
        }
    }
}

export function editLocation(values) {
    return async dispatch => {
        try {
            const {id, ...locationValues} = values
            await api.patch(`/locations/${id}`, locationValues)

            toast.success('Local editado com sucesso')
            
            const { page, rowsPerPage } = store.getState().dynamicTable

            dispatch(getLocations(values.companyId, page, rowsPerPage))
            dispatch(toggleIsOpenDialog())
        } catch (error) {
            const errorsDictionary = {
                400: 'Falha ao editar, o local não existe',
            }

            const dataError = error.response?.data

            toast.error(errorsDictionary[dataError?.statusCode])
        }
    }
}

export function deleteLocation(values) {
    return async dispatch => {
        try {
            await api.delete(`/locations/${values.id}`, values)

            toast.success('Local excluído com sucesso')

            const { page, rowsPerPage } = store.getState().dynamicTable
            const { list } = store.getState().locations

            const isPageFull = list.length == rowsPerPage

            dispatch(setPage(page - (isPageFull ? 1 : 0)))
            dispatch(getLocations(values.companyId, page, rowsPerPage))
            dispatch(toggleIsOpenDialog())
        } catch (error) {
            const errorsDictionary = {
                400: 'Falha ao excluir, o local não existe',
            }

            const dataError = error.response?.data

            toast.error(errorsDictionary[dataError?.statusCode])
        }
    }
}