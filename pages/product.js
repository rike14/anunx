import { Avatar, Box, Card, CardHeader, CardMedia, Chip, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import TemplateDefault from '../src/templates/Default';

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    productName: {
        margin: '15px 0',
    },
    price: {
        fontWeight: 'bold',
        marginBottom: '15px',
    },
}));

const Product = () => {
    const classes = useStyles();

    return (
        <TemplateDefault >
            <Container maxWidth='lg'>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Box className={classes.box}>
                            Carousel
                        </Box>
                        <Box className={classes.box} textAlign='left'>   
                            <Typography variant='span' component='caption' display='inline' >Publish February 10 2023</Typography>
                            <Typography variant='h4' component='h4' className={classes.productName}>Jaguar XE 2.0 D R-Sport Aut.</Typography>
                            <Typography variant='h4' component='h4' className={classes.price}>$20,000.00</Typography>
                            <Chip label='Category' />
                        </Box>

                        <Box className={classes.box} textAlign='left'>
                            <Typography variant='h6' component='h6' >Description</Typography>
                            <Typography variant='p' component='body2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                                neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                                quasi quidem quibusdam.</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                       <Card elevation={0} className={classes.box}>
                         <CardHeader 
                         title='Henrique Kronhardt' 
                         subheader="henriquemk00@gmail.com"
                         avatar={
                            <Avatar>H</Avatar>
                         }
                         />
                         <CardMedia
                            image="https://source.unsplash.com/random"
                            title="Henrique Kronhardt"
                         />
                       </Card>
                       
                       <Box className={classes.box} >
                            <Typography variant='h6' component='h6' >Location</Typography>
                       </Box>
                       
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )

}

export default Product;