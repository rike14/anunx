import axios from 'axios'
import { forwardRef, useEffect, useState } from 'react'
import UsersModel from '../../src/models/users'
import dbConnect from '../../src/utils/dbConnect'

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  Typography,
} from '@material-ui/core'
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Card from '../../src/components/Card'
import Loading from '../../src/components/Loading'
import useToasty from '../../src/contexts/Toasty'
import TemplateDefault from '../../src/templates/Default'
import { formatCurrency } from '../../src/utils/currency'

const useStyles = makeStyles((theme) => ({
  buttonAdd: {
    margin: '30px auto 50px auto',
    display: 'inline-block',
  },
  buttonRemove: {
    backgroundColor: '#f44336',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#d32f2f',
    }
  },
  title: {
    textWrap: 'wrap'
  }
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home = ({ user }) => {
  const classes = useStyles()
  const { setToasty } = useToasty()
  const [productID, setProductID] = useState() 
  const [removeProducts, setRemoveProducts] = useState([])
  const [products, setProducts] = useState([])
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  
  const getProducts = async () => {
      setLoading(true);
    const response = await axios.get('/api/products/getProductByUser',
         {
          params: {
            email: user.email
          }
        }
      );
      setProducts(response.data.products);
  }

  const handleClickGoToPostAd = async () => {
    setLoading(true);
    router.push('/user/publish') 
  }

  useEffect(() => {
    if (!user) {
      router.push('/')
      return;
    } 
    getProducts()
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setToasty({
          open: true,
          message: 'Error when loading products',
          severity: 'error',
        })
      })
  }, []);

  const handleClickRemove = (product) => {
    const productId = product._id
    setProductID(productId);
    setOpenConfirmModal(true);
  }

  const handleConfirmRemove = async () => {
    await axios.delete('/api/products/delete',
      {
        data: {
          id: productID
        }
      }
    )
      .then(handleSuccess)
      .catch(handleError)
  }

  const handleSuccess = async () => {
    const product = products.filter(product => product._id == productID)
    const filesProduct = product[0].files

    filesProduct.map(async file => {
      await fetch(
        `/api/upload/delete`,
        {
          method: 'delete',
          body: JSON.stringify(file.path),
        },
      );
    })
    
    setOpenConfirmModal(false);
    await setRemoveProducts([...removeProducts, productID]);
    setToasty({
      open: true,
      severity: 'success',
      message: 'Advertisement removed successfully!'
    })

  }

  const handleError = () => {
    setOpenConfirmModal(false);
    setToasty({
      open: true,
      severity: 'error',
      message: 'Error removing advertisement!'
    })
  }

  const handleCloseModal = () => setOpenConfirmModal(false);

  return (
    <TemplateDefault>
      <Dialog
        open={openConfirmModal}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
      >
        <DialogTitle >Are you sure do you want to remove this ad?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can&apos;t be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmRemove} className={classes.buttonRemove} color="primary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="sm" align='center' >
        <Typography component="h1" variant="h4" align='center'>
          My Advertisement
        </Typography>
        <Button  onClick={handleClickGoToPostAd} variant='contained' color='primary' className={classes.buttonAdd}>Post new Advertisement</Button>
      </Container>
      <Container maxWidth="md" >
        {loading && <Loading />}
        { !loading &&
          products.length === 0 && (
            <Typography component="div" variant="body1" align='center' gutterBottom>
              No ads posted yet!
            </Typography>
          )
        }
        <Grid container spacing={4}>
          { !loading &&
            products.map((product, key) => {
              if(removeProducts.includes(product._id)) return null

              return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card 
                  className={classes.title}
                  image={product.files[0].path}
                  title={product.title}
                  subtitle={formatCurrency(product.price)}
                  actions={
                    <>
                      <Button 
                        size='small' 
                        color='primary'
                        variant="contained"
                        href={`/user/publish/${product._id}`}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button 
                        size='small' 
                        variant="contained"
                        className={classes.buttonRemove }
                        startIcon={<DeleteIcon />}
                        onClick={() => handleClickRemove(product)}
                      >
                        Remove
                      </Button>
                    </>
                  }
                />
              </Grid>
            )})
          }
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

Home.requireAuth = true

export async function getServerSideProps(req) {
  const session = await getSession(req)
  if (!session) {
    return { props: {} }
  }
  await dbConnect()
  const user = await UsersModel.findOne({'email': session.user.email})
  
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    }
  }
}


export default Home