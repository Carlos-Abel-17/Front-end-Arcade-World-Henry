import React, { useEffect} from 'react'
import {Card,Box, CardContent,Typography }from '@mui/material'
import { getGames,GetUser } from '../../redux/actions'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import { useDispatch, useSelector } from 'react-redux'
import GraficoViewMain from './GraficoViewMain';

function ViewMain() {
    const dispatch=useDispatch()
    const game = useSelector((G)=>G?.games)
    const user = useSelector((U)=>U?.user)
    console.log(user)
    const purchase = useSelector((P)=>P?.Purchase)
 
    
    useEffect(()=>{
        dispatch(getGames())
        dispatch(GetUser())
       },[])
       const UserLength = user.length
       const GamesLength = game.length
       const PurchaseLength=purchase.length
 
    const cardStyle = {
    width: '15em',
    height:'10em', 
    backgroundColor: '#37474f',
     color: 'white' ,
     display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
    margin:'1em 0em 1em 0em ',

  }
  const BoxCard={
    display:'flex',
    width:'100%',
    flexWrap:'wrap',
    justifyContent:'space-evenly',
  }
    const estiloBox = {
      backdropFilter: 'blur(1px)', 
      borderRadius: '100%', 
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding:'1em' // Fondo semitransparente
 
    };
   const BoxMain={
    display:'flex',
    alignItems: 'center',
    flexDirection:'column',
   }

   const BoxGraphis={
    display:'flex',
    width:'100%',
    justifyContent:'space-evenly',
    paadding:'0px'
   }
  return (
    <Box bgcolor='#546e7a' style={BoxMain} gap={2}>
    <Box  style={BoxCard} >
     {/*  //?Card Games ↓*/} 
     <Box >
      <Card style={cardStyle} >
        <CardContent>
        <Box style={estiloBox} >
            <SportsEsportsIcon sx={{ fontSize: 30 }} />
        </Box>
          <Typography variant='h6'>
          {GamesLength}
                    </Typography>
            <Typography variant='p' component={'p'} color={'#cfd8dc'}>
               Total Games
            </Typography>
                </CardContent>
            </Card>
        </Box>
          {/*  //?Card Usuers ↓*/} 
        <Box >
      <Card style={cardStyle} >
        <CardContent>
        <Box style={estiloBox} >
            <PersonIcon sx={{ fontSize: 30}}/>
        </Box>
          <Typography variant='h6'>
          {UserLength}
                    </Typography>
            <Typography variant='p' component={'p'} color={'#cfd8dc'}>
                Total Users
            </Typography>
                </CardContent>
            </Card>
        </Box>
                  {/*  //?Card Buys ↓*/} 
        <Box >
      <Card style={cardStyle} >
        <CardContent>
        <Box style={estiloBox} >
            <LocalMallSharpIcon sx={{ fontSize: 30}}/>
        </Box>
          <Typography variant='h6'>
          {PurchaseLength}
                    </Typography>
            <Typography variant='p' component={'p'} color={'#cfd8dc'}>
                Total Buys
            </Typography>
                </CardContent>
            </Card>
        </Box>
          {/*  //?Card Eyes ↓*/} 
        <Box >
      <Card style={cardStyle} >
        <CardContent>
        <Box style={estiloBox} >
            <VisibilityIcon sx={{ fontSize: 30}}/>
        </Box>
        <Box>
          <Typography variant='h6'>
        0
                    </Typography>
            <Typography variant='p' component={'p'} color={'#cfd8dc'}>
            Total Login
            </Typography>
        </Box>
                </CardContent>
            </Card>
        </Box>
    </Box>
    <Box style={BoxGraphis}> 
          <GraficoViewMain />
    </Box>
    </Box>
  )
}

export default ViewMain