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
                                        <Typography variant="h6" component="h6" align='left' color='primary'>
                                            Advertisement Title
                                        </Typography>
                                        <TextField 
                                            name='title'
                                            value={values.title}
                                            onChange={handleChange}
                                            label="ex: Iphone 12 Pro Max 256GB"
                                            size='small'
                                            fullWidth
                                            error={errors.title}
                                            helperText={errors.title}

                                        />
                                        <br /><br />
                                        <Typography variant="h6" component="h6" color='textPrimary'>
                                            Category
                                        </Typography>
                                        <Select
                                            native
                                            fullWidth
                                            value=""
                                            onChange={() => {}}
                                            inputProps={{
                                                name: 'age',
                                            }}>
                                            <option value="">Select category</option>
                                            <option value={10}>Ten</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>

                                            </Select>
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
                                        <Typography variant="div" component="body2" align='left' color='textPrimary'>
                                            Describe your product in detail
                                        </Typography>
                                        <TextField 
                                            minRows={6}
                                            multiline
                                            fullWidth
                                            variant='outlined'
                                        />
                                    </Box>
                                </Container>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography variant="h6" component="h6" align='left' color='textPrimary' gutterBottom>
                                            Contacts
                                        </Typography>
                                        <TextField 
                                            label='Name'
                                            fullWidth
                                            size='small'
                                            variant='outlined'
                                        />
                                        <br /><br />
                                        <TextField 
                                            label='E-mail'
                                            fullWidth
                                            size='small'
                                            variant='outlined'
                                        />
                                        <br /><br />
                                        <TextField 
                                            label='Phone'
                                            fullWidth
                                            size='small'
                                            variant='outlined'
                                        />
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