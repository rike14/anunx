import dbConnect from "../../src/utils/dbConnect";
import ProductsModel from "../../src/models/products";
import axios from "axios";
import slugify from "slugify";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import SearchIcon from "@material-ui/icons/Search";
import { 
    Box, 
    Container, 
    Grid, 
    IconButton, 
    InputBase, 
    makeStyles, 
    Paper, 
    Typography,
    CircularProgress,
} from "@material-ui/core";

import TemplateDefault from "../../src/templates/Default";
import Card from "../../src/components/Card";
import { formatCurrency } from "../../src/utils/currency";
import useToasty from "../../src/contexts/Toasty";


const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    searchBox: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(0, 2),
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

const Search = ({ q, products }) => {
    const classes = useStyles();
    const router = useRouter();
    const { setToasty } = useToasty();
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
            <Container maxWidth="lg" >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Paper className={classes.searchBox}>
                            <InputBase
                                onChange={handleChangeSearch}
                                placeholder="Search…"
                                fullWidth
                            />
                            {
                                loading ? <CircularProgress size={15} className={classes.loading} /> :
                                    <IconButton onClick={handleSubmitSearch}>
                                        <SearchIcon color='primary' />
                                    </IconButton>
                            }
                        </Paper>
                    </Grid>
                </Grid>
            
                <Grid item xs={12} sm={12} md={12}>
                    <Box className={classes.box}>
                        <Typography variant="h6" component="h6">
                            Advertisements
                        </Typography>
                        <Typography variant="span" component="subtitle2">
                            Found {products.length} Advertisements for  &quot; {q} &quot;
                        </Typography>
                        <br /><br />
                        <Grid container spacing={4}>
                            {
                                products.map((product, key) => {
                                    const category = slugify(product.category, { lower: true });
                                    const title = slugify(product.title, { lower: true });
                                    return (
                                        <Grid item key={key} xs={12} sm={6} md={4}>
                                            <Link href={`/${category}/${title}?id=${product._id}`}>
                                                <a className={classes.productLink}>
                                                    <Card
                                                        image={`/uploads/${product.files[0].name}`}
                                                        title={product.title}
                                                        subtitle={formatCurrency(product.price)}
                                                        href={`/${category}/${title}?id=${product._id}`}
                                                    />
                                                </a>
                                            </Link>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                </Grid>

            </Container>
        </TemplateDefault>
    )
}

export async function getServerSideProps({ query }) {
    const q = query.query;

    await dbConnect();

    const products = await ProductsModel.find({
        $or : [
            { title: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
        ]
    });
  
    return {
        props: {
            q,
            products: JSON.parse(JSON.stringify(products))
        }
    }
}
    
export default Search;