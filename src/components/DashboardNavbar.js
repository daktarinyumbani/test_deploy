import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Logo from './Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo width="120px" />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton color="inherit" onClick={() => navigate('/app/settings')}>
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <AccountCircleIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => {
              logout();
            }}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
