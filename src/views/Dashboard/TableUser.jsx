import React, { useState, useEffect } from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Box, Typography, Button } from '@mui/material';
import { UserById } from '../../redux/actions';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { updateItem } from '../../redux/actions';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


function TableUser() {
  const user = useSelector((U) => U.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const dispatch = useDispatch();
 
  const [stateBan,setstateBan]=useState({})
 const chekearBan=(id,banstatus)=>{
  setstateBan((prevCheckBan)=>({
    ...prevCheckBan,
    [id]:banstatus===undefined ? true : !banstatus,
  }))
  dispatch(updateItem({id,banstatus:banstatus === undefined ? true : !banstatus}))
 }

 const updateStatusBan=()=>{
  const hasChangesBan=Object.values(stateBan).some((value)=>value);

  if (hasChangesBan) {
    for(const id in stateBan){
      const banstatus=stateBan[id];
      dispatch(updateItem({id,banstatus}))
    }
    setstateBan({})
  }
 }

  const [checkAdmiMap, setCheckAdmiMap] = useState({});
  const CheckearAdmi = (id, admin) => {
    setCheckAdmiMap((prevCheckAdmiMap) => ({
      ...prevCheckAdmiMap,
      [id]: admin === undefined ? true : !admin,
    }));
    dispatch(updateItem({ id, admin: admin === undefined ? true : !admin }));

  };
  const updateAdmiStatus = () => {

  const hasChanges = Object.values(checkAdmiMap).some((value) => value);

  if (hasChanges) {
    for (const id in checkAdmiMap) {
      const admin = checkAdmiMap[id];
      dispatch(updateItem({ id, admin }));
    }


    setCheckAdmiMap({});
  }
  };
  

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setSelectedUserId(null);
    setModalIsOpen(false);
  };
  useEffect(() => {
    if (selectedUserId !== null) {
      dispatch(UserById(selectedUserId));
    }
  }, [dispatch, selectedUserId]);
  
  const CounterAdmi=(DUser)=>{
    let Counter=0;
     DUser.map((f)=>{ 
     if(f?.admin){
        Counter+=1
     }
    })
  return Counter
   }
   const funcionCounterAdmim=CounterAdmi(user)
   const CounterBan=(DUser)=>{
    let Counter=0;
     DUser.map((f)=>{ 
     if(f?.banstatus){
        Counter+=1
     }
    })
  return Counter
   }
   const funcionCounterBan=CounterBan(user)
  const DataUser=useSelector((state)=>state.userID);
  const rows = user?.map((u) => {
    return {
      id: u.id,
      name: u.name,
      admin:u?.admin,
      banstatus:u?.banstatus,
      lastname: u.lastname,
      nickname: u.nickname,
      Email: u.Email,
    };
  });

  const customStyles = {
    content: {
      width: '65%',
      height: '80vh',
      // backdropFilter: 'blur(8px)',
      position: 'fixed',
      top: '56%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '1',
      // background:"transparent"
      backgroundColor: '#455a64',
      borderRadius:'0.5em'
    },
    overlay: {
      backdropFilter: 'blur(5px)',
      backgroundColor:' rgba(000, 000, 000,0.50)',
    },
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 160, editable: true },
    { field: 'lastname' },
    { field: 'nickname' },
    { field: 'Email' },
    {
      field: 'Detail',
      headerName: 'Detail',
      renderCell: (params) => (
        <div>
          <Button variant="outlined" onClick={() => openModal(params.id)}>Detail</Button>
        </div>
      ),
    },
    {
      field: 'admifg',
      headerName: 'Change Status',
      renderCell: (params) => (
        <Button
        variant="contained" color="success"
      onClick={() => CheckearAdmi(params.id, checkAdmiMap[params.id])}
      onMouseLeave={updateAdmiStatus}
    >
  <ChangeCircleIcon/>→
    </Button>
  ),
    },{field:'admin', headerName: 'administrator '},
    {
      field:'banstatusButton',
      headerName:'Change Ban',
      renderCell:(params)=>(
       <Button
       variant="contained" style={{background:"#3f51b5"}}
       onClick={()=>chekearBan(params.id,stateBan[params.id])}
       onMouseLeave={updateStatusBan}       
       >
  <ChangeCircleIcon/>→
       </Button>
      )
    },
    {field:'banstatus'}
  ];
 
  const styleTable = {
    color: 'black',
    width: '75%',
    backgroundColor: '#90a4ae',
    border: 'none',
  };

  const BoxMain = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#546e7a',
    flexDirection: 'column',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    height: '100vh',
  };

  const TitleBox = {
    backgroundColor: '#37474f',
    borderRadius: '1em',
    padding: '1em',
    color: 'white',
    margin: '1em',
  };
  const BoxState={
   border:'solid',
   background:'#3d5afe',
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

  const dataGame = DataUser?.purchased?.flatMap((T) => {
    const Game = T?.Videogames;
    return Game?.map((j) => ({
      Image: j.image,
      Name: j.name,
    }));
  });
 
  const dataFav=DataUser?.favorites?.map((F)=>{
     return{
       Name:F?.name,
       Image:F?.image
     }
  })
  const dataReview=DataUser?.reviews?.map((r)=>{
    return{
      Review:r?.review?.value,
      Name:r?.name,
      LastEdit:r?.review?.lastEdit
    }
  })
  return (
    <Box sx={BoxMain} gap={2}>
      <Box sx={TitleBox}>
        <Typography variant="h3" component={'h3'}>
          Table User
        </Typography>
      </Box>
      <Box style={BoxMainState}>
        <Box style={BoxState}>
          <AdminPanelSettingsIcon/>
          Administrators:{funcionCounterAdmim}
        </Box>
        <Box style={BoxState}>
          <RemoveCircleIcon/>
          Banned:{funcionCounterBan}
        </Box>
      </Box>
      <DataGridPro style={styleTable} rows={rows} columns={columns} pagination />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Details Modal"
        style={customStyles}
      >
        <div>
       <div>
      <div style={{flexDirection:'column',background:'#90a4ae',borderRadius:'1em',display:'flex',alignContent:'center',justifyItems:'center',margin:'0% 0% 1% 0%'}}>
        <div style={{zIndex:'1',alignItems:'center',display:'flex'}}>
        <img
          src={DataUser?.cover}
          alt="Portada"
          style={{ width: '100%', borderRadius: '8px',maxHeight:'30em',margin:'1em 1em 5em 1em' }}
          />
        <div style={{ zIndex: '2',position:'ABSOLUTE',top:'50%',left:'40%'}}>
        <img
          src={DataUser?.photo}
          alt={DataUser?.name}
          style={{
            minWidth: '25%',
            maxWidth:'100%',
            maxHeight: '49%',
            borderRadius: '50%',
            border: '5px solid #fff',
            position: 'relative',
           
          }}
        />
          </div>
          </div>
      </div> 
      <div style={{padding:'1em',background:'#90a4ae',flexDirection:'column',borderRadius:'1em',display:'flex',alignContent:'center',alignItems:'center',margin:'0% 0% 1% 0%',flexWrap:'wrap'}}>
      <div>
        <Typography variant="h4"> {DataUser?.nickname}</Typography>
        <Typography variant="h6"> {DataUser?.name} {DataUser?.lastname}</Typography>
        </div>
        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
        <Typography variant="h5"> Email: {DataUser?.Email}</Typography>
        <div  style={{display:'felx',alignItems:'center' }}>
          <Typography variant="h6">Admi:</Typography>
        <Typography variant="h6" style={{ color: DataUser?.admin ? '#00e676' : 'red' }}>
           {DataUser?.admin ? '✅True' : '⛔False'}
        </Typography>
        </div>
        <Typography variant="p">Creation: {DataUser?.createdAt}</Typography>
        </div>
      </div>
    </div>
    <Typography variant='h5' color='white'>My Videogames</Typography>
        <div style={{padding:'1em 1em 1em 0em',display:'flex',flexWrap:'wrap',width:'100%',background:'#90a4ae',borderRadius:'1em'}}>
         {dataGame?.map((t)=>{
           return(
            <div style={{display:'flex',alignItems:'center',flexDirection:'column',border:'solid',margin:'1%',background:'white'}}>
            <img src={t.Image} alt={t.Name}  style={{minWidth:'8em',maxWidth:'8em',minHeight:'5em'}}/>
            <h4 style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'15ch'}}>{t.Name}</h4>
            </div>
           )     
         })}
        </div>
        <Typography variant='h5' color='white'>My Favorites</Typography>
        <div style={{display:'flex',flexWrap:'wrap',width:'100%',background:'#90a4ae',borderRadius:'1em'}}>
         {dataFav?.map((t)=>{
           return(
            <div style={{display:'flex',alignItems:'center',flexDirection:'column',margin:'1%',background:'white'}}>
            <img src={t.Image} alt={t.Name}  style={{minWidth:'8em',maxWidth:'8em',minHeight:'5em'}}/>
            <h4 style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'15ch'}}>{t.Name}</h4>
            </div>
           )     
         })}
        </div>
        <Typography variant='h5' color='white'>My Review</Typography>
        <div style={{padding:'1em 1em 1em 0em',display:'flex',flexWrap:'wrap',width:'100%',background:'#90a4ae',borderRadius:'1em'}}>
          {dataReview?.map((r)=>{
            return(
                <Accordion style={{maxWidth:'45%',margin:'0.4em 0.5em'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{r?.Name}, <span style={{fontSize:'0.8em',color:'gray'}}> {r?.LastEdit}</span></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
         {r?.Review}
          </Typography>
        </AccordionDetails>
      </Accordion>
             )
          })}
        
        </div>
      </div>
        <Button onClick={closeModal}>Close Modal</Button>
      </Modal>
      
  
    </Box>
  );
}

export default TableUser;