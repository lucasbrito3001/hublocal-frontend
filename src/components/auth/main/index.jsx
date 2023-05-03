import Logo from "@/assets/logo.svg"

import { AuthForm, AuthFormHeader, AuthFormBody } from "./styled"

export default function MainAuth() {
    return (
        <AuthForm>
            <AuthFormHeader>
                <img src={Logo.src} alt="logo hublocal" />
            </AuthFormHeader>
            <AuthFormBody></AuthFormBody>
        </AuthForm>
    )
}