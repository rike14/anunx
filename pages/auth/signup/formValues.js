import * as yup from 'yup';

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

export {
    initialValues,
    validationSchema,
    };