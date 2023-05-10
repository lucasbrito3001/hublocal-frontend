import { api } from "@/services/api"
import { setCompanies, setSelectedCompany, setTotalCompanies, toggleIsOpenDialog } from "./companies"
import { toast } from "react-toastify"
import { store } from "../store"
import { setPage } from "./dynamicTable"

export function getCompany(id) {
    return async dispatch => {
        try {
            const { data: { content } } = await api.get(`/companies/${id}`)

            dispatch(setSelectedCompany(content[0]))
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

export function getCompanies(page = 0, rowsPerPage = 10) {
    return async dispatch => {
        try {
            const { data: { content, extra } } = await api.get('/companies', {
                params: { page, rowsPerPage }
            })
            
            dispatch(setCompanies(content))
            dispatch(setTotalCompanies(extra.totalCompanies))
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

export function createCompany(values) {
    return async dispatch => {
        try {
            await api.post('/companies', values)

            toast.success('Empresa criada com sucesso')

            const { page, rowsPerPage } = store.getState().dynamicTable
            const { list } = store.getState().companies

            const isPageFull = list.length == rowsPerPage

            dispatch(setPage(page + (isPageFull ? 1 : 0)))
            dispatch(getCompanies(page, rowsPerPage))
            dispatch(toggleIsOpenDialog())
        } catch (error) {
            const errorsDictionary = {
                400: 'CNPJ inválido',
                409: 'Já existe uma empresa com este CNPJ'
            }

            const dataError = error.response?.data

            toast.error(errorsDictionary[dataError?.statusCode])
        }
    }
}

export function editCompany(values) {
    return async dispatch => {
        try {
            await api.patch(`/companies/${values.id}`, values)

            toast.success('Empresa editada com sucesso')

            const { page, rowsPerPage } = store.getState().dynamicTable

            dispatch(getCompanies(page, rowsPerPage))
            dispatch(toggleIsOpenDialog())
        } catch (error) {
            const errorsDictionary = {
                400: 'CNPJ inválido',
                409: 'Já existe uma empresa com este CNPJ'
            }

            const dataError = error.response?.data
            const errorText = errorsDictionary[dataError?.statusCode] || ''

            errorText && toast.error(errorText)
        }
    }
}

export function deleteCompany(values) {
    return async dispatch => {
        try {
            await api.delete(`/companies/${values.id}`)

            toast.success('Empresa excluída com sucesso')

            const { page, rowsPerPage } = store.getState().dynamicTable
            const { list } = store.getState().companies

            const isLastItemPage = list.length == rowsPerPage

            dispatch(setPage(page - (isLastItemPage ? 1 : 0)))
            dispatch(getCompanies(page, rowsPerPage))
            dispatch(toggleIsOpenDialog())
        } catch (error) {
            const errorsDictionary = {
                400: 'Não foi possível deleter pois a empresa não existe',
                409: 'Não é possível excluir uma empresa enquanto ela tiver locais cadastrados'
            }

            const dataError = error.response?.data
            const errorText = errorsDictionary[dataError?.statusCode] || ''

            errorText && toast.error(errorText)
            dispatch(toggleIsOpenDialog())
        }
    }
}