import axios from 'axios';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    FormHelperText,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { getSession, useSession } from 'next-auth/react';
import FileUpload from '../../../src/components/fileUpload';
import TemplateDefault from '../../../src/templates/Default';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import useToasty from '../../../src/contexts/Toasty';



const useStyles = makeStyles((theme) => ({

    boxContainer: {
        padding: theme.spacing(3),
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
    },
    inputLabel: {
        color: theme.palette.text.primary,
        fontWeight: 400,
    },
}))



const initialValues = {
    title: '',
    category: '',
    description: '',
    price: '',
    email: '',
    name: '',
    phone: '',
    city: '',
    files: [],
}

const validationSchema = yup.object().shape({
    title: yup.string()
        .min(6, 'Title must be more than six characters')
        .max(80, 'Title must be less than eighty characters')
        .required('Title is required'),

    category: yup.string()
        .required('Category is required'),

    description: yup.string()
        .min(20, 'Description must be more than twenty characters')
        .required('Description is required'),

    price: yup.number()
        .required('Price is required'),

    email: yup.string()
        .email('Email is invalid')
        .required('Email is required'),

    name: yup.string()
        .required('Name is required'),

    phone: yup.number()
        .required('Phone is required'),
    
    city: yup.string()
        .required('City is required'),

    files: yup.array()
        .min(1, 'At least one image is required')
        .required('Images are required'),

}) 

const Publish = ({ userId, image }) => {
    const classes = useStyles()
    const router = useRouter()
    const [canEdit, setCanEdit] = useState(false);
    const { data: session } = useSession()
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false);
    const { setToasty } = useToasty();

    const searchParams = useSearchParams()

    const getProducts = async () => {
        setLoading(true);
        const response = await axios.get('/api/products/get',
            {
                params: {
                    id: searchParams.get('id')
                }
            }
        );
        setProduct(response.data.product);
        if (session.user?.email == product.user.email) {
            setCanEdit(true)
        }
    }


    useEffect(() => {
        if (searchParams.get('id')){
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
        }
        if(!canEdit && searchParams.get('id')){
            router.push('/user/publish')
        }
    }, []);

    

   

    const formValues = {
        ...initialValues,
    }

    formValues.userId = userId
    formValues.image = image

    const handleSuccess = () => {
        setToasty({
            open: true,
            severity: 'success',
            message: 'Product published successfully'
        })
        router.push('/user/dashboard')
    }

    const handleError = () => {
        setToasty({
            open: true,
            severity: 'error',
            message: 'Something went wrong'
        })
    }

    const handleFormSubmit = (values) => {
        const formData = new FormData()

        for(let field in values){
            if(field === 'files'){
                values.files.forEach(file => {
                    formData.append('files', file)
                })
            }else{
                formData.append(field, values[field])
            }
        }

        axios.post('/api/products/post', formData)
            .then(handleSuccess)
            .catch(handleError)
        
    }


    return (
        <TemplateDefault>
            <Formik
                initialValues={formValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {
                ({
                    touched,
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                }) => {
                    
                       

                        return (
                            <form onSubmit={handleSubmit}>
                                <Input type='hidden' name='userId' value={values.userId} />
                                <Input type='hidden' name='image' value={values.image} />
                                <Container maxWidth="sm" >
                                    <Typography variant="h4" component="h1" align='center' color='primary'>
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
                                                value={product?.title ?? values.title}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>{errors.title && touched.title ? errors.title : null }</FormHelperText>
                                        </FormControl>
                                        <br /><br />
                                        <FormControl error={errors.category && touched.category } fullWidth>
                                            <InputLabel className={classes.inputLabel}>Category</InputLabel>
                                            <Select
                                            name='category'
                                            value={product?.category ?? values.category}
                                            onChange={handleChange}
                                            fullWidth
                                            >
                                            <MenuItem value='Notebook'>Notebook</MenuItem>
                                            <MenuItem value='Cell Phone'>Cell phone</MenuItem>
                                            <MenuItem value='Video game'>Video game</MenuItem>
                                            </Select>
                                            <FormHelperText>{errors.category && touched.category  ? errors.category : null }</FormHelperText>
                                        </FormControl>
                                    </Box>
                                </Container>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                      <FileUpload
                                        files={product?.files ?? values.files}
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
                                                value={product?.description ?? values.description}
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
                                                value={product?.price ?? values.price}
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
                                                value={product?.user?.name ?? values.name}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>{errors.name && touched.name  ? errors.name : null }</FormHelperText> 
                                        </FormControl>
                                        <br /><br />
                                        <FormControl error={errors.email && touched.email} fullWidth>
                                            <InputLabel className={classes.inputLabel}>E-mail</InputLabel>
                                            <Input 
                                                name='email'
                                                value={product?.user?.email ?? values.email}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>{errors.email && touched.email  ? errors.email : null }</FormHelperText>
                                        </FormControl>
                                        <br /><br />
                                        <FormControl error={errors.phone && touched.phone} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Phone</InputLabel>
                                            <Input 
                                                name='phone'
                                                value={product?.user?.phone ?? values.phone}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>{errors.phone && touched.phone  ? errors.phone : null }</FormHelperText>
                                        </FormControl>
                                        <br /><br />
                                        <FormControl error={errors.city && touched.city} fullWidth>
                                            <InputLabel className={classes.inputLabel}>City</InputLabel>
                                            <Input 
                                                name='city'
                                                value={product?.user?.city ?? values.city}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>{errors.city && touched.city ? errors.city : null }</FormHelperText>
                                        </FormControl>
                                    </Box>
                                </Container>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    {
                                        isSubmitting 
                                        
                                            ? <CircularProgress />
                                            : <Button type='submit' variant='contained' color='primary'>
                                                Publish
                                              </Button>
                                    }
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

export async function getServerSideProps( req ) {
    const session = await getSession(req)
    
    if(!session){
        return {props: {}}
    }
    return {
        props: {
            userId: session.user.id,
            image: session.user.image ?? '/images/anunx-logo.png',
        }
    }
}

export default Publish