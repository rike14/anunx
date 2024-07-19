import {
    Typography,
    Box,
    IconButton,
} from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'
import { useDropzone } from 'react-dropzone'

import useStyles from './styles'

const FileUpload = ({files, errors, touched, setFieldValue}) => {
    const classes = useStyles()

    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            const newFiles = acceptedFiles.map((file) => {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            })

            setFieldValue('files', [
                ...files,
                ...newFiles
            ])
        },
    })

    const handleRemoveFile = fileName => {
        const newFileState = files.filter(file => file.name !== fileName)
        setFieldValue('files', newFileState)
    }
    return ( 
        <>
            <Typography variant="h6" component="h6" align='left' color={errors && touched ? 'error' : 'textPrimary'}>
                Images
            </Typography>
            <Typography variant="div" component="p" align='left' color={errors && touched ? 'error' : 'textPrimary'}>
                The first image will be the cover
            </Typography>
            {
                errors && touched ?
                <Typography variant="p" gutterBottom color='error'>
                    {errors}
                </Typography>
                : null
            }
            <Box className={classes.thumbsContainer}>
                <Box className={classes.dropZone} {...getRootProps()}>
                    <input name='files' {...getInputProps()} />
                    <Typography variant='p' color='textPrimary'>
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
        </>
    )
}

export default FileUpload