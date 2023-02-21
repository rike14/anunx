import { Box, Button, Container, FormControl, FormHelperText, Input, InputLabel, Typography } from '@material-ui/core'
import { Formik } from 'formik'

import TemplateDefault from '../../../src/templates/Default'
import { initialValues, validationSchema } from './formValues'

import useStyles from './styles'

const Signup = () => {
    const classes = useStyles()

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
                        onSubmit={(values) => {
                            alert('Submit', values)
                         }
                        }
                    >
                        {
                            ({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit
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

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Sign Up
                                    </Button>
                                </form>
                            )
                        }
                    </Formik>
                </Box>
            </Container>
        </TemplateDefault>
    )
}
    
export default Signup