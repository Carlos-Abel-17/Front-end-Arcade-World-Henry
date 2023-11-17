import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch} from 'react-redux';
import { purchaseSuccess } from '../../redux/actions.js';
import {
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Avatar,
  
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Summary = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
    
  useEffect(() => {
    const fetchData = () => {
      const storeAmount = localStorage.getItem("amount");
      const amount = storeAmount? parseFloat(storeAmount) : 0;
      const UserId = localStorage.getItem("userLogin");
      const videogameIds = JSON.parse(localStorage.getItem("gameIds"));
      const games = JSON.parse(localStorage.getItem("allGames"));
      const filteredGames = games.filter((gm) => videogameIds?.includes(gm.id));
      setProducts(filteredGames);
      
      const payload = {
        UserId: UserId,
        GamesIds: videogameIds,
        amount: amount,
      };
      console.log(payload);

      dispatch(purchaseSuccess(payload));
    };
    fetchData();

    return () => {
      localStorage.removeItem("gameIds");
      localStorage.removeItem("amount");
      localStorage.removeItem("userLogin");
    };
  }, []);

  
  return (
     <Stack>
      <Stack
        style={{
          backgroundColor: "#1a2a3b",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "3  % 3% 3% 3%",
            width: "420px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "left",
            marginTop: "18px",
            marginLeft: "20px",
            border: "2px solid #000",
            boxShadow: "1px 1px 3px 1px black",
            top: "0",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              alignItems: "flex-start",
              alignContent: "flex-start",
            }}
            // key={game.id}
          >
            <CardContent
              sx={{
               marginLeft: "45px",
                width: "300px",
                display: "flex",
                alignItems: "left",
                flexDirection: "column",
                gap: "40px",
              }}
            >
             <Avatar
                src="https://res.cloudinary.com/du9kziyei/image/upload/v1699602012/images/g7oo7zdtcszck5kxmohu.png"
                sx={{
                  backgroundColor: "#1a2a3b",
                  width: "65px",
                  height: "65px",
                  marginTop: "-10px",
                  marginBottom: "-25px",
                }}
              />
              <Typography variant="h4">Arcade World</Typography>
              <Typography variant="h5" color="GrayText">
                Payment completed successfully
              </Typography>
              <Typography variant="body2">Products purchased:</Typography>
              {products.map((game) => (
                <>
                  <Typography variant="h6" component="div">
                    {game.name}: $ {game.price}
                  </Typography>
                </>
              ))}
              <Stack style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" sx={{ marginBottom: "5px" }}>
                  Total: $
                  {products.reduce((total, game) => total + game.price, 0)}
                </Typography>
              </Stack>
              <Typography variant="caption">Thanks for your support</Typography>
            </CardContent>
          </Stack>
        </Box>
      </Stack>
        <Stack backgroundColor='#1a2a3b' display='flex' p='20px' justifyContent='center' alignItems='center'>
            <NavLink to="/store">
              <Button variant="contained" endIcon={<SearchIcon />}>
                Discover more products
              </Button>
            </NavLink>
        </Stack>
      <Stack
        style={{
          backgroundColor: "#1a2a3b",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        >
         
     </Stack>
    </Stack>
  );
};

export default Summary;
