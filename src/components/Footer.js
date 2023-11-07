import { Box, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
    footerLink: {
        textDecoration: 'none',
        color: theme.palette.text.secondary,
    }
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" component='footer' className={classes.footer}> 
            <Grid container spacing={3}>
                <Grid item xs={6} sm={6} md={3}>
                    <Box textAlign='center'>
                        <Link href='#' passHref className={classes.footerLink}>
                            <Typography color="textSecondary" variant="subtitle1">
                                Help and Contact
                            </Typography>
                        </Link> 
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Box textAlign='center'>
                        <Link href='#' passHref className={classes.footerLink}>
                            <Typography color="textSecondary" variant="subtitle1">
                                Safety tips
                            </Typography>
                        </Link> 
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Box textAlign='center'>
                        <Link href='/user/publish' passHref className={classes.footerLink}>
                            <Typography color="textSecondary" variant="subtitle1">
                                Advertise and Sell
                            </Typography>
                        </Link> 
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <Box textAlign='center'>
                        <Link href='#' passHref className={classes.footerLink}>
                            <Typography color="textSecondary" variant="subtitle1">
                                Professional plan
                            </Typography>
                        </Link> 
                    </Box>
                </Grid>
            </Grid>
        </Container>
    
    )

}
export default Footer;