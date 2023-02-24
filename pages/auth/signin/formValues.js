import * as yup from 'yup';

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

export {
    initialValues,
    validationSchema,
};