
import SearchIcon from "@material-ui/icons/Search";
import { 
    Box, 
    Container, 
    Grid, 
    IconButton, 
    InputBase, 
    makeStyles, 
    Paper, 
    Typography 
} from "@material-ui/core";
import TemplateDefault from "../../src/templates/Default";
import Card from "../../src/components/Card";


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
}));

const List = () => {
    const classes = useStyles();

    return (
        <TemplateDefault>
            <Container maxWidth="lg" >

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Paper className={classes.searchBox}>
                            <InputBase
                                placeholder="Search…"
                                fullWidth
                            />
                            <IconButton type="submit" aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
            
                <Grid item xs={12} sm={12} md={12}>
                    <Box className={classes.box}>
                        <Typography variant="h6" component="h6">
                            Advertisements
                        </Typography>
                        <Typography variant="span" component="subtitle2">
                            Found 200 Advertisements
                        </Typography>
                        <br /><br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card
                                    image={`https://source.unsplash.com/random?a=1`}
                                    title="Title of the image"
                                    subtitle="R$ 60,00"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card
                                    image={`https://source.unsplash.com/random?a=2`}
                                    title="Title of the image"
                                    subtitle="R$ 80,00"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card
                                    image={`https://source.unsplash.com/random?a=3`}
                                    title="Title of the image"
                                    subtitle="R$ 110,00"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

            </Container>
        </TemplateDefault>
    )
}
    
export default List;