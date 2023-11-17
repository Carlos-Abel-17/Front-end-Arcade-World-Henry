import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ViewMain from './ViewMain';
import TablePurchases from './TablePurchases';
import TableUser from './TableUser';
import TableGames from './TableGames.jsx';
import PublishGame from './PublishGame.jsx';

function App() {
  const [Component, setComponent] = useState(<ViewMain />);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [Icon,setIcon]=useState(true)

  const HandlersComponent = (Component) => {
    setComponent(Component);
    setIsSidebarOpen(false); 
  };
  const handelrIcon=()=>{
    setIcon(prevIcon => !prevIcon)
  }
  const StyleMenu = {
    color: 'white',
  };

  const SidebarStyles = {
    width: '30%',
    position:'relative',
    minHeight: '600px',
    backgroundColor: '#263238',
    display: isSidebarOpen ? 'block' : 'none',
  };
 const buttonCom={
  position:'absolute',
  borderRadius:'10%',
  padding:'0.5em 0em'
}
  return (
    <Box display='flex'>
      <Box sx={SidebarStyles}>
        <List>
          <ListItem button onClick={() => HandlersComponent(<ViewMain />)}>
            <ListItemText style={StyleMenu} primary="View Main" />
          </ListItem>
          <ListItem button onClick={() => HandlersComponent(<TablePurchases />)}>
            <ListItemText style={StyleMenu} primary="Table Purchases" />
          </ListItem>
          <ListItem button onClick={() => HandlersComponent(<TableGames />)}>
            <ListItemText style={StyleMenu} primary="Table Games" />
          </ListItem>
          <ListItem button onClick={() => HandlersComponent(<TableUser />)}>
            <ListItemText style={StyleMenu} primary="Table User" />
          </ListItem>
          <ListItem button onClick={() => HandlersComponent(<PublishGame />)}>
            <ListItemText style={StyleMenu} primary="Publish Game" />
          </ListItem>
        </List>
      </Box>
      <Box>
      <Button style={buttonCom}  variant="contained" onClick={() => { setIsSidebarOpen(!isSidebarOpen); handelrIcon(); }} >{Icon === true ? <ArrowForwardIosIcon/> :<ArrowBackIosNewIcon/>}</Button>
      </Box>
      <Box width={'100%'}>
        {Component}
      </Box>
    </Box>
  );
}

export default App;
