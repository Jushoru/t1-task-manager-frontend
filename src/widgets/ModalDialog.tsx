import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import type {ReactNode} from "react";

interface dialogProps {
    open: boolean;
    handleOnClose: () => void;
    title?: string;
    children: ReactNode;
}

export const ModalDialog: React.FC<dialogProps> = ({open, handleOnClose, title, children}) => {
    return (
        <Dialog
            sx={{
                backdropFilter: "blur(2px)",
                '& .MuiDialog-paper': {
                    backgroundColor: "var(--color-bg-task)",
                }
            }}
            open={open}
            onClose={(_, reason) => {
                if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                    handleOnClose();
                }
            }}
        >
            <DialogTitle
                sx={{fontSize: 'var(--font-md)', fontWeight: 'bold', color: 'var(--color-bg-secondary)'}}
            >
                {title}
            </DialogTitle>
            <DialogContent sx={{ paddingBottom: 0 }}>
                {children}
            </DialogContent>
        </Dialog>
    );
};