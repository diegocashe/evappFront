import React, { useState } from 'react'
import { useUser } from '../../Hooks/useUser'

import { Stack, Typography, Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import PersonIcon from '@mui/icons-material/Person';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


import { UserContext } from '../../Context/UserContext';
import { putUser } from '../../request/profile';

const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i
const ciRegex = /^[V|E|J|P][0-9]{5,9}$/i
const sr = 'Sin registros'

export const Profile = ({ setAlert }) => {

    const user = useUser().user
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState({ ...user })

    const formatDate = (date = '') => {
        const d = new Date(date);
        return (d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear())
    }

    const handleClickOpen = () => { setOpen(true); };

    const handleClose = () => { setOpen(false); };

    const handleOnChange = async (e) => { setUserData({ ...userData, [(e.target.id || e.target.name)]: e.target.value }) }

    const handleOnSubmit = async (e, setUser) => {
        const u = user, ud = userData, acc = {};

        for (const key in ud) {
            if (Object.hasOwnProperty.call(ud, key)) {
                if (u[key] !== ud[key]) { acc[key] = ud[key] }
            }
        }

        if (ud.newPassword === ud.confirmNewPassword) { acc.password = ud.newPassword }
        if (u.birthday !== ud.birthday) { acc.birthday = new Date(ud.birthday) }

        acc.id = ud.id;
        try {
            const responce = await putUser(acc);
            const body = await responce.json();
            if (responce.status !== 200) throw new Error('Problema en la solicitud, intente mas tarde')
            // console.log(body)
            setAlert('Actualizado con éxito', 'success')
            setUser({ ...user, user: { ...user, ...body } })
        } catch (error) {
            // console.log(error)
            setAlert('Ups error: ' + e.message, 'error')
        }
        setOpen(false);
    }
    const dialog = (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='md'>
            <DialogTitle>Modificar datos</DialogTitle>
            <DialogContent>
                <Grid container spacing={1} p='1em'>
                    <Grid container item xs={12} sm={6} >
                        <Typography variant='h7' my={1}>Nombre</Typography>
                        <TextField
                            error={!(typeof userData.firstName === 'string')}
                            required
                            fullWidth
                            onChange={handleOnChange}
                            id="firstName"
                            label="Nombre"
                            variant="outlined"
                            defaultValue={userData.firstName} />
                    </Grid>
                    <Grid container item xs={12} sm={6} >
                        <Typography variant='h7' my={1}>Apellido</Typography>
                        <TextField
                            error={!(typeof userData.firstName === 'string')}
                            required
                            fullWidth
                            onChange={handleOnChange}
                            id="lastName"
                            label="Apellido"
                            variant="outlined"
                            defaultValue={userData.lastName} />
                    </Grid>
                    <Grid container item xs={12} sm={6} >
                        <Typography variant='h7' my={1}>Correo</Typography>
                        <TextField
                            error={!emailRegex.test(userData.email)}
                            helperText={(!emailRegex.test(userData.email)) ? 'Ingrese un correo válido' : 'formato: nombre@dominio'}
                            required
                            fullWidth
                            onChange={handleOnChange}
                            type='email'
                            id="email"
                            label="Correo"
                            variant="outlined"
                            defaultValue={userData.email} />
                    </Grid>
                    <Grid container item xs={12} sm={6} >
                        <Typography variant='h7' my={1}>Cédula de identidad</Typography>
                        <TextField
                            error={!ciRegex.test(userData.ci) && (userData.ci != null || '')}
                            helperText={'formato de cedula "V12345678"'}
                            required
                            fullWidth
                            onChange={handleOnChange}
                            id="ci"
                            label="Cédula de identidad"
                            variant="outlined"
                            defaultValue={userData.ci} />
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                        <Grid item xs={12}><Typography variant='h7'>Cambiar contraseña</Typography></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={(!passwordRegex.test(userData.newPassword) && userData.newPassword !== '')}
                                helperText={(!passwordRegex.test(userData.newPassword)) ? 'Mínimo ocho caracteres, al menos una letra, un número y un carácter especial' : ''}
                                required
                                fullWidth
                                type='password'
                                onChange={handleOnChange}
                                id="newPassword"
                                label="Contraseña"
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={!(userData.newPassword === userData.confirmPassword || userData.newPassword === '')}
                                helperText={(!(userData.newPassword === userData.confirmPassword)) ? 'Las contraseñas no concuerdan' : ''}
                                required
                                fullWidth
                                type='password'
                                onChange={handleOnChange}
                                id="confirmPassword"
                                label="Confirmar contraseña"
                                variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={6} >
                        <Typography variant='h7' my={1}>Nacimiento</Typography>
                        <TextField
                            error={!(typeof userData.firstName === 'string')}
                            helperText={'día/mes/año'}
                            required
                            fullWidth
                            onChange={handleOnChange}
                            id="birthday"
                            type='date'
                            label="Fecha de nacimiento"
                            variant="outlined" />
                    </Grid>
                    <Grid container item xs={12} sm={6} >
                        <Typography variant='h7' my={1}>Teléfono</Typography>
                        <TextField
                            error={!(typeof userData.firstName === 'string')}
                            helperText={'0123-4567890'}
                            required
                            fullWidth
                            onChange={handleOnChange}
                            id="phone"
                            label="Telefono Fijo"
                            variant="outlined" />
                    </Grid>
                    <Grid container item xs={12} sm={6} >
                        <Typography variant='h7' my={1}>Celular</Typography>
                        <TextField
                            error={!(typeof userData.firstName === 'string')}
                            required
                            fullWidth
                            onChange={handleOnChange}
                            id="mobile"
                            label="Telefono Celular"
                            variant="outlined" />
                    </Grid>
                    <Grid container item xs={12} sm={6} >
                        <Typography variant='h7' my={1}>Dirección</Typography>
                        <TextField
                            error={!(typeof userData.firstName === 'string')}
                            required
                            fullWidth
                            onChange={handleOnChange}
                            id="address"
                            label="Dirección"
                            variant="outlined" />
                    </Grid>
                    <Grid container item xs={12} sm={6} >
                        <Typography variant='h7' my={1}>Ciudad</Typography>
                        <TextField
                            error={!(typeof userData.firstName === 'string')}
                            required
                            fullWidth
                            onChange={handleOnChange}
                            id="city"
                            label="Ciudad"
                            variant="outlined" />
                    </Grid>
                    <Grid container item xs={12} sm={6} >
                        <Typography variant='h7' my={1}>Pais</Typography>
                        <TextField
                            error={!(typeof userData.firstName === 'string')}
                            required
                            fullWidth
                            onChange={handleOnChange}
                            id="country"
                            label="Pais"
                            variant="outlined" />
                    </Grid>
                    <Grid container item xs={12} sm={6} >

                        <Typography variant='h7' my={1}>Código postal</Typography>
                        <TextField
                            error={!(typeof userData.firstName === 'string')}
                            required
                            fullWidth
                            onChange={handleOnChange}
                            id="zip"
                            label="Código postal"
                            variant="outlined" />
                    </Grid>
                    <Grid container item xs={12} sm={6} >

                        <Typography variant='h7' my={1}>Pasaporte</Typography>
                        <TextField
                            error={!(typeof userData.firstName === 'string')}
                            required
                            fullWidth
                            onChange={handleOnChange}
                            id="passport"
                            label="Pasaporte"
                            variant="outlined" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <UserContext.Consumer>
                    {({ user, setUser }) =>
                        <Button onClick={(e) => handleOnSubmit(e, setUser)} >Actualizar</Button>
                    }
                </UserContext.Consumer>
            </DialogActions>
        </Dialog>
    )

    return (
        <Stack spacing={2} alignItems='flex-start'>
            {dialog}
            <Typography color={'#dbd8e3'} variant="h4">Perfil</Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <Card sx={{ background: '#dbd8e3', width: { xs: '100%', md: '30%', lg: '25%' } }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {(user.userType === 0) ? 'Profesor' : 'Alumno'}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {user.firstName + ' ' + user.lastName}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <Rating name="read-only" value={user.rate} readOnly />
                        </Typography>
                        <Typography variant="body2">
                            {user.description || 'una pequeña descripción'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => handleClickOpen()} >Editar usuario</Button>
                    </CardActions>
                </Card>
                <Card sx={{ background: '#dbd8e3', width: { xs: '100%', md: '70%', lg: '75%' } }}>
                    <CardContent>
                        <Stack direction='row' alignItems='center' spacing={0.5}>
                            <PersonIcon />
                            <Typography variant='h6'>Info</Typography>
                        </Stack>

                        <Grid container spacing={0.5}>

                            <Grid item xs={6} md={3} lg={2}><Typography color="text.secondary">Nombre:</Typography> </Grid>
                            <Grid item xs={6} md={3} lg={2}>{user.firstName}</Grid>

                            <Grid item xs={6} md={3} lg={2}><Typography color="text.secondary">Apellido:</Typography></Grid>
                            <Grid item xs={6} md={3} lg={2}>{user.lastName}</Grid>

                            <Grid item xs={6} md={3} lg={2}><Typography color="text.secondary">Estado:</Typography></Grid>
                            <Grid item xs={6} md={3} lg={2}>{(user.state) ? 'Activo' : 'Inactivo'}</Grid>

                            <Grid item xs={6} md={3} lg={2}><Typography color="text.secondary">Tipo de usuario:</Typography></Grid>
                            <Grid item xs={6} md={3} lg={2}>{(user.userType === 0 || '0') ? 'profesor' : 'Alumno'}</Grid>

                            <Grid item xs={6} md={3} lg={2}><Typography color="text.secondary">Teléfono:</Typography></Grid>
                            <Grid item xs={6} md={3} lg={2}>{(user.phone) ? user.phone : sr}</Grid>

                            <Grid item xs={6} md={3} lg={2}><Typography color="text.secondary">Celular:</Typography></Grid>
                            <Grid item xs={6} md={3} lg={2}>{(user.mobile) ? user.mobile : sr}</Grid>

                            <Grid item xs={6} md={3} lg={2}><Typography color="text.secondary">Dirección:</Typography></Grid>
                            <Grid item xs={6} md={3} lg={2}>{(user.address) ? user.address : sr}</Grid>

                            <Grid item xs={6} md={3} lg={2}><Typography color="text.secondary">Ciudad:</Typography></Grid>
                            <Grid item xs={6} md={3} lg={2}>{(user.city) ? user.city : sr}</Grid>

                            <Grid item xs={6} md={3} lg={2}><Typography color="text.secondary">Pais:</Typography></Grid>
                            <Grid item xs={6} md={3} lg={2}>{(user.country) ? user.country : sr}</Grid>

                            <Grid item xs={6} md={3} lg={2}><Typography color="text.secondary">Código Postal:</Typography></Grid>
                            <Grid item xs={6} md={3} lg={2}>{(user.zip) ? user.zip : sr}</Grid>

                            <Grid item xs={6} md={3} lg={2}><Typography color="text.secondary">Fecha de Nacimiento:</Typography></Grid>
                            <Grid item xs={6} md={3} lg={2}>{(user.birthday) ? (formatDate(user.birthday)) : sr}</Grid>

                            <Grid item xs={6} md={3} lg={2}><Typography color="text.secondary">Pasaporte:</Typography></Grid>
                            <Grid item xs={6} md={3} lg={2}>{(user.passport) ? user.passport : sr}</Grid>

                            <Grid item xs={6} md={3} lg={2}><Typography color="text.secondary">CI:</Typography></Grid>
                            <Grid item xs={6} md={3} lg={2}>{(user.ci) ? user.ci : sr}</Grid>

                        </Grid>

                    </CardContent>
                    <CardActions>
                        <Typography variant="body2">Complete su perfil en el boton editar </Typography>
                    </CardActions>
                </Card>
            </Stack>
        </Stack>
    )
}
