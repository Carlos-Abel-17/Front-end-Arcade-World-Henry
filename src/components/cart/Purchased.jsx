import axios from "axios";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import CreditCardIcon from '@mui/icons-material/CreditCard';
const { VITE_IS_LOCAL }= import.meta.env
const URL_DEPLOY = 'https://back-arcade-world-pf-henry.onrender.com';
const urlLocal = 'http://localhost:3001';
const BD_URL =  VITE_IS_LOCAL === 'true' ? urlLocal : URL_DEPLOY


export default function Purchased() {

  const shoppingCart = useSelector ( s => s.shoppingCart);
  const UserId = useSelector(s=>s.userID.id);
  const amount = shoppingCart.reduce((a,b)=> a+b.price,0);
     
  const handleOnclickcarrito = async () => {
     try {
      const videogameIds = shoppingCart.map((game) => game.id);
      console.log({UserId: UserId, GamesIds: videogameIds});
      const response = await axios.post(`${BD_URL}/cart/purchased`, {UserId: UserId, GamesIds: videogameIds})
      const url = response.data.session_url
            localStorage.setItem("gameIds", JSON.stringify(videogameIds));
      localStorage.setItem("amount", amount);
      localStorage.setItem("userLogin", UserId);
      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
  
  };
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        sx={{
          minWidth: "100%",
          marginLeft:'10px'
        }}
        onClick={handleOnclickcarrito}
        endIcon={<CreditCardIcon/>}
      >
        Pay Now
      </Button>
    </div>
  );
}