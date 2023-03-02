import { Container, Typography } from "@material-ui/core";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    loading: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    }
}));

const CheckAuth = ({ Component, pageProps }) => {
  const [ session ] = useSession();
    const router = useRouter();
    const classes = useStyles();

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session]);

    if (session) {
        return <Component {...pageProps} />;
    }

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

export default CheckAuth;