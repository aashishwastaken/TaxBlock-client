import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../utils/authSlice';
import { Add } from '@material-ui/icons';
import { Button } from '@material-ui/core';



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

export default function MenuAppBar() {
  const loggedin = useSelector(state => state.auth.user)
  let dispatch = useDispatch();
  let history = useHistory();

  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);

  useEffect(() => {
    if (loggedin) {
      setAuth(true);
    }
  }, [auth, loggedin]);

  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={()=>history.push('/dashboard')} color="inherit" aria-label="menu">
            <MonetizationOnIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tax Block {loggedin && ` says Welcome ${loggedin.name}`}
          </Typography>
          {auth && (
            <div>
              <Button
                variant="outlined"
                size="medium"
                style={{ color: 'white', border: '2px solid white', margin:'1em'}}
                onClick={() => history.push('/newloan')}
                startIcon={<Add />}
              >
                New Loan
            </Button>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  dispatch(logout());
                  setAuth(false);
                  setAnchorEl(false);
                  history.push('/login');
                }}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
