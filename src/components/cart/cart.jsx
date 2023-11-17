import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Button, Box, CardContent, Typography, Stack } from "@mui/material";
import CartCard from "./cartCard";
import Purchased from "./Purchased";
import { NavLink } from "react-router-dom";
import { deleteItemCart } from "../../redux/actions.js";
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Cart() {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const gamesIds = !shoppingCart.length ? [] : shoppingCart.map((vg) => vg.id);
  const priceTotal = shoppingCart.reduce((a, b) => a + b.price, 0);
  
  const showAlert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete the items from your cart!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleClearClick();
        Swal("Success!", "Your cart has been emptied.", "success");
      } else {
        Swal("Cancelled", "Your cart is safe.", "info");
      }
    });
  };
  const handleClearClick = () => {
   
    dispatch(deleteItemCart(gamesIds));
  };

  return (
    <Box
      sx={{ 
        backgroundColor:'#1a2a3b',
        paddingLeft:'40px',
        paddingTop:'12px',
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "100px",
      }}
    >
      <Box
        sx={{
          paddingTop: "30px",
          paddingBottom: "30px",
          marginLeft:'20px',
          display: "grid",
          gridTemplateColumns: shoppingCart.length < 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          alignItems: "center",
          gap: "40px",
        }}
      >
        {shoppingCart.length ? (
          shoppingCart.map((vg, i) => <CartCard key={i} element={vg} />)
        ) : (
          <div>
            <Box
              sx={{
                backgroundColor: "#fff",
                height: "300px",
                width: "700px",
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop:'-18px',
                gap: "20px",
                boxShadow: "1px 1px 3px 1px black",
                position: "sticky",
                top: "32px",
              }}
            >
              <Stack sx={{display:'flex', alignItems:'center', alignContent:'center'}}>
              <CardContent
                sx={{
                  width: "400px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "60px",
                }}
              >
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    fontSize: 25
                  }}
                >
                  Ups! You have no items in your cart
                </Typography>
                <Typography
                  variant="inherit"
                  component="div"
                  sx={{
                    fontSize: 20
                  }}
                >
                  Add something to your Shopping Cart !
                </Typography>
              </CardContent>
              </Stack>
              <Stack sx={{display:'flex', alignContent:'center', alignItems:'center'}}>
              <NavLink to="/store">
                <Button variant="contained" color="primary" endIcon={<SearchIcon/>}>
                  Discover Products
                </Button>
              </NavLink>
              </Stack>
            </Box>
          </div>
        )}
      </Box>

      <Box
        sx={{
          marginTop: "12px",
          marginRight:'30px',
          backgroundColor: "#fff",
          height: "150px",
          width: "360px",
          borderRadius: "6px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingTop:'50px',
          paddingLeft:'20px',
          paddingBottom:'50px',
          paddingRight:'20px',
          gap: "20px",
          boxShadow: "1px 1px 3px 1px black",
          position: "sticky",
          top: "32px",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "flex-starts",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-starts",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                opacity: "0.8",
              }}
            >
              Products:
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                opacity: "0.8",
              }}
            >
              ({gamesIds.length})
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-starts",
              justifyContent: "space-between",
              width:'300px'
            }}
          >
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontSize: 30,
                display: "flex",
                alignItems: "center",
              }}
            >
              Total:
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{
                fontSize: 30,
                display: "flex",
                alignItems: "center",
              }}
            >
              $ {priceTotal}
            </Typography>
          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "50px",
          }}
        >
          <Purchased />
          <Button
            onClick={showAlert}
            variant="outlined"
            endIcon={<DeleteForeverIcon/>}
            sx={{
              color: "rgb(114, 8, 8)",
              borderColor: "rgb(114, 8, 8)",
              "&:hover": {
                borderColor: "rgb(114, 8, 8)",
                backgroundColor: "transparent",
              },
            }}
          >
            Empty Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Cart;
