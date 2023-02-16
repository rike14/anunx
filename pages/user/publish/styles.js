
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
   
    boxContainer: {
        padding: theme.spacing(3),
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
    },
    inputLabel: {
        color: theme.palette.text.primary,
        fontWeight: 400,
    },
}))

export default useStyles