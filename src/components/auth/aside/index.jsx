import { AuthBanner, AuthBannerFooter, AuthBannerFooterWrapper, AuthBannerBody } from "./styled"

export default function AsideAuth() {
    return (
        <AuthBanner>
            <AuthBannerBody></AuthBannerBody>
            <AuthBannerFooter>
                <AuthBannerFooterWrapper>
                    <h1>Junte-se a vários clientes satisfeitos</h1>
                    <p>Cliente HubLocal ganha mais relevância, autoridade e visibilidade. Mais de 7.000 marcas confiam na nossa plataforma. Seja uma delas!</p>
                </AuthBannerFooterWrapper>
            </AuthBannerFooter>
        </AuthBanner>
    )
}