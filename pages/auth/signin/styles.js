import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
    },
    loading: {
        display: 'block',
        margin: '10px auto',
    },
    orSeparator: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(7,0,4),
        width: '100%',
        height: '1px',
        backgroundColor: '#e8e8e8',
        '& span': {
            padding: '0 30px',
            backgroundColor: theme.palette.background.white,
        },
    }
}));