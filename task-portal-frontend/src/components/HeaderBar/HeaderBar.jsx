import { useState, useContext } from 'react';

import { AuthContext } from 'context/authContext'

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import Authentication from 'containers/Authentication/Authentication'

const HeaderBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isLogged, username, logout: _logout } = useContext(AuthContext)

  const logout = () => {
    _logout()
    handleCloseUserMenu()
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Authentication isOpen={open} onClose={handleClose} />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocationCityIcon sx={{ mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ETC Latam
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ flexGrow: 0 }}>
          <Typography
            variant="h6"
            noWrap
            onClick={handleOpen}
            component="a"
            sx={{
              mr: 2,
              fontWeight: 400,
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            {isLogged ? username : 'Sign in'}
          </Typography>
          {isLogged &&
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={username} />
              </IconButton>
            </Tooltip>
          }
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HeaderBar