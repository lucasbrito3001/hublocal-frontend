"use client"

// components
import DynamicForm from "@/components/dynamicForm/form";
import { LinkButton } from "../styled";
import Link from "next/link";
import { SIGNIN_FORM_FIELDS, SIGNIN_FORM_FIELDS_SCHEMA } from "./constants";
import { signIn } from "../../../services/auth";
import { toast } from "react-toastify";
import { setToken } from '@/redux/features/auth'
import { useDispatch } from "react-redux";

export default function SignIn({ signinService = signIn }) {
    const dispatch = useDispatch()

    const trySignin = async values => {
        const { status, token, message } = await signinService(values)

        console.log(status, token, message)

        if(!status) return toast.error('Email e/ou senha incorretos')

        toast.success('Logado com sucesso')
        dispatch(setToken({ token }))
    }

    return (
        <div>
            <DynamicForm 
                fields={SIGNIN_FORM_FIELDS} 
                fieldsSchema={SIGNIN_FORM_FIELDS_SCHEMA}
                onSubmit={trySignin}
                textSubmitButton="LOGAR"
            />
            <LinkButton color="secondary" variant="contained">
                <Link href="/signup">CRIAR CONTA</Link>
            </LinkButton>
        </div>
    )
}