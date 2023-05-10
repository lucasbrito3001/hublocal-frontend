import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { GeneralButton } from "@/app/styled";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, variant, ...other } = props;
    
    return (
        <DialogTitle 
            sx={{ 
                m: 0, 
                p: 2, 
                backgroundColor: `var(--${variant}-color)`, 
                color: 'white', 
                fontWeight: '700' 
            }} 
            {...other}
        >
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 'center',
                        color: 'white'
                    }}
                >
                    <Close color="inherit"/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function DynamicDialog({ 
    title, 
    textConfirmButton, 
    variantColor, 
    handleClose,
    children,
    isForm,
    formId,
    onConfirm,
    isOpen = false 
}) {
    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            fullWidth={true}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} variant={variantColor}>
                {title}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <GeneralButton
                    autoFocus
                    type={isForm ? 'submit' : 'button'}
                    onClick={!isForm ? onConfirm : () => {}}
                    form={formId}
                    variant="contained"
                    color={variantColor}
                    width="fit-content"
                    text-transform="capitalize"
                    sx={{ lineHeight: '1.2 !important' }}
                >
                    {textConfirmButton}
                </GeneralButton>
            </DialogActions>
        </BootstrapDialog>
    );
}