import React from "react";
import { Grid, Card, CardContent, Typography, CardMedia, Stack, IconButton } from "@mui/material";
import {
  removeFromFavorites,
} from "../../redux/actions";
import { useDispatch } from "react-redux";
import ClearIcon from '@mui/icons-material/Clear';

const FavoriteProfile = ({favorites}) => {
  const id = favorites[0]?.id;
  const dispatch = useDispatch();
  const removeFav = (id) => {
    dispatch(removeFromFavorites(id));
  };
  return (
            <Grid container columnSpacing={3} rowSpacing={3} mb={2}>
              {favorites?.map((favorite) => (
                <Grid item xs>
                  <Card
                    sx={{
                      width: "300px",
                      height:'420px'
                    }}
                  >
                      <Stack display='flex' position='absolute' marginLeft='260px'>
                        <IconButton
                        onClick={() => removeFav(id)}
                        >
                          <ClearIcon/>
                        </IconButton>
                      </Stack>
                    <CardMedia
                      component="img"
                      height="300px"
                      image={favorite.image}
                      alt="name"
                      />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {favorite.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
  );
};

export default FavoriteProfile;
