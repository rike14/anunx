import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import slugify from "slugify";

import {
    Box,
    Container,
    Grid,
    IconButton,
    InputBase,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import Card from "../../src/components/Card";
import Loading from "../../src/components/Loading";
import useToasty from "../../src/contexts/Toasty";
import TemplateDefault from "../../src/templates/Default";
import { formatCurrency } from "../../src/utils/currency";


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
    const [search, setSearch] = useState(q);
    const [loading, setLoading] = useState(false);

    const handleSubmitSearch = async () => {
        setLoading(true);
        getProducts()
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    
    const getProducts = async () => {
        await axios.get('/api/products/search?query=' + search)
            .then(() => {
                setLoading(false);
                if (search) {
                    router.push(`/search/${search}`);
                }
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


    return (
        <TemplateDefault>
            <Container maxWidth="lg" >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Paper className={classes.searchBox}>
                            <InputBase
                                onChange={handleChangeSearch}
                                value={search}
                                placeholder="Search…"
                                fullWidth
                            />
                            {
                                loading ? '' :
                                    <IconButton onClick={handleSubmitSearch}>
                                        <SearchIcon color='primary' />
                                    </IconButton>
                            }
                        </Paper>
                    </Grid>
                </Grid>
            
                <Grid item xs={12} sm={12} md={12}>
                    <Box className={classes.box}>
                        {loading && <Loading />}
                        {
                            products.length === 0 && !loading && (
                                <>
                                    <Typography variant="h6" component="h6">
                                        Advertisements
                                    </Typography>
                                    <Typography variant="body1" component="subtitle2">
                                        Found {products.length} Advertisements for  &quot; {q} &quot;
                                    </Typography>
                                </>
                            )
                        }
                        <br /><br />
                        <Grid container spacing={4}>
                            {   !loading &&
                                products.map((product, key) => {
                                    const category = slugify(product.category, { lower: true });
                                    const title = slugify(product.title, { lower: true });
                                    return (
                                        <Grid item key={key} xs={12} sm={6} md={4}>
                                            <Link href={`/${category}/${title}?id=${product._id}`}>
                                                {/* <a className={classes.productLink}> */}
                                                    <Card
                                                        image={`/uploads/${product.files[0].name}`}
                                                        title={product.title}
                                                        subtitle={formatCurrency(product.price)}
                                                        href={`/${category}/${title}?id=${product._id}`}
                                                    />
                                                {/* </a> */}
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
    return {props: {
        q,
        products: []
    }}
}
    
export default Search;