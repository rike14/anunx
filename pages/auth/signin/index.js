import { Formik } from 'formik'
import axios from 'axios'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'

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

import TemplateDefault from '../../../src/templates/Default'
import { initialValues, validationSchema } from './formValues'
import useToast from '../../../src/contexts/Toasty'
import useStyles from './styles'

const Signin = () => {
  const classes = useStyles()
  const router = useRouter()
  const { setToasty } = useToast()
  const [ session ] = useSession()

  const handleFormSubmit = async values => {
      signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: `${window.location.origin}/user/dashboard`,
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
        </Box>
      </Container>
    </TemplateDefault>
  )
}

export default Signin