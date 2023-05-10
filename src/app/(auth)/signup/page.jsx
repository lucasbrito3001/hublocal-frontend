"use client"

import DynamicForm from "@/components/dynamicForm";
import Link from "next/link";
import { LinkButton } from "../styled";
import { SIGNUP_FORM_FIELDS, SIGNUP_FORM_FIELDS_SCHEMA } from "./constants";
import { signUp } from "@/services/user";

export default function SignUp() {
    const onSubmit = values => signUp(values)

    return (
        <>
            <title>HubLocal | SignUp</title>
            <div>
                <DynamicForm 
                    fields={SIGNUP_FORM_FIELDS}
                    fieldsSchema={SIGNUP_FORM_FIELDS_SCHEMA}
                    textSubmitButton="REGISTRAR"
                    onSubmit={onSubmit}
                    initialValue={{}}
                />
                <LinkButton color="secondary" variant="contained">
                    <Link href="/signin">LOGAR</Link>
                </LinkButton>
            </div>
        </>
    )
}