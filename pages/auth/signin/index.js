import Image from 'next/image'
import * as yup from 'yup';
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'
import Link from 'next/link';

import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from "@material-ui/core";

import TemplateDefault from '../../../src/templates/Default'
import useToast from '../../../src/contexts/Toasty'

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
  orSeparator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(7, 0, 4),
    width: '100%',
    height: '1px',
    backgroundColor: '#e8e8e8',
    '& span': {
      padding: '0 30px',
      backgroundColor: theme.palette.background.white,
    },
  }
}));


const initialValues = {
  email: '',
  password: '',
}

const validationSchema = yup.object().shape({
  email: yup.string()
    .email('Email is invalid')
    .required('Email is required'),

  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const Signin = ({ NEXTAUTH_URL }) => {
  const classes = useStyles()
  const router = useRouter()
  const { setToasty } = useToast()

  const handleGoogleLogin = () => {
    signIn('google', {
      callbackUrl: `${NEXTAUTH_URL}/user/dashboard`
    })
  }

  const handleFormSubmit = async values => {
      signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: `${NEXTAUTH_URL}/user/dashboard`,
      })
  }



  return (
    <TemplateDefault>
      <Container maxWidth="sm" component="main" className={classes.container} >
        <Typography component='h1' variant='h2' align='center' color='textPrimary'>
          Sign In
        </Typography>
      </Container>

      <Container maxWidth="md" component="main" >
        <Box mt={5}>

          <Box display='flex' justifyContent='center'>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={
                <Image
                src="/images/logo_google.svg"
                alt="Google"
                width={20}
                height={20}
                />
              }
              onClick={handleGoogleLogin} 
            >
              Enter with Google
              
            </Button>
          </Box>

          <Box className={classes.orSeparator}>
            <span>or</span>
          </Box>
        
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
                  {
                    router.query.i === '1' 
                    ? setToasty({ message: 'Invalid email or password', type: 'error' })
                    : null
                  }
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
                        Sign In
                      </Button>
                    )
                  }
                </form>
              )
            }
          </Formik>
          <Typography align='center' style={{marginTop: 10}}>
            Dont have an account?
          </Typography>
          <Link href={'/auth/signup'} passHref>
            <Button fullWidth
              variant="contained"
              color="primary" 
              
            >
              Signup
            </Button>
          </Link>
        </Box>
      </Container>
    </TemplateDefault>
  )
}

Signin.getInitialProps = async function () {
  return {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }
}

export default Signin