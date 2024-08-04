import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    CardMedia,
    Chip,
    Container,
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Loading from '../../../src/components/Loading';
import ProductsModel from '../../../src/models/products';
import TemplateDefault from '../../../src/templates/Default';
import { formatCurrency } from '../../../src/utils/currency';
import dbConnect from '../../../src/utils/dbConnect';


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
    cardMedia: {
        paddingTop: '100%',
        
    },
    carousel: {
        '& .CarouselItem': {
            height: '100%',
            width: '70%',
            margin: 'auto',
            marginBottom: '20px',
        }
    },
    container: {
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const formatDate = (date) => {
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute : 'numeric' };
    let today = new Date(date);
    
    return today.toLocaleDateString('en-US', options);
}

const Product = ({ product }) => {
    const classes = useStyles();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return (<TemplateDefault >
        <Container className={classes.container}><Loading /></Container></TemplateDefault>);
    return (
        <TemplateDefault >
            <Container maxWidth='lg'>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8} >
                        <Box className={classes.box} textAlign='center'>
                            <Carousel
                                autoPlay={true}
                                stopAutoPlayOnHover={true}
                                interval={5000}
                                animation='fade'
                                timeout={700}
                                navButtonsAlwaysVisible={false}
                                navButtonsProps={{ style: { color: '#fff', background: '#000' } }}
                                className={classes.carousel}  
                            >
                                {
                                    product.files.map((file, index) => (
                                        <Card className={classes.card} key={index}>
                                            <CardMedia className={classes.cardMedia}
                                                image={file.path}
                                                title={product.title}
                                            />
                                        </Card>
                                    ))
                                }
                            </Carousel>
                        </Box>
                        <Box className={classes.box}>   
                            <Typography variant='body1' component='caption' display='inline' >{ formatDate(product.date) }</Typography>
                            <Typography variant='h4' component='h4' className={classes.productName}>{product.title}</Typography>
                            <Typography variant='h5' component='h5' className={classes.price}>{formatCurrency(product.price)}</Typography>
                            <Chip label={product.category} />
                        </Box>

                        <Box className={classes.box}>
                            <Typography variant='h6' component='h6' >Description</Typography>
                            <Typography variant='body1' component='p'>{product.description}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                       <Card elevation={1} className={classes.box}>
                         <CardHeader 
                         title={product.user.name} 
                         subheader={product.user.email}
                         avatar={
                            <Avatar
                                src={product.user.image}
                                alt={product.user.name}
                            >
                                 {product.user.image || product.user.name[0].toUpperCase()}
                            </Avatar>
                         }
                         />
                         <CardMedia
                            image={product.user.image}
                            title={product.user.name}
                         />
                       </Card>
                       <Box className={classes.box} >
                            <Typography variant='h6' component='h6' >City</Typography>
                            <Typography variant='body1' component='h6' >
                                {product.user.city}
                            </Typography>
                       </Box>
                       
                       
                    </Grid>
                </Grid>
                <Button href="/" variant='contained' color='primary' >Back</Button>
            </Container>
        </TemplateDefault>
    )

}

export async function getServerSideProps({ query }) {
    const { id } = query;

    await dbConnect();
    const product = await ProductsModel.findOne({ _id: id });
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}

export default Product;