import * as Yup from 'yup'

export const SIGNIN_FORM_FIELDS = [
    {
        label: 'Email',
        type: 'text',
        key: 'email'
    },
    {
        label: 'Senha',
        type: 'password',
        key: 'password'
    },
]

export const SIGNIN_FORM_FIELDS_SCHEMA = {
    email: Yup.string()
        .required('O email é obrigatório')
        .email('O email deve ser válido'),
    password: Yup.string()
        .required('A senha é obrigatória')
}