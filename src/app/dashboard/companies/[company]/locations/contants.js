import * as Yup from 'yup'
import { cnpj } from 'cpf-cnpj-validator'

export const ADD_LOCATION_FORM_FIELDS = [
    {
        label: 'Nome',
        type: 'text',
        key: 'name',
        size: 12
    },
    {
        label: 'CEP',
        type: 'zipCode',
        key: 'zipCode',
        size: 6
    },
    {
        label: 'Rua',
        type: 'text',
        key: 'street',
        size: 6
    },
    {
        label: 'Número',
        type: 'number',
        key: 'number',
        size: 6
    },
    {
        label: 'Bairro',
        type: 'text',
        key: 'district',
        size: 6
    },
    {
        label: 'Cidade',
        type: 'text',
        key: 'city',
        size: 6,
        disabled: true
    },
    {
        label: 'Estado',
        type: 'state',
        key: 'state',
        size: 6,
        disabled: true
    }
]

export const ADD_LOCATION_FORM_FIELDS_SCHEMA = {
    name: Yup.string()
        .required('O nome é obrigatório'),
    zipCode: Yup.string()
        .required('O CEP é obrigatório')
        .max(9, 'Um CEP válido tem 8 dígitos'),
    street: Yup.string()
        .required('A rua é obrigatória'),
    number: Yup.number()
        .required('O número é obrigatório'),
    district: Yup.string()
        .required('O bairro é obrigatório'),
    city: Yup.string()
        .required('A cidade é obrigatória'),
    state: Yup.string()
        .max(2, 'Digite a sigla do estado')
        .required('O estado é obrigatório')
}

export const LOCATIONS_TABLE_COLUMNS = [ { label: 'Local', key: 'name' } ]

export const ACTIONS_LOCATIONS_TABLE_ROWS = ['EDIT', 'DELETE']