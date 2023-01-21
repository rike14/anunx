import {
    Container,
    Typography,
    Box,
    TextField,
    Select,
}   from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import TemplateDefault from '../../src/templates/Default'


const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(8, 0, 6),
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
            <Container maxWidth="md">
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
        </TemplateDefault>
    )
}

export default Publish