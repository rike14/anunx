import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import TemplateDefault from '../../src/templates/Default'
import Card from '../../src/components/Card'

const useStyles = makeStyles((theme) => ({
  buttonAdd: {
    margin: '30px auto',
    display: 'block',
  },
}))

const Home = () => {
  const classes = useStyles()

  return (
    <TemplateDefault>
      <Container maxWidth="sm" >
        <Typography component="h1" variant="h2" align='center'>
          My Advertisement
        </Typography>
        <Button variant='contained' color='primary' className={classes.buttonAdd}>Post new Advertisement</Button>
      </Container>
      <Container maxWidth="md" >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              image={'https://source.unsplash.com/random'}
              title="Product X"
              subtitle='$ 60,00'
              actions={
                <>
                  <Button size='small' color='primary'>
                    Edit
                  </Button>
                  <Button size='small' color='danger'>
                    Remove
                  </Button>
                </>
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              image={'https://source.unsplash.com/random'}
              title="Product Z"
              subtitle='$ 80,00'
              actions={
                <>
                  <Button size='small' color='primary'>
                    Edit
                  </Button>
                  <Button size='small' color='danger'>
                    Remove
                  </Button>
                </>
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              image={'https://source.unsplash.com/random'}
              title="Product Y"
              subtitle='$ 40,00'
              actions={
                <>
                  <Button size='small' color='primary'>
                    Edit
                  </Button>
                  <Button size='small' color='danger'>
                    Remove
                  </Button>
                </>
              }
            />
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

Home.requiresAuth = true


export default Home