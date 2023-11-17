import React,{useState,useEffect} from 'react'
import { Box, Typography,Button } from '@mui/material'
import {useSelector ,useDispatch} from 'react-redux'
import { DataGridPro } from '@mui/x-data-grid-pro';
import { UpdateActiveVG } from '../../redux/actions';
import { VGactive } from '../../redux/actions';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

function TableGames() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(VGactive())
  },[dispatch])
  const games=useSelector((g)=>g?.gameActiveNoactive)
  const CounterNoActive=(data)=>{
  let Counter=0
  data.map((VGNo)=>{

    if(VGNo?.isActive === false){
       Counter+=1
    }
  })
  return Counter
  }
  const funcionCounterNoActive=CounterNoActive(games)

  const CounterActive=(data)=>{
    let Counter=0
    data.map((VGNo)=>{
  
      if(VGNo?.isActive){
         Counter+=1
      }
    })
    return Counter
    }
    const funcionCounterActive=CounterActive(games)
  const [chekearActive,setchekearActive]=useState({})
  const chekearActiveVG=(id,isActive)=>{
    setchekearActive((prevCheckActive)=>({
      ...prevCheckActive,
   [id]:isActive===undefined ? true : !isActive
  }))
  dispatch(UpdateActiveVG({id,isActive:isActive===undefined ? true : !isActive}))
 }
 const updateStateActive=()=>{
   const hasChangesActive=Object.values(chekearActive).some((value)=>value);
   
   if (hasChangesActive) {
     for(const id in chekearActive){
       const isActive=chekearActive[id];
       dispatch(UpdateActiveVG({id,isActive}))
      }
      setchekearActive({})
    }
  }

 const rows = games.map((G)=>{
  
    return{
        id:G.id,
        Name:G.name,
        isActive:G.isActive,
        Price:'$/'+G.price,
        Plataforms:G.platforms[0],
        Genres:G.genres[0],
        Released:G.released,
        UpdatedAt:G.updatedAt
    }
 })
 const columns = [
   { field: 'Name' },
   { field: 'Price',
   headerName: 'Price',
     renderCell: (params) => (
       <div style={{ color: 'green' }}> 
         {params.row.Price}
       </div>
     ) },
   { field: 'Genres' },
   { field: 'Plataforms' },
   {field:'Released'},
   {field:'UpdatedAt'},
   {field:'Delete',
     headerName: 'Change Active',
     renderCell: (params) => (
       <Button  variant="outlined" 
       onClick={()=>chekearActiveVG(params.id,chekearActive[params.id])}
       onMouseLeave={updateStateActive}
       >
   <ChangeCircleIcon/>→
       </Button>
     )
   },{field:'isActive'}
 ];
  
 const styleTable={
  color:'black',
  width:'60%',
  backgroundColor: '#90a4ae',
  border: 'none',

 }
 const BoxMain={
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    height: '100vh',
    backgroundColor:'#546e7a'
 }
 const TitleBox={
   backgroundColor: '#37474f',
   borderRadius:'1em',
   padding:'1em',
   color:'white',
   margin:'1em'
 }
 const BoxStatenice={
  border:'solid',
  background:'#304ffe',
  padding:'0.5em',
  display:'flex',
  borderRadius:'1em',
  alignItems:'center'
 }
 const BoxStatebad={
  border:'solid',
  background:'#c62828',
  padding:'0.5em',
  display:'flex',
  borderRadius:'1em',
  alignItems:'center'
 }
 const BoxMainState={
   display:'flex',
   flexWrap:'wrap',
   alignItems:'center',
   width:'100%',
   justifyContent: 'space-evenly'
 }

  return (
   <Box sx={BoxMain} gap={2}>
    <Box sx={TitleBox} >
      <Typography variant='h3' component={'h3'}>
       Table Games
      </Typography>
      </Box>
      <Box style={BoxMainState}>
        <Box  style={BoxStatenice}>
          <CheckCircleIcon/>
        Active:{funcionCounterActive}
        </Box>
        <Box  style={BoxStatebad}>
          <UnpublishedIcon/>
        No Active:{funcionCounterNoActive}
        </Box>
    </Box>
    <DataGridPro style={styleTable} rows={rows} columns={columns} pagination />
   </Box>
  )
}

export default TableGames