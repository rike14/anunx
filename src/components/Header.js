import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/client';
import { 
  Button, 
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  headerButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  linkMenu: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  userName: {
    marginLeft: 6,
  },
  divider: {
    margin: theme.spacing(1, 0),
  }
}));

export default function ButtonAppBar() {
  const [session, loading] = useSession();
  const [anchorUserMenu, setAnchorUserMenu] = useState(false);
  const classes = useStyles();

  const openUserMenu = Boolean(anchorUserMenu);
  
  return (
    <>
      <AppBar position="static"  elevation={3}>
        <Container maxWidth="lg">
          <Toolbar>
            <Link href="/" passHref className={classes.link}>
              <Typography variant="h6" component="div" className={classes.title}>
                AnunX
              </Typography>
            </Link>
            <Link href={ session ? '/user/publish' : '/auth/signin' } passHref className={classes.link}>
            <Button color="inherit" variant='outlined' className={classes.headerButton}>
              Advertise and Sell
            </Button>
            </Link>
            {
              session 
                ? (
                  <IconButton color='secondary' onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
                    {
                      session.user.image ? 
                      <Avatar src={session.user.image}/>
                      : <AccountCircle />
                    }
                    <Typography className={classes.userName} variant='subtitle2' color='secondary'>
                     {session.user.name}
                    </Typography>
                  </IconButton>
              ) : <Link href={'/auth/signup'} passHref className={classes.link}>
                <Button color="inherit" variant='outlined' className={classes.headerButton}>
                  Signup
                </Button>
              </Link>
            }
            <Menu
              anchorEl={anchorUserMenu}
              open={openUserMenu}
              onClose={() => setAnchorUserMenu(null)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Link href="/user/dashboard" passHref className={classes.linkMenu}>
                <MenuItem>My Advertisement</MenuItem>
              </Link>
              <Link href="/user/publish" passHref className={classes.linkMenu}>
                <MenuItem>Post new Advertisement</MenuItem>
              </Link>
              <Divider  className={classes.divider}/>
              <MenuItem onClick={() => signOut({ callbackUrl: '/' })} >Logout</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}