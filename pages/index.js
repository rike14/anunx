import dbConnect from '../src/utils/dbConnect';
import ProductsModel from '../src/models/products';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import {  
    CircularProgress,
    Container, 
    Grid, 
    IconButton, 
    InputBase, 
    Paper, 
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TemplateDefault from '../src/templates/Default';
import Card from '../src/components/Card';
import { formatCurrency } from '../src/utils/currency';
import useToast from '../src/contexts/Toasty';

const useStyles = makeStyles((theme) => ({
    searchBox: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(0,2),
        marginTop: 20,
    },
    cardGrid: {
        marginTop: 50,
    },
    productLink: {
        textDecoration: 'none !important',
    },
    loading: {
        display: 'block',
        margin: '10px auto',
    },
}));

const Home = ({ products }) => {
    const classes = useStyles();
    const router = useRouter();
    const { setToasty } = useToast();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmitSearch = () => {
        setLoading(true);
        axios.get('/api/products/search?query=' + search)
            .then(() => {
                setLoading(false);
                router.push(`/search/${search}`);
            })
            .catch(() => {
                setLoading(false);
                setToasty({
                    open: true,
                    message: 'Error when searching for products',
                    severity: 'error',
                })
            })
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <TemplateDefault>
            <Container maxWidth="md" >
                <Typography component="h1" variant='h3' align='center' color='textPrimary'>
                    What do you want to find?
                </Typography>
                <Paper className={classes.searchBox}>
                    <InputBase
                        onChange={handleChangeSearch}
                        placeholder='Ex: Iphone, Playstation, etc...'
                        fullWidth
                    />
                    {
                        loading ? <CircularProgress size={15} className={classes.loading} /> : 
                        <IconButton onClick={handleSubmitSearch}>
                            <SearchIcon color='primary' />
                        </IconButton>
                    }
                </Paper>
            </Container>

            <Container maxWidth="lg" className={classes.cardGrid}>
                <Typography component="h2" variant='h4' align='center' color='textPrimary'>
                    Highlights
                </Typography>
                <br />
                {
                    products.length === 0 && (
                        <Typography component="div" variant="body1" align='center' gutterBottom>
                            No products found.
                        </Typography>
                    )
                }
                <Grid container spacing={4}>
                    {
                        products.map((product, key) => {
                            const category = slugify(product.category, { lower: true });
                            const title = slugify(product.title, { lower: true });
                            return (
                                <Grid item key={key} xs={12} sm={6} md={4}>
                                    <Link href={`/${category}/${title}/${product._id}`} >
                                        <a className={classes.productLink}>
                                            <Card
                                                
                                                image={`/uploads/${product.files[0].name}`}
                                                title={product.title}
                                                subtitle={formatCurrency(product.price)}
                                            />
                                        </a>
                                    </Link>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export async function getServerSideProps() {
    await dbConnect()

    const products = await ProductsModel.find().limit(6);
    // const products = await ProductsModel.aggregate([{ $limit: 6 }])
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    }
}
    
export default Home;