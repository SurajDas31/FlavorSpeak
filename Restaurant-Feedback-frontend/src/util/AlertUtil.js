import { Alert, IconButton, Snackbar, SnackbarContent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
export const ShowAlert = ({toggle, message, handleClose}) => {
   

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={toggle}
                autoHideDuration={3000}
                onClose={handleClose}>
                <SnackbarContent style={{ backgroundColor: '#c11313', }}
                    message={message}
                    action={<IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>}
                />
            </Snackbar>
            {console.log(toggle)}
        </>
    );
}