import { Container, Typography } from "@material-ui/core";
import { HashLoader } from "react-spinners";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    loading: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    }
}));

const Loading = () => {
    const classes = useStyles();
    return (
        <Container className={classes.loading}>
            <HashLoader color="#000" size={50} />
            <br />
            <Typography variant="h6" component="h6" >
                Loading...
            </Typography>
        </Container>
    );
}

export default Loading;