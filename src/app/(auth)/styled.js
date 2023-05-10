"use client"

import styled from "styled-components"
import { GeneralButton } from "@/app/styled";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const LinkButton = styled(GeneralButton)`
    display: block;
    margin-top: 1rem !important;
    padding: 0 !important;

    a {
        padding: .375rem 1rem;
    }
`;