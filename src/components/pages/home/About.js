import { Divider } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import dachImg from '../../../static/DiegoLinkedIn.jpg'

export default function About() {
    return (
        <Box sx={{height:'93.5%', display:'flex',flexDirection:'column', justifyContent:'center', paddingY:'2em' }}>
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
                alignItems:'center',
                alignContent:'space-between',
                boxShadow: 1,
                width: {xs:'80%', md:'70%'},
                justifyContent:'center'
            }}>
            
            <Box component="img"
                alt="diego"
                src={dachImg}
                sx={{
                    borderRadius:'100%',
                    height:{xs:'7em', sm:'8em', md:'10em'},
                    width:{xs:'7em', sm:'8em', md:'10em'}
                }}
            />
                <Divider sx={{background:'#352f44', marginLeft:'1em', marginRight:'1em', display:{xs:'none',sm:'flex'}}} orientation="vertical" flexItem variant="middle"/>
            
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ maxHeight:'4em', display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent:{xs:'center', sm:'flex-start' } }}>
                    <Box component='span' 
                        sx={{fontSize:'5em', color:"#352f44", height:'', fontWeight:'bolder'}}
                    >“</Box>

                    <Box sx={{fontSize:{xs:'1.1em',sm:'1.5em',md:'1.65em', lg:'2em' }, fontWeight:500} }>
                        Diego Castillo
                    </Box> 
                </Box>
                

                <Box sx={{
                    fontSize:{ xs:'0.7em',sm:'1.2em',md:'1.4em', lg:'1.6em'},
                    fontStretch:'extra-condensed',
                    fontWeight: {xs:400,sm:300},
                    paddingLeft: {xs:'0em', sm:'1em'},
                    paddingRight:{xs:'0em', sm:'1em'} 
                }}
                >
                    Cuasi ingeniero y amante de la programacion y automatizacion de tareas, me gusta en backend tanto como el frontend aunque no me considero fullstack ya que para mi, ser full no es solo manejar el back y el front, tambien me encanta trabajar en equipo
                </Box>
                </Box>
            </Box>
        </Box>

    )
}
