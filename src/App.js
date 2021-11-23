import React from 'react'
import { HomeNav } from "./components/common/navigation/HomeNav";
import AppRoutes from "./routes/Routes";
import Box from '@mui/material/Box';
import SmallFooter from "./components/common/footer/SmallFooter";
import { UserContext, defaultContext } from "./Context/UserContext";
import { useState } from "react";
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function App() {

  const [userContext, setUser] = useState(defaultContext)
  const [snackBar, setSnackBar] = useState({message:'', isOpen:false, severity:'info'})
  // useEffect(() => {
  //   console.log(userContext)
  // }, [userContext])

  const notification = (message = '', severity='info') => {
    setSnackBar({message, isOpen:true, severity})
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackBar({...snackBar, isOpen:false})
  };


  return (
    <UserContext.Provider value={{ ...userContext, setUser: setUser }}>
      <Box sx={{ background: '#352f44' }} >
        {(userContext.user.userType === null) && <HomeNav />}

        <Box sx={{ height: '100vh', paddingTop: '64px' }} >
          {/* <SetUserContext /> */}

          <Snackbar open={snackBar.isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackBar.severity} sx={{ width: '100%' }}>
              {snackBar.message}
            </Alert>
          </Snackbar>

          <AppRoutes setAlert={notification} />

          {(userContext.user.userType === null) && <SmallFooter />}

        </Box>
        <Button onClick={() => console.log(userContext)} variant="contained" sx={{ width: '100%', background: '#352f44' }}>contexto</Button>
      </Box>
    </UserContext.Provider>
  );
}

export default App;
