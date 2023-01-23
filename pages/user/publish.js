import {
    Container,
    Typography,
    Box,
    TextField,
    Select,
    Button,
}   from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import TemplateDefault from '../../src/templates/Default'


const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(8, 0, 6),
    },
    boxContainer: {
        padding: theme.spacing(3),
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
    }
}))


const Publish = () => {
    const classes = useStyles()
    return (
        <TemplateDefault>
            <Container maxWidth="sm" className={classes.container}>
                <Typography variant="h2" component="h1" align='center' color='primary'>
                    Post Ad
                </Typography>
                <Typography variant="h5" component="h5" align='center' color='primary'>
                   The more detailed, better!
                </Typography>
            </Container>
            <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                    <Typography variant="h6" component="h6" align='left' color='primary'>
                        Ad Title
                    </Typography>
                    <TextField 
                        label="ex: Bicileta Aro 29 com garantia"
                        size='small'
                        fullWidth
                    />
                    <br /><br />
                    <Typography variant="h6" component="h6" color='textPrimary'>
                        Category
                    </Typography>
                    <Select
                        native
                        fullWidth
                        value=""
                        onChange={() => {}}
                        inputProps={{
                            name: 'age',
                        }}>
                        <option value="">Select category</option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>

                        </Select>
                </Box>
            </Container>
            <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                    <Typography variant="h6" component="h6" align='left' color='textPrimary'>
                        Images
                    </Typography>
                    <Typography variant="div" component="body2" align='left' color='textPrimary'>
                        The first image will be the cover
                    </Typography>
                </Box>
            </Container>
            <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                    <Typography variant="h6" component="h6" align='left' color='textPrimary'>
                        Description
                    </Typography>
                    <Typography variant="div" component="body2" align='left' color='textPrimary'>
                        Describe your product in detail
                    </Typography>
                    <TextField 
                        rows={6}
                        multiline
                        fullWidth
                        variant='outlined'
                    />
                </Box>
            </Container>
            <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                    <Typography variant="h6" component="h6" align='left' color='textPrimary' gutterBottom>
                        Contacts
                    </Typography>
                    <TextField 
                        label='Name'
                        fullWidth
                        size='small'
                        variant='outlined'
                    />
                    <br /><br />
                    <TextField 
                        label='E-mail'
                        fullWidth
                        size='small'
                        variant='outlined'
                    />
                    <br /><br />
                    <TextField 
                        label='Phone'
                        fullWidth
                        size='small'
                        variant='outlined'
                    />
                </Box>
            </Container>
            <Container maxWidth="md" className={classes.boxContainer}>
                <Box textAlign='right'>
                   <Button variant='contained' color='primary'>
                        Publish Ad
                   </Button>
                </Box>
            </Container>
        </TemplateDefault>
    )
}

export default Publish