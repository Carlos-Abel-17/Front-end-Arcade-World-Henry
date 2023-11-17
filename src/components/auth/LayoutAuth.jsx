import { Box, Button, Card, CardMedia, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function LayoutAuth({ children }) {
  let userLocal = localStorage.getItem("login");
  return (
    <>
      {userLocal ? (
        <div>
            { children }
        </div>
      ) : (
        <Box bgcolor='#1a2a3b'>
        <Stack height="77vh" justifyContent="center" alignItems="center">
          <Typography variant='h3' sx={{color:'#fff'}}>Sorry, log in to access the profile!</Typography>
          <Card sx={{marginBottom:'20px', marginTop:'20px'}}>
            <CardMedia
            sx={{border:'5px solid black'}}
            component="img"
            image="https://cdn.dribbble.com/users/448511/screenshots/4277999/media/b2d5d783831512d89994c67c5349391d.gif"
            />
          </Card>
          <Link to='/auth'>
          <Button variant="contained" color="info">Go Log in</Button>
          </Link>
        </Stack>
        </Box>
      )}
    </>
  );
}
export default LayoutAuth;
