"use client"

import styled from "styled-components";

export const FieldInput = styled.input`
    width: 100%;
    padding: 14px;
    font-size: 1.3rem;
    border: 2px solid var(--primary-color);
    border-radius: var(--default-border-radius);
`;

export const FieldWrapper = styled.div`
    margin-bottom: 1rem;
`;

export const FieldLabel = styled.label`

`;

export const FieldErrorMessage = styled.span`
    color: var(--danger-color);
    display: block;
    font-size: 0.75rem;
`;