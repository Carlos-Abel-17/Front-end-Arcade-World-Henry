import { Grid, Avatar, Typography } from "@mui/material";
import React from "react";

const onlyProfile = ({user}) => { 
  console.log(user);
  return (
    <Grid item sx={{ width: "100%", textAlign:'center'}}>
      <Avatar
        sx={{ width: 250, height: 250, marginBottom: "10px", marginLeft:'40px' }}
        src={user?.photo}
        alt="Profile image"
        />
       <Grid item sx={{textAlign:'left', marginLeft:'10px'}}>
        
      <Typography sx={{marginBottom:'20px'}} variant="h5" component="div">
        Name: {user?.name}
      </Typography>
      <Typography sx={{marginBottom:'20px'}} variant="h5">
        Lastname: {user?.lastname}
      </Typography>
      <Typography sx={{marginBottom:'20px'}} variant="h5">
        Nickname: {user?.nickname}
      </Typography>
      <Typography sx={{marginBottom:'20px'}} variant="h5">Email: {user?.Email}</Typography>
        {user?.country ? <Typography sx={{marginBottom:'20px'}} variant="h5">Country: {user?.country}</Typography> : ''}
        </Grid> 
    </Grid>
  );
};

export default onlyProfile;
