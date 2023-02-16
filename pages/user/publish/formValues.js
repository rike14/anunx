
import * as yup from 'yup';

const initialValues = {
    title: '',
    category: '',
    description: '',
    price: '',
    email: '',
    name: '',
    phone: '',
    files: [],
}

const validationSchema = yup.object().shape({
    title: yup.string()
        .min(6,'Title must be more than six characters')
        .max(80, 'Title must be less than eighty characters')
        .required('Title is required'),

    category: yup.string()
        .required('Category is required'),

    description: yup.string()
        .min(50,'Description must be more than fifty characters')
        .required('Description is required'),
    
    price: yup.number()
        .required('Price is required'),

    email: yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    
    name: yup.string()
        .required('Name is required'),

    phone: yup.number()
        .required('Number is required'),

    files: yup.array()
        .min(1, 'At least one image is required')
        .required('Images are required'),
        
})

export {
    initialValues,
    validationSchema,
    };