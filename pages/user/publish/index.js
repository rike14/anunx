import { Formik } from 'formik';
import {
    Container,
    Typography,
    Box,
    Select,
    Button,
    MenuItem,
    FormControl,
    FormHelperText,
    InputLabel,
    InputAdornment,
    Input,
}   from '@material-ui/core'

import TemplateDefault from '../../../src/templates/Default'
import {initialValues, validationSchema} from './formValues'
import FileUpload from '../../../src/components/fileUpload'

import useStyles from './styles'



const Publish = () => {
    const classes = useStyles()


    return (
        <TemplateDefault>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('submit', values)
                }}

            >
                {
                ({
                    touched,
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                }) => {
                    
                       

                        return (
                            <form onSubmit={handleSubmit}>
                                <Container maxWidth="sm" >
                                    <Typography variant="h2" component="h1" align='center' color='primary'>
                                        Post Ad
                                    </Typography>
                                    <Typography variant="h5" component="h5" align='center' color='primary'>
                                    The more detailed, better!
                                    </Typography>
                                </Container>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <FormControl error={errors.title && touched.title} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Advertisement Title</InputLabel>
                                            <Input 
                                                name='title'
                                                value={values.title}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>{errors.title && touched.title ? errors.title : null }</FormHelperText>
                                        </FormControl>
                                        <br /><br />
                                        <FormControl error={errors.category && touched.category } fullWidth>
                                            <InputLabel className={classes.inputLabel}>Category</InputLabel>
                                            <Select
                                            name='category'
                                            value={values.category}
                                            onChange={handleChange}
                                            fullWidth
                                            >
                                            <MenuItem value='Ten'>Ten</MenuItem>
                                            <MenuItem value='Twenty'>Twenty</MenuItem>
                                            <MenuItem value='Thirty'>Thirty</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.category && touched.category  ? errors.category : null }</FormHelperText>
                                        </FormControl>
                                    </Box>
                                </Container>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                      <FileUpload
                                        files={values.files}
                                        errors={errors.files}
                                        touched={touched.files}
                                        setFieldValue={setFieldValue}
                                        />
                                    </Box>
                                </Container>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography variant="h6" component="h6" align='left' color='textPrimary'>
                                            Description
                                        </Typography>
                                        <FormControl error={errors.description && touched.description} fullWidth>
                                            <InputLabel className={classes.inputLabel}> Describe your product in detail</InputLabel>
                                            <Input 
                                                name='description'
                                                minRows={6}
                                                multiline
                                                onChange={handleChange}
                                                variant='outlined'
                                            />
                                            <FormHelperText>{errors.description && touched.description ? errors.description : null }</FormHelperText>
                                        </FormControl>
                                    </Box>
                                </Container>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <FormControl error={errors.price && touched.price} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Price</InputLabel>
                                            <Input 
                                                name='price'
                                                variant='outlined'
                                                onChange={handleChange}
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            />
                                            <FormHelperText>{errors.price && touched.price  ? errors.price : null }</FormHelperText>
                                        </FormControl>
                                    </Box>
                                </Container>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography variant="h6" component="h6" align='left' color='textPrimary' gutterBottom>
                                            Contacts
                                        </Typography>
                                        <FormControl error={errors.name && touched.name} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Name</InputLabel>
                                            <Input 
                                                name='name'
                                                value={values.name}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>{errors.name && touched.name  ? errors.name : null }</FormHelperText> 
                                        </FormControl>
                                        <br /><br />
                                        <FormControl error={errors.email && touched.email} fullWidth>
                                            <InputLabel className={classes.inputLabel}>E-mail</InputLabel>
                                            <Input 
                                                name='email'
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>{errors.email && touched.email  ? errors.email : null }</FormHelperText>
                                        </FormControl>
                                        <br /><br />
                                        <FormControl error={errors.phone && touched.phone} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Phone</InputLabel>
                                            <Input 
                                                name='phone'
                                                value={values.phone}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>{errors.phone && touched.phone  ? errors.phone : null }</FormHelperText>
                                        </FormControl>
                                    </Box>
                                </Container>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box textAlign='right'>
                                    <Button type='submit' variant='contained' color='primary'>
                                            Publish Ad
                                    </Button>
                                    </Box>
                                </Container>
                            </form>
                        )
                    }
                }
            </Formik>
        </TemplateDefault>
    )
}

Publish.requireAuth = true

export default Publish