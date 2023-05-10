"use client"

// components
import DynamicForm from "@/components/dynamicForm";
import { LinkButton } from "../styled";
import Link from "next/link";
import { SIGNIN_FORM_FIELDS, SIGNIN_FORM_FIELDS_SCHEMA } from "./constants";
import { signIn } from "../../../redux/features/auth";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.authorization.isLoading)

    const onSubmit = values => dispatch(signIn(values))

    return (
        <>
            <title>HubLocal | SignIn</title>
            <div>
                <DynamicForm 
                    fields={SIGNIN_FORM_FIELDS} 
                    fieldsSchema={SIGNIN_FORM_FIELDS_SCHEMA}
                    onSubmit={onSubmit}
                    textSubmitButton="LOGAR"
                    isLoading={isLoading}
                    initialValue={{}}
                />
                <LinkButton color="secondary" variant="contained">
                    <Link href="/signup">CRIAR CONTA</Link>
                </LinkButton>
            </div>
        </>
    )
}