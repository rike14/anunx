import {
    Container,
    Grid,
    IconButton,
    InputBase,
    Paper,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import Card from '../src/components/Card';
import Loading from '../src/components/Loading';
import useToast from '../src/contexts/Toasty';
import TemplateDefault from '../src/templates/Default';
import { formatCurrency } from '../src/utils/currency';

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

const Home = () => {
    const classes = useStyles();
    const router = useRouter();
    const { setToasty } = useToast();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

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

    const getProducts = async () => {
        setLoading(true);
        const response = await axios.get('/api/products/get');
        setProducts(response.data.products);
    }

    const handleClick = () => {
        setLoading(true);
    };

    useEffect(() => {
        getProducts()
            .then(() => setLoading(false))
            .catch(() => {
                setLoading(false);
                setToasty({
                    open: true,
                    message: 'Error when loading products',
                    severity: 'error',
                })
            })
    }, []);

    return (
        <TemplateDefault>
            <Container maxWidth="md" >
                <Typography component="h1" variant='h4' align='center' color='textPrimary'>
                    What do you want to find?
                </Typography>
                <Paper className={classes.searchBox}>
                    <InputBase
                        onChange={handleChangeSearch}
                        placeholder='Ex: Iphone, Playstation, etc...'
                        fullWidth
                    />
                    {
                        loading ? '': 
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
                { loading && <Loading /> }
                {
                    products.length === 0 && !loading && (
                        <Typography component="div" variant="body1" align='center' gutterBottom>
                            No products found.
                        </Typography>
                    )
                }
                <Grid container spacing={4}>
                    {   !loading && (
                        products.map((product, key) => {
                            const category = slugify(product.category, { lower: true });
                            const title = slugify(product.title, { lower: true });
                            return (
                                <Grid item key={key} xs={12} sm={6} md={4}>
                                    <Link href={`/${category}/${title}/${product._id}`} className={classes.productLink} onClick={() => handleClick()}>
                                        <Card
                                            
                                            image={`/uploads/${product.files[0].name}`}
                                            title={product.title}
                                            subtitle={formatCurrency(product.price)}
                                        />
                                    </Link>
                                </Grid>
                            )
                        })
                    )}
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export default Home;
