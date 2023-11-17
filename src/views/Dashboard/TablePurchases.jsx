import React,{useEffect,useState} from 'react'
import { DataGridPro} from '@mui/x-data-grid-pro';
import { Box,Typography,Button} from '@mui/material';
import Modal from 'react-modal'
import {useDispatch,useSelector}from 'react-redux'
import { GetPuchase, PurchaseById } from '../../redux/actions';
import logo from '../../../public/logo1Sinfondo.png'


function TablePurchases() {
  const Dispatch=useDispatch()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState(null);

  const openModal = (PurchaseId) => {
    setSelectedPurchaseId(PurchaseId)
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPurchaseId(null)
    setModalIsOpen(false);
  };
  useEffect(()=>{
   Dispatch(GetPuchase())
   if (selectedPurchaseId !== null) {
    Dispatch(PurchaseById(selectedPurchaseId));
  }
  },[Dispatch,selectedPurchaseId])
  const purchase=useSelector((P)=>P.Purchase)
  const DataPurchase=useSelector((P)=>P.PurchaseID)
 
  const rows = purchase?.map((p)=>{
    const videoGamesNames = p?.Videogames.map(game => game.name).join(', ');
      return{
      id:p?.purchaseId,
      amount:'$/'+ p?.amount,
      Nameuser:p?.username,
      Nickname:p?.nickname,
     Email:p?.Email,
     videogame:videoGamesNames
      }
    })
    const customStyles = {
      content: {
      width: '35%', // Puedes ajustar este valor según tus necesidades
      height: '80vh', // Otra opción es utilizar porcentaje de la altura de la ventana
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '1',
      borderRadius:'0.5em',
      backgroundColor: '#607d8b', // Cambiar el color de fondo del modal
      },
      overlay: {
        backdropFilter: 'blur(5px)',
        backgroundColor:' rgba(000, 000, 000,0.50)', // Cambiar el color de fondo del overlay
      },
    };
  const columns=[
    {field:'id'},
    {field:'Nameuser'},
    {field:'Nickname'},
    {field:'Email'},
    {field:'videogame',headerName:'Videogame'},
    {field:'amount',headerName:'Amount',
    renderCell: (params) => (
      <div style={{ color: 'green' }}> 
        {params.row.amount}
      </div>
    )},
    {field:'detail',headerName:'Detail', renderCell: (params) => {
      return(
      <div>
      <Button variant="outlined" onClick={()=> openModal(params?.id)}>Detail</Button>
    </div>
    )
  }}
   ]
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
   const styleTable={
  color:'black',
  width:'55%',
  backgroundColor: '#90a4ae',
  border: 'none',

 }
 const DataVideoGame=DataPurchase?.Videogames?.map((DV)=>{
  const PGame=DV?.platforms?.join(',')
  const GGame=DV?.genres.join(',')
  return {
    Name:DV?.name,
    Image:DV?.image,
    platforms:PGame,
    genres:GGame
  }
 
 })

  return (
    <Box sx={BoxMain}  gap={2}>
     <Box sx={TitleBox} >
      <Typography variant='h3' component={'h3'}>
       Table Purchased
      </Typography>
    </Box>
    <DataGridPro style={styleTable} rows={rows} columns={columns} pagination />
   <Modal 
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="User Details Modal"
    style={customStyles}
    >
 <div>
  <div style={{display:'flex',alignItems:'center',borderBottom:'solid 0.2em white'}}>
   <img src={logo} alt="" style={{width:'6em'}}/>
    <Typography variant='h3' color='white'>Arcade World</Typography>
  </div>
  <div style={{border:'solid #b0bec5',padding:'0.5em',margin:'2% 0% 0% 0%'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}> 
  <Typography color='white' variant='h6'>User ID:</Typography>
  <Typography >{DataPurchase?.userId}</Typography>
    </div>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
  <Typography color='white' variant='h6'>Name:</Typography>
    <Typography  >{DataPurchase?.username}</Typography>
  </div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
    <Typography color='white' variant='h6'>User:</Typography>
    <Typography >{DataPurchase?.nickname}</Typography>
    </div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
    <Typography color='white' variant='h6'>Email:</Typography>
    <Typography >{DataPurchase?.Email}</Typography>
    </div>
  </div>
  <div style={{ border:'solid #b0bec5',padding:'0.5em',margin:'2% 0% 0% 0%'}}>
    <div style={{display:'flex',alignItems:'center'}}>
 <Typography color='white' variant='h6'>Purchased ID:</Typography>
    <Typography > {DataPurchase?.purchaseId}</Typography>
    </div>
    <div  style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
    <Typography color='white' variant='h6'>Date:</Typography>
    <Typography > {DataPurchase?.date}</Typography>
    </div>
    <div  style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <Typography color='white' variant='h6'>Hour:</Typography>
    <Typography > {DataPurchase?.hour}</Typography></div>
    <div  style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
       <Typography color='white' variant='h6'>Payment Method:</Typography>
    <Typography >{DataPurchase?.paymentMethod}</Typography> 
    </div>
  </div>
  <div style={{border:'solid #b0bec5',padding:'0.5em',margin:'2% 0% 0% 0%'}}>
  {
    DataVideoGame?.map((o)=>{
     return(  
      <Box sx={{borderBottom:'solid white 0.1em'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Typography color='white' variant='h6'>VideoGame:</Typography>
        <Typography  >{o?.Name}</Typography>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Typography color='white' variant='h6'>Plataforms:</Typography>
        <Typography >{o?.platforms}</Typography>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Typography color='white' variant='h6'>Genres:</Typography>
        <Typography>{o?.genres}</Typography>
        </div>
      </Box>
     )
    })
  }
  </div>
  <div style={{display:'flex',justifyContent:'space-between',margin:'2% 0% 2% 0%'}}>
  <Typography color='white' variant='h6'>Amount:</Typography>
  <Typography color='greenyellow'>$/{DataPurchase?.amount}</Typography>
  </div>
 </div>
 <Button onClick={closeModal} variant="contained">Close Modal</Button>
   </Modal>
   </Box>
  )
}

export default TablePurchases