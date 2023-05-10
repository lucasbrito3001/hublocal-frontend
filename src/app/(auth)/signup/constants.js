import * as Yup from 'yup'

export const SIGNUP_FORM_FIELDS = [
    { 
        label: 'Nome', 
        type: 'text',
        key: 'name'
    },
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
    { 
        label: 'Repetir Senha',
        type: 'password',
        key: 'confirmPassword'
    },
]

export const SIGNUP_FORM_FIELDS_SCHEMA = {
    name: Yup.string()
        .required('O nome é obrigatório'),
    email: Yup.string()
        .required('O email é obrigatório')
        .email('O email precisa ser válido'),
    password: Yup.string()
        .required('A senha é obrigatória')
        .min(8, 'A senha precisa ter pelo menos 8 caracteres'),
    confirmPassword: Yup.string()
        .required('A senha é obrigatória')
        .oneOf([Yup.ref('password')], 'As senhas precisam ser iguais')
}