
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    mainImage: {},
    mask: {},
    thumbsContainer: {
        display: 'flex',
        marginTop: 15,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        width: '100%'
    },
    boxLoading: {
        height: 300,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        background: '#e9f3fe',
        border: '3px dashed rgb(210, 227, 244)',

    },
    imgUpload: {
        width: '100%',
        height: 120,

        '@media (max-width: 600px)': {
            height: 200,
        }
    },
    
    thumb: {
        position: 'relative',
        width:  '32%',
        height: 200,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        marginBottom: '15px',
        marginRight: '8px',

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

        '@media (max-width: 600px)': {
            width: '100%',
            height: 250,
            margin: '15px 0',
        }
    },
    fileUpload: {
        width: '32%',
        marginBottom: '20px', 
        marginRight: '8px',
        textAlign: 'center',
        border: '3px dashed rgb(210, 227, 244)',
        padding: '0.6rem',
        position: 'relative',
        cursor: 'pointer',
        background: '#e9f3fe',
            
            '@media (max-width: 600px)' : {
                width: '100%'
            }
    },
    fileUploadInput: {
        display: 'block',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0,
        cursor: 'pointer',
    },
    files: {
        display: 'contents',
    }

}))

export default useStyles