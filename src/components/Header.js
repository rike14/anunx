import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    display: 'flex,',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',

  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  headerButton: {
    marginRight: theme.spacing(2),
    "@media (max-width: 520px)": {
      display: 'none',
    }
  },
  buttonSignup: {
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
  const {data: session} = useSession();
  const [anchorUserMenu, setAnchorUserMenu] = useState(false);
  const classes = useStyles();
  const openUserMenu = Boolean(anchorUserMenu);
  
  return (
    <>
      <AppBar position="static"  elevation={3}>
        <Container maxWidth="lg">
          <Toolbar className={classes.menuButton}>
            <Container maxWidth="lg">

            <Link href="/" passHref className={classes.link}>
              <Typography variant="h6" component="div" className={classes.title}>
                AnunX
              </Typography>
            </Link>
            </Container>
            <Container maxWidth="lg" className={classes.menuContainer}>

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
                      session.user?.image ? 
                      <Avatar src={session.user.image}/>
                      : <AccountCircle />
                    }
                    <Typography className={classes.userName} variant='subtitle2' color='secondary'>
                     {session.user?.name ?? ''}
                    </Typography>
                  </IconButton>
              ) : <Link href={'/auth/signup'} passHref className={classes.link}>
                <Button color="inherit" variant='outlined' className={classes.buttonSignup}>
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
            </Container>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}