import dbConnect from '../../src/utils/dbConnect'
import axios from 'axios'
import { forwardRef, useState } from 'react'
import { getSession } from 'next-auth/client'
import ProductsModel from '../../src/models/products'

import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core'
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles'
import TemplateDefault from '../../src/templates/Default'
import Card from '../../src/components/Card'
import { formatCurrency } from '../../src/utils/currency'
import useToasty from '../../src/contexts/Toasty'

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
  }
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home = ({ products }) => {
  const classes = useStyles()
  const { setToasty } = useToasty()
  const [productID, setProductID] = useState() 
  const [removeProducts, setRemoveProducts] = useState([])
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleClickRemove = (productId) => {
    setProductID(productId);
    setOpenConfirmModal(true);
  }

  const handleConfirmRemove = () => {
    axios.delete('/api/products/delete',
      {
        data: {
          id: productID
        }
      }
    )
      .then(handleSuccess)
      .catch(handleError)
  }

  const handleSuccess = () => {
    setOpenConfirmModal(false);
    setRemoveProducts([...removeProducts, productID]);
    setToasty({
      open: true,
      type: 'success',
      message: 'Advertisement removed successfully!'
    })

  }

  const handleError = () => {
    setOpenConfirmModal(false);
    setToasty({
      open: true,
      type: 'error',
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
            This action can't be undone.
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
        <Typography component="h1" variant="h2" align='center'>
          My Advertisement
        </Typography>
        <Button href="/user/publish" variant='contained' color='primary' className={classes.buttonAdd}>Post new Advertisement</Button>
      </Container>
      <Container maxWidth="md" >
        {
          products.length === 0 && (
            <Typography component="div" variant="body1" align='center' gutterBottom>
              No ads posted yet!
            </Typography>
          )
        }
        <Grid container spacing={4}>
          {
            products.map((product, key) => {
              if(removeProducts.includes(product._id)) return null

              return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card 
                  image={`/uploads/${product.files[0].name}`}
                  title={product.title}
                  subtitle={formatCurrency(product.price)}
                  actions={
                    <>
                      <Button 
                        size='small' 
                        color='primary'
                        variant="contained"
                        href={`/user/edit/${product._id}`}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button 
                        size='small' 
                        variant="contained"
                        className={classes.buttonRemove }
                        startIcon={<DeleteIcon />}
                        onClick={() => handleClickRemove(product._id)}
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
  const session = await getSession( req )
  await dbConnect()
  const products = await ProductsModel.find({ 'user.id': session.userId })
  
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}


export default Home