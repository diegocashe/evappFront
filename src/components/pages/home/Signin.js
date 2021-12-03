import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import Box from '@mui/system/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import img1 from '../../../static/signinImg1.jpg';
import img2 from '../../../static/signinImg2.jpg';
import img3 from '../../../static/signinImg3.jpg';
import img4 from '../../../static/signinImg4.jpg';
import img5 from '../../../static/signinImg5.jpg';
import img6 from '../../../static/signinImg6.jpg';
import img7 from '../../../static/signinImg7.jpg';
import { useUser } from '../../../Hooks/useUser';
import { UserContext } from '../../../Context/UserContext';
import { signIn } from '../../../request/auth';

const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i

export const Signin = ({ setAlert }) => {

    const user = useUser()

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 0,
    });

    const imgs = [img1, img2, img3, img4, img5, img6, img7]
 
    const handleOnChange = async (e) => {
        setUserData({ ...userData, [(e.target.id || e.target.name)]: e.target.value })
    }

    const handleOnSubmit = async (e, setUser) => {
        try {
            if (userData.firstName === '') throw new Error('Ingrese su nombre');
            if (userData.lastName === '') throw new Error('Ingrese su apellido');
            if (!emailRegex.test(userData.email)) throw new Error('Correo invalido');
            if (!passwordRegex.test(userData.password)) throw new Error('Contraseña inválida')
            if (userData.password !== userData.confirmPassword) throw new Error('Las contraseñas no concuerdan')
            const responce = await signIn({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
                userType: userData.userType
            });
            const userAuthData = (await responce.json()).user;
            setUser({ ...user, user: { ...userAuthData } });
            setAlert('funcionó', 'success');
        } catch (e) {
            setAlert('Hubo un problema: ' + e.message, 'error')
        }
    }

    if (!user.user.state) {
        return (
            <Stack alignItems="center" justifyContent="center" sx={{ height: '93.5%', width: '100%' }}>
                <Stack direction='row' sx={{
                    height: '90%', width: '90%',
                    bgcolor: '#dbd8e3',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    position: 'relative'
                }}>
                    <Box sx={{
                        overflow: 'hidden',
                        background: 'url(' + imgs[Math.floor(Math.random() * (7 - 1) + 1)] + ') no-repeat center center',
                        display: { xs: 'none', sm: 'block' },
                        height: '100%',
                        width: { sm: '40%', md: '60%', lg: '90%' },
                        backgroundSize: 'cover'

                    }} />
                    <Stack sx={{ p: '1em', width: '100%' }} alignItems={{ xs: 'unset', sm: "center" }} justifyContent="center">
                        <Stack spacing={2} sx={{ overflow: 'auto', p: '1em' }} >
                            <Typography variant="h4" sx={{ width: '100%' }}>Crea una cuenta</Typography>
                            <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} sx={{ width: '100%' }} >
                                <Stack spacing={1} sx={{ width: { xs: '100%', sm: '50%' } }} >
                                    <Typography variant='h7'>Nombre</Typography>
                                    <TextField
                                        error={!(typeof userData.firstName === 'string')}
                                        required
                                        fullWidth
                                        onChange={handleOnChange}
                                        id="firstName"
                                        label="Nombre"
                                        variant="outlined" />
                                </Stack>
                                <Stack spacing={1} sx={{ width: { xs: '100%', sm: '50%' } }} >
                                    <Typography variant='h7'>Apellido</Typography>
                                    <TextField
                                        error={!(typeof userData.firstName === 'string')}
                                        required
                                        fullWidth
                                        onChange={handleOnChange}
                                        id="lastName"
                                        label="Apellido"
                                        variant="outlined" />
                                </Stack>
                            </Stack>
                            <Stack spacing={1} >
                                <Typography variant='h7'>Correo</Typography>
                                <TextField
                                    error={!emailRegex.test(userData.email)}
                                    helperText={(!emailRegex.test(userData.email)) ? 'Ingrese un correo válido' : ''}
                                    required
                                    fullWidth
                                    onChange={handleOnChange}
                                    type='email'
                                    id="email"
                                    label="Correo"
                                    variant="outlined" />
                            </Stack>
                            <Stack spacing={1} >
                                <Typography variant='h7'>Password</Typography>
                                <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} >
                                    <TextField
                                        error={!passwordRegex.test(userData.password) && userData.password !== ''}
                                        helperText={(!passwordRegex.test(userData.password)) ? 'Mínimo ocho caracteres, al menos una letra, un número y un carácter especial' : ''}
                                        required
                                        fullWidth
                                        type='password'
                                        onChange={handleOnChange}
                                        id="password"
                                        label="Contraseña"
                                        variant="outlined" />
                                    <TextField
                                        error={!(userData.password === userData.confirmPassword || userData.password === '')}
                                        helperText={(!(userData.password === userData.confirmPassword)) ? 'Las contraseñas no concuerdan' : ''}
                                        required
                                        fullWidth
                                        type='password'
                                        onChange={handleOnChange}
                                        id="confirmPassword"
                                        label="Confirmar contraseña"
                                        variant="outlined" />
                                </Stack>
                            </Stack>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Ocupación</FormLabel>
                                <RadioGroup onChange={handleOnChange} row aria-label="Ocupación" name="userType" id="userType">
                                    <FormControlLabel value="0" control={<Radio />} label="Profesor"/>
                                    <FormControlLabel value="1" control={<Radio />} label="Estudiante" />
                                </RadioGroup>
                            </FormControl>
                            <UserContext.Consumer>
                                {({ user, setUser }) =>
                                    <Button onClick={(e) => handleOnSubmit(e, setUser)}
                                        variant="contained" sx={{ width: '100%', background: '#352f44' }}>Registrate</Button>
                                }
                            </UserContext.Consumer>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        )
    }

    if (user.user.state) {
        return (<Navigate to='/panel' />)
    }
}
