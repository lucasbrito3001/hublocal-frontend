"use client"

import DynamicForm from "@/components/dynamicForm/form";
import Link from "next/link";
import { LinkButton } from "../styled";
import { SIGNUP_FORM_FIELDS, SIGNUP_FORM_FIELDS_SCHEMA } from "./constants";

export default function SignUp({ signupService }) {
    const onSubmit = async values => {
        const { status } = await signupService(values)
    }

    return (
        <div>
            <DynamicForm 
                fields={SIGNUP_FORM_FIELDS}
                fieldsSchema={SIGNUP_FORM_FIELDS_SCHEMA}
                textSubmitButton="REGISTRAR"
                onSubmit={onSubmit}
            />
            <LinkButton color="secondary" variant="contained">
                <Link href="/signin">LOGAR</Link>
            </LinkButton>
        </div>
    )
}