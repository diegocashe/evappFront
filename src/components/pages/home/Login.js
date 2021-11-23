import React, { useState } from 'react'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoginImg from '../../../static/login.svg'
import { UserContext } from '../../../Context/UserContext';
import { Link as RouterLink, Navigate } from "react-router-dom";
import { useUser } from '../../../Hooks/useUser';
import { auth } from '../../../request/auth';

//redireccionar al logear blouear las rutas signin y login al estar loggeado 

export default function Login({ setAlert }) {

    const [userLogData, setUserLogData] = useState({ email: '', password: '' })
    const user = useUser()

    const handleOnChange = (event) => {
        if (event.target.id === 'email') setUserLogData({ ...userLogData, email: event.target.value })
        if (event.target.id === 'password') setUserLogData({ ...userLogData, password: event.target.value })
    }

    const handleOnSubmit = async (e, setUser) => {
        e.preventDefault()
        try {
            const responce = await auth(userLogData)
            setAlert('Bienvenido Usuario', 'success')
            const resData = await responce.json();
            setUser({
                ...user,
                user: {...resData}
            });
        } catch (e) {
            setAlert('Ups error: ' + e.message, 'error')
        }
    }
    if (!user.user.state) {
        return (
            <Stack direction='row' alignItems="center" justifyContent="center" sx={{ height: '93.5%', width: '100%', paddingX: '1em', paddingY: '2em' }}>

                <Box component='img' sx={{ display: { xs: 'none', sm: 'flex' }, width: '50%', maxHeight: '90%' }} alt='Login' src={LoginImg} />
                <form>
                    <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}
                        sx={{
                            bgcolor: '#dbd8e3',
                            overflow: 'hidden',
                            borderRadius: '12px',
                            padding: '1.8em',
                            boxShadow: 1
                        }}
                    >

                        <Box sx={{ fontWeight: 300, fontStretch: 'semi-condensed', fontSize: '0.7em' }}>Bienvenido de nuevo</Box>
                        <Box sx={{ fontWeight: 600, fontStretch: 'normal', fontSize: '1.4em', }}>Ingresa en tu cuenta</Box>
                        <Box sx={{ fontWeight: 300, fontStretch: 'semi-condensed', fontSize: '1em' }}>Correo</Box>
                        <TextField onChange={handleOnChange} id="email" label="Correo" variant="outlined" />
                        <Box sx={{ fontWeight: 300, fontStretch: 'semi-condensed', fontSize: '1em' }}>Contraseña</Box>
                        <TextField onChange={handleOnChange} id="password" type='password' label="Contraseña" variant="outlined" />
                        <FormGroup>
                            <FormControlLabel control={<Switch size="small" />} label="Recuerdame" />
                        </FormGroup>
                        <UserContext.Consumer>
                            {({ user, setUser }) =>
                                <Button onClick={(e) => handleOnSubmit(e, setUser)}
                                    variant="contained" sx={{ width: '100%', background: '#352f44' }}>Ingresa</Button>
                            }
                        </UserContext.Consumer>
                        <Button variant="outlined" sx={{ width: '100%', color: '#352f44', borderColor: '#352f44' }} component={RouterLink} to='/signin'>Registrate</Button>
                    </Stack>
                </form>
            </Stack>
        )
    };

    if (user.user.state) {
        return <Navigate to='/panel' />
    }
}
