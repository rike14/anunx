import { 
    Card as CardMUI,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    makeStyles,
    Box
} from "@material-ui/core";


const useStyles = makeStyles(() => ({
    box: {
        padding: '0 40px',
    },
    cardMedia: {
        paddingTop: '100%',
    },
}))


const Card = ({image, title, subtitle, actions}) => {
    const classes = useStyles();

    return (
        <CardMUI >
            <Box className={classes.box} textAlign='center'>
                <CardMedia
                    className={classes.cardMedia}
                    image={image}
                    title={title}
                />
            </Box>
            <CardContent>
                <Typography variant='h5' component='h2'>
                    {title}
                </Typography>
                <Typography>
                    {subtitle}
                </Typography>
            </CardContent>
            
                {
                    actions
                        ? (
                            <CardActions>
                                {actions}
                            </CardActions>
                        ) : null
                }
                
        </CardMUI>

    )
}

export default Card;