"use client"

import DashboardHeader from "@/components/dashboard/header";
import { DashboardBody, DashboardBodyContainer } from "./styled";

export default function DashboardLayout({ children }) {
    return <>
        <DashboardHeader></DashboardHeader>
        <DashboardBody>
            <DashboardBodyContainer>{children}</DashboardBodyContainer>
        </DashboardBody>
    </>
}