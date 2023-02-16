
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    mainImage: {},
    mask: {},
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

export default useStyles