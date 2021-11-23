import { Box } from '@mui/system'
import React from 'react'
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function SmallFooter() {
    return (
        <Box 
            sx={{
                height:'6.5%', 
                background:'#2a2438',
                display:'flex',
                width:'100%',
                justifyContent:'center',
                alignItems:'center',
                color:'#dbd8e3',
                paddingLeft:'1em',
                paddingRight:'1em',
        }}>
                <IconButton size='small' href='https://github.com/diegocashe' target='_blank'> 
                   <GitHubIcon sx={{ color: '#dbd8e3' }}/>
                </IconButton>   
                <IconButton size='small' href='https://github.com/diegocashe' target='_blank'> 
                   <InstagramIcon sx={{ color: '#dbd8e3' }}/>
                </IconButton>   
                <IconButton size='small' href='https://github.com/diegocashe' target='_blank'> 
                   <FacebookIcon sx={{ color: '#dbd8e3' }}/>
                </IconButton>   
                <IconButton size='small' href='https://github.com/diegocashe' target='_blank'> 
                   <LinkedInIcon sx={{ color: '#dbd8e3' }}/>
                </IconButton>
        </Box>
    )
}
