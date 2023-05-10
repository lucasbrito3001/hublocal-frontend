import Logo from "@/assets/logo.svg"

import { AuthForm, AuthFormContainer, AuthFormHeader, AuthFormBody } from "./styled"

export default function MainAuth({ children }) {
    return (
        <AuthForm>
            <AuthFormContainer>
                <AuthFormHeader>
                    <img src={Logo.src} alt="logo hublocal" />
                </AuthFormHeader>
                <AuthFormBody>
                    {children}
                </AuthFormBody>
            </AuthFormContainer>
        </AuthForm>
    )
}