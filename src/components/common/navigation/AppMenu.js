import React from 'react'
import PropTypes from 'prop-types';
import { Link as RouterLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { UserContext, defaultContext } from '../../../Context/UserContext';

//material components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//icons
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import { useUser } from '../../../Hooks/useUser';

const drawerWidth = 240;

export const AppMenu = (props) => {

  //hooks
  const navigate = useNavigate();
  const user = useUser()
  const [mobileOpen, setMobileOpen] = React.useState(false);

  //props
  const { window, menuData } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  //Events Handlers
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOnLogOut = (e, setUser) => {
    e.preventDefault();
    if (true) {
      navigate('/login')
      setUser({ ...defaultContext })
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuData.map(({ name = 'profile', icon = LogoutIcon, to = 'profile' }, index) => (
          <ListItem button key={name} component={RouterLink} to={to}>
            <ListItemIcon sx={{ '& svg': { color: '#dbd8e3' } }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  if (user.user.state) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: '#2a2438'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: 'none' } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {props.title}
            </Typography>

            <UserContext.Consumer>
              {({ user, setUser }) => <IconButton
                color="inherit"
                aria-label="Logout"
                edge="start"
                onClick={(e) => { handleOnLogOut(e, setUser) }}
              >
                <LogoutIcon />
              </IconButton>}
            </ UserContext.Consumer>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, background: '#2a2438' }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: '#2a2438', color: 'white' },

            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            color='primary'
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: '#2a2438', color: 'white' },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Outlet />
        </Box>
      </Box>
    );
  }
  if (!user.user.state) {
    return <Navigate to='/login' />
  }
}

// export const AppMenu = (props) => {

//   const menuItems = props.menuData;
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <List>
//         {menuItems.map(({ name='profile', icon= LogoutIcon, to='profile'}, index) => (
//           <ListItem button key={name} component={RouterLink} to={to}>
//             <ListItemIcon sx={{'& svg': {color: '#dbd8e3'}}}>
//               {icon}
//             </ListItemIcon>
//             <ListItemText primary={name} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//     </div>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//           background:'#2a2438'
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//             Panel para profesores
//           </Typography>
//           <IconButton
//             color="inherit"
//             aria-label="Logout"
//             edge="start"
//           >
//             <LogoutIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, background:'#2a2438' }}
//         aria-label="mailbox folders"
//       >
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background:'#2a2438', color:'white'  },

//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           color='primary'
//           sx={{
//             display: { xs: 'none', sm: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background:'#2a2438', color:'white' },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
//       >
//         <Outlet/>
//       </Box>
//     </Box>
//   );
// }

AppMenu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

