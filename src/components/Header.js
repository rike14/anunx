import * as React from 'react';
import { 
  Button, 
  Toolbar,
  AppBar,
  IconButton,
  Typography,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@mui/icons-material/Menu'
import theme from '../theme';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <AppBar position="static"   style={{backgroundColor: theme.palette.primary.main}}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" className={classes.title}>
            AnunX
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}