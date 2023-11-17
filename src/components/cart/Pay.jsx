
import Swal from "sweetalert2";
import ShopIcon from "@mui/icons-material/Shop";
import {Button} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from '../../redux/actions.js';


 const Pay = ()=> {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const gameDetails = useSelector((state) => state.gameId);
  let userLocalBuy = localStorage.getItem("login");
  userLocalBuy = userLocalBuy ? JSON.parse(userLocalBuy) : null;
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams()

  const showAlert = () => {
    Swal.fire({
      toast: true,
      icon: "success",
      title: "Product added to cart",
      timer: 1200,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "center",
    });
  };
  const showAlert2 = () => {
    Swal.fire({
      toast: true,
      icon: "warning",
      title: "The product is already in the cart",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "center",
    });
  };

  const handleClick = () => {
  if (userLocalBuy === null || userLocalBuy === "") {
    Swal.fire({
      toast: true,
      icon: "info",
      title: "You must be logged in to continue with the purchase",
      showConfirmButton: true,
      position: "center",
      confirmButtonText: "Login",
    }).then((willRedirect) => {
      if (willRedirect) {
          navigate("/auth");
      }
    });
  } else {
    const found = shoppingCart?.find(el => el.id === id)
    if(!found) {
      showAlert();
      dispatch(addToCart(gameDetails))
      navigate("/cart");
    } else {
      showAlert2()
      navigate("/cart");
    }
  }
};
          
 return (
    <div>
      <Button
        variant="contained"
        color="success"
        size="medium"
        endIcon={<ShopIcon />}
        sx={{ marginLeft: "150px", marginTop:"-58px" }}
        onClick={handleClick}
        >
         Buy
        </Button>
     </div>

  )
}
export default Pay;