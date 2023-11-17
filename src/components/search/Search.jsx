import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { gameByName } from '../../redux/actions';



function Search() {
  const [valor,setValor]=useState('')
  const dispatch=useDispatch()
  const chageHandlers=(e)=>{
    setValor(e.target.value)
  }
  const onsearch=(Name)=>{
    dispatch(gameByName(Name))
  }
  return (
    <Stack style={{ display: 'flex', alignItems: 'center', gap: '10px', flexDirection:'row' }}>
      <TextField
        fullWidth
        size='small'
        variant="standard"
        placeholder="Search Game"
        value={valor}
        onChange={chageHandlers}
        sx={{ '& .MuiInputBase-input': { color: 'white' }}}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => onsearch(valor)}
        startIcon={<SearchIcon />}
        size='small'
        sx={{paddingLeft:'20px', paddingRight:'20px'}}
      >
        Search
      </Button>
    </Stack>
  )
}

export default Search