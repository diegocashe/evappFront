import React from 'react'
import Error404 from '../../static/404Error.svg'
// material ui
import { Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box';

export const NotFound = () => {
    return (
        <Stack  spacing={3} direction='column' justifyContent='center' alignItems='center' sx={{padding:'1em', height:'93.5%'}}>
             <Box
                    component="img"
                    alt="Profesor"
                    src={Error404}
                    sx={{
                        minWidth: 80,
                        width: { xs: '60%',sm:'40%', md:'30%' },
                    }}
                />
            <Typography variant='h2' sx={{color:'white', textAlign:'center', fontWeight:600}}>Error 404</Typography>
            <Typography variant='h4' sx={{color:'white', textAlign:'center'}}>No se ha encontrado lo que buscas 🤒</Typography>
        </Stack>
    )
}