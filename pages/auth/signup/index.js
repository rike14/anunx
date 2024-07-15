import axios from 'axios';
import { Formik } from 'formik';
import Link from 'next/link';
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
    InputLabel,
    makeStyles,
    Typography,
} from '@material-ui/core';

import useToast from '../../../src/contexts/Toasty';
import TemplateDefault from '../../../src/templates/Default';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
    },
    loading: {
        display: 'block',
        margin: '10px auto',
    },
}));


const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const validationSchema = yup.object().shape({
    name: yup.string()
        .min(6, 'Name must be at least 6 characters')
        .required('Name is required'),

    email: yup.string()
        .email('Email is invalid')
        .required('Email is required'),

    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),

    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),

})


const Signup = () => {
    const classes = useStyles()
    const router = useRouter()
    const { setToasty } = useToast()

    const handleFormSubmit = async values => {
        const response = await axios.post('/api/users', values)

        if(response.data.success) {  
            setToasty({
                open: true,
                message: 'Account created successfully',
                severity: 'success',
            })

            router.push('/auth/signin')

        }
    }
        

    return (
        <TemplateDefault>
            <Container maxWidth="sm" component="main" className={classes.container} >
                <Typography component='h1' variant='h2' align='center' color='textPrimary'>
                    Create your account
                </Typography>
                <Typography component='h5' variant='h5' align='center' color='textPrimary'>
                    And advertise for all of Brazil
                </Typography>
            </Container>

            <Container maxWidth="md" component="main" >
                <Box mt={5}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {
                            ({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <FormControl fullWidth error={errors.name && touched.name} className={classes.formControl}>
                                        <InputLabel className={classes.InputLabel}>Name</InputLabel>
                                        <Input
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText>{errors.name && touched.name ? errors.name : ''}</FormHelperText>
                                    </FormControl>

                                    <FormControl fullWidth error={errors.email && touched.email} className={classes.formControl}>
                                        <InputLabel className={classes.InputLabel}>Email</InputLabel>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText>{errors.email && touched.email ? errors.email : ''}</FormHelperText>
                                    </FormControl>
                                    
                                    <FormControl fullWidth error={errors.password && touched.password} className={classes.formControl}>
                                        <InputLabel className={classes.InputLabel}>Password</InputLabel>
                                        <Input
                                            name="password"
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText>{errors.password && touched.password ? errors.password : ''}</FormHelperText>
                                    </FormControl>

                                    <FormControl fullWidth error={errors.confirmPassword && touched.confirmPassword} className={classes.formControl}>
                                        <InputLabel className={classes.InputLabel}>Confirm Password</InputLabel>
                                        <Input
                                            name="confirmPassword"
                                            type="password"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText>{errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ''}</FormHelperText>
                                    </FormControl>
                                    {
                                        isSubmitting ? (
                                            <CircularProgress className={classes.loading} />
                                        ) : (
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                            >
                                                Sign Up
                                            </Button>
                                        )
                                    }
                                </form>
                            )
                        }
                    </Formik>
                    <Typography align='center' style={{ marginTop: 10 }}>
                        Already have an account?
                    </Typography>
                    <Link href={'/auth/signin'} passHref>
                        <Button fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Signin
                        </Button>
                    </Link>
                </Box>
            </Container>
        </TemplateDefault>
    )
}
    
export default Signup