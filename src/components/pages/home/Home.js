import React from 'react'
import Box from '@mui/material/Box';
import profesorIMG from '../../../static/undraw_professor_-8-lrt.svg';
import { Link as RouterLink } from "react-router-dom";
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

export default function Home() {
    return (
        <Box sx={{ height: '93.5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    bgcolor: '#dbd8e3',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: '2.5em',
                    alignItems: 'center',
                    alignContent: 'space-between',
                    boxShadow: 1,
                    width: { xs: '80%', md: '70%' },
                }}
            >
                <Box
                    component="img"
                    alt="Profesor"
                    src={profesorIMG}
                    sx={{
                        minWidth: 80,
                        width: { xs: '100%', sm: '50%', md: '65%' },
                        marginLeft: { xs: 'auto', sm: '0' },
                        marginRight: { xs: 'auto', sm: '2.5rem' },
                        marginBottom: { xs: '1.5rem', sm: 'auto' }
                    }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ fontSize: { xs: '1.05em', sm: '1.3em', md: '1.65em', lg: '2em' }, fontWeight: 500 }}>
                        Aprende ASP.net de la manera más sencilla con los mejores profesores
                    </Box>

                    <Box sx={{ fontSize: { xs: '1em', sm: '1.2em', md: '1.4em', lg: '1.6em' }, fontStretch: 'extra-condensed', fontWeight: 300 }} >
                        <RouterLink to='signin' >Registrate</RouterLink> y aprende ahora mismo
                    </Box>
                </Box>
            </ Box>

            <section>
                <Box sx={{
                    fontFamily: 'sans-serif',
                    fontWeight: 400,
                    width: '80%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: '#dbd8e3',
                    fontSize: { xs: '0.9em', sm: '1.1em', md: '1.4em' }
                }}>
                    <span>Evapp esta diseñada para jóvenes y adultos con la sencillez necesaria para facilitar tu aprendizaje.</span>
                    <Divider sx={{ background: '#dbd8e3' }} />
                    <Link component={RouterLink} to='login' underline="always" sx={
                        { color: '#fff', fontSize: '1.5em' }}>
                        Comienza aquí</Link>
                </Box>
            </section>
        </Box>
    )
}
