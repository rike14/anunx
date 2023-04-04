import { Snackbar } from "@material-ui/core"
import MuiAlert from "@material-ui/lab/Alert"

const Toasty = ({ open, message, severity, onClose=null }) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

       if(onClose) onClose()
    }

    return (
        <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ 
            vertical: 'bottom', 
            horizontal: 'right' 
        }}
        >
            <MuiAlert elevation={6} variant="filled"  severity={severity}>
                {message}
            </MuiAlert>
        </Snackbar>
    )
}

export default Toasty