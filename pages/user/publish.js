import { useState } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
import {
    Container,
    Typography,
    Box,
    TextField,
    Select,
    Button,
    IconButton,
    MenuItem,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Input,
}   from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import { DeleteForever } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import TemplateDefault from '../../src/templates/Default'


const useStyles = makeStyles((theme) => ({
    mainImage: {},
    mask: {},
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
    thumbsContainer: {
        display: 'flex',
        marginTop: 15,
        flexWrap: 'wrap',
    },
    dropZone: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
        margin: '0 10px 10px 0',
        width: 200,
        height: 150,
        backgroundColor: theme.palette.background.default,
        border: '2px dashed black',
    },
    thumb: {
        position: 'relative',
        width: 200,
        height: 150,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        margin: '0 15px 15px 0',

        '& $mainImage': {
            position: 'absolute',
            backgroundColor: 'blue',
            padding: 6,
            bottom: 0,
            left: 0,
        },

        '&:hover $mask': {
            cursor: 'pointer',
            display: 'flex',
        },

        '& $mask': {
            display: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            height: '100%',
            width: '100%',
        },
    },

}))

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
        
})


const Publish = () => {
    const classes = useStyles()
    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            const newFiles = acceptedFiles.map((file) => {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            })

            setFiles([
                ...files,
                ...newFiles
            ])
        },
    })

    const handleRemoveFile = fileName => {
        const newFileState = files.filter(file => file.name !== fileName)
        setFiles(newFileState)
    }

    return (
        <TemplateDefault>
            <Formik
                initialValues={{
                    title: '',
                    category: '',
                    description: '',
                    price: '',
                    email: '',
                    name: '',
                    phone: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('submit', values)
                }}

            >
                {
                ({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
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
                                        <FormControl error={errors.title} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Advertisement Title</InputLabel>
                                            <Input 
                                                name='title'
                                                value={values.title}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>{errors.title}</FormHelperText>
                                        </FormControl>
                                        <br /><br />
                                        <FormControl error={errors.category} fullWidth>
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
                                            <FormHelperText>{errors.category}</FormHelperText>
                                        </FormControl>
                                    </Box>
                                </Container>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography variant="h6" component="h6" align='left' color='textPrimary'>
                                            Images
                                        </Typography>
                                        <Typography variant="div" component="body2" align='left' color='textPrimary'>
                                            The first image will be the cover
                                        </Typography>
                                        <Box className={classes.thumbsContainer}>
                                            <Box className={classes.dropZone} {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Typography variant='body2' color='textPrimary'>
                                                    Click here to upload images.
                                                </Typography>
                                            </Box>
                                            {
                                                files.map((file, index) => (
                                                
                                                    <Box
                                                        key={file.name}
                                                        className={classes.thumb}
                                                        style={{ backgroundImage: `url(${file.preview})` }}
                                                    >   
                                                        {
                                                            index === 0 ?
                                                            <Box className={classes.mainImage}>
                                                                <Typography variant='body1' color='secondary'>
                                                                    Main
                                                                </Typography>
                                                            </Box>
                                                            : null
                                                        }
                                                        <Box className={classes.mask}>
                                                            <IconButton color='secondary' onClick={() => handleRemoveFile(file.name)}>
                                                                <DeleteForever fontSize='large'/>
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                ))
                                            }

                                        </Box>
                                    </Box>
                                </Container>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography variant="h6" component="h6" align='left' color='textPrimary'>
                                            Description
                                        </Typography>
                                        <FormControl error={errors.description} fullWidth>
                                            <InputLabel className={classes.inputLabel}> Describe your product in detail</InputLabel>
                                            <Input 
                                                name='description'
                                                minRows={6}
                                                multiline
                                                onChange={handleChange}
                                                variant='outlined'
                                            />
                                            <FormHelperText>{errors.description}</FormHelperText>
                                        </FormControl>
                                    </Box>
                                </Container>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <FormControl error={errors.price} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Price</InputLabel>
                                            <Input 
                                                name='price'
                                                variant='outlined'
                                                onChange={handleChange}
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            />
                                            <FormHelperText>{errors.price}</FormHelperText>
                                        </FormControl>
                                    </Box>
                                </Container>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography variant="h6" component="h6" align='left' color='textPrimary' gutterBottom>
                                            Contacts
                                        </Typography>
                                        <FormControl error={errors.name} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Name</InputLabel>
                                            <Input 
                                                name='name'
                                                value={values.name}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>{errors.name}</FormHelperText> 
                                        </FormControl>
                                        <br /><br />
                                        <FormControl error={errors.email} fullWidth>
                                            <InputLabel className={classes.inputLabel}>E-mail</InputLabel>
                                            <Input 
                                                name='email'
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>{errors.email}</FormHelperText>
                                        </FormControl>
                                        <br /><br />
                                        <FormControl error={errors.phone} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Phone</InputLabel>
                                            <Input 
                                                name='phone'
                                                value={values.phone}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>{errors.phone}</FormHelperText>
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

export default Publish