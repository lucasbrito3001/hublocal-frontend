import * as Yup from 'yup'
import { cnpj } from 'cpf-cnpj-validator'

export const ADD_COMPANY_FORM_FIELDS = [
    {
        label: 'Nome',
        type: 'text',
        key: 'name',
        size: 12
    },
    {
        label: 'Website',
        type: 'text',
        key: 'website',
        size: 12
    },
    {
        label: 'CNPJ',
        type: 'cnpj',
        key: 'cnpj',
        size: 12
    },
]

export const ADD_COMPANY_FORM_FIELDS_SCHEMA = {
    name: Yup.string()
        .required('O nome é obrigatório'),
    website: Yup.string()
        .required('O website é obrigatória'),
    cnpj: Yup.string()
        .test(
            'cnpj-validation',
            'CNPJ inválido',
            (value) => cnpj.isValid(value, false)
        )
        .required('O cnpj é obrigatório')
}

export const COMPANIES_TABLE_COLUMNS = [
    { label: 'Empresa', key: 'name' },
    { label: 'Qt de Locais', key: 'quantityLocations' }
]

export const ACTIONS_COMPANIES_TABLE_ROWS = ['EDIT', 'SEE_LOCATIONS', 'DELETE']