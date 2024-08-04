'use client';
import {
    Box,
    IconButton,
    Typography,
} from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

import { useRef, useState } from 'react';

import Loading from '../Loading';
import useStyles from './styles';

const FileUpload = ({files, errors, touched, setFieldValue}) => {
    const classes = useStyles()
    const inputFileRef = useRef(null);
    const [loading, setLoading] = useState(false)

    const handleRemoveFile = async fileUrl => {
        setLoading(true)
        const response = await fetch(
            `/api/upload/delete`,
            {
                method: 'delete',
                body: JSON.stringify(fileUrl),
            },
        );
        if(response.status == 200){
            const newFileState = files.filter(file => file.url !== fileUrl)
            setFieldValue('files', newFileState)
        }
        setLoading(false)

    }
    return ( 
        <>
            {loading ? <Box className={classes.boxLoading}><Loading /></Box> :
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
                <Box className={classes.fileUpload}
                        onChange={async () => {
                            setLoading(true)
                            
                            const file = inputFileRef.current.files[0];
                            if(file){
                                const response = await fetch(
                                    `/api/upload/post?filename=${file.name}`,
                                    {
                                        method: 'POST',
                                        body: file,
                                    },
                                );
                                
                                const fileURL = (await response.json());
                                const fileToArray = [fileURL]

                                setFieldValue('files', [
                                    ...files,
                                    ...fileToArray
                                ])
                            }
                            setLoading(false)
                        }}
                    >    
                    
                    <img src="/images/img_upload.jpg" className={classes.imgUpload}/>
                    <Typography variant='h6' color='textPrimary'>Click box to upload</Typography>
                    <Typography variant='p' color='textPrimary'>Maximum file size 4.5mb</Typography>
                    <input name="files" className={classes.fileUploadInput} ref={inputFileRef} type="file" />
                    
                </Box>

                <Box className={classes.files}>
                    {
                        files.map((file, index) => (
                            <Box
                                key={file.pathname}
                                className={classes.thumb}
                                style={{ backgroundImage: `url(${file.url})` }}
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
                                    <IconButton color='secondary' onClick={() => handleRemoveFile(file.url)}>
                                        <DeleteForever fontSize='large' />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>

            </Box>
                </>
            }
        </>
    )
}

export default FileUpload