import React from 'react'
import { BottomNavigation, Typography, Stack } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import CopyrightIcon from '@mui/icons-material/Copyright';
import FavoriteIcon from '@mui/icons-material/Favorite';


const Footer = () => {
    return ( 
       <BottomNavigation sx={{display:'flex', justifyContent:'space-between', paddingTop:'25px', backgroundColor:'#0B131A', width: '100%', minHeight: '6vh'}}>
          <Typography variant='overline' color='white' sx={{marginLeft:'20px'}}><CopyrightIcon sx={{marginRight:'10px', marginTop:'2px'}}/>All Rights reserved</Typography>
          <Typography variant='overline' color='white'>With <FavoriteIcon/> Alumnos Henry</Typography>
          <Stack sx={{display:'flex', justifyContent:'space-between', flexDirection:'row', marginRight:'20px'}}>
          <Typography variant='overline' color='white' sx={{marginRight:'20px'}}><LinkedInIcon/></Typography>
          <Typography variant='overline' color='white' sx={{marginRight:'20px'}}><InstagramIcon/></Typography>
          <Typography variant='overline' color='white' sx={{marginRight:'20px'}}><FacebookIcon/></Typography>
          <Typography variant='overline' color='white' sx={{marginRight:'20px'}}><TwitterIcon/></Typography>
        </Stack>
       </BottomNavigation>
     );
}
 
export default Footer;