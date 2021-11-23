import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink} from "react-router-dom";

export const HomeNav = () => {
    return (
        <AppBar sx={{background:'#2a2438'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Evapp
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
              Home
          </Button>
          <Button color="inherit" component={RouterLink} to="about">About</Button>
          <Button color="inherit" component={RouterLink} to="login">Login</Button>
        </Toolbar>
      </AppBar>
    )
}
