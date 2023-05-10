"use client"

import { DashHeader, Dropdown, DropdownItem, MyCompanies, SelectedCompany, UserLogged } from "./styled";
import { usePathname } from "next/navigation";
import userSvg from '@/assets/user.svg'
import { useDispatch, useSelector } from "react-redux";
import BusinessIcon from '@mui/icons-material/Business';
import { StyledMenu } from "./styledMenu";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Logout } from "@mui/icons-material"
import { useState } from "react";
import { logOut } from "@/redux/features/auth";

export default function DashboardHeader({ logOutAction = logOut }) {
    const pathname = usePathname()
    const dispatch = useDispatch()
    const userName = useSelector(state => state.authorization.user.name)
    const companyName = useSelector(state => state.companies.selectedCompany.name)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        handleClose()

        dispatch(logOutAction())
    }

    return <DashHeader>
        {
            pathname.includes('locations')
                ? <SelectedCompany><BusinessIcon fontSize="large" />{ companyName }</SelectedCompany>
                : <MyCompanies><BusinessIcon fontSize="large" /> Minhas Empresas </MyCompanies>
        }
        <UserLogged>
            <Dropdown
                id="dropdown-menu-button"
                aria-controls={open ? 'dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <div>
                    <img width={54} src={userSvg.src} />
                    {userName}
                </div>
                <div>
                    <KeyboardArrowDownIcon />
                </div>
            </Dropdown>
            <StyledMenu
                id="dropdown-menu"
                MenuListProps={{
                    'aria-labelledby': 'dropdown-menu-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <DropdownItem onClick={handleLogout} disableRipple>
                    <span>Sair</span> <Logout></Logout>
                </DropdownItem>
            </StyledMenu>
        </UserLogged>
    </DashHeader>
}