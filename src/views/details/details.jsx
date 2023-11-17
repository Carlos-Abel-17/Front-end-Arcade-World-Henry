import { useEffect, useState } from "react";
import { gameById, GetUser, logout, deleteGameDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Grafico from "./Grafico";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import Grid from "@mui/material/Grid";
import Filter from "bad-words";
var filter = new Filter();
import { addComments } from "../../redux/actions";
import Pay from "../../components/cart/Pay.jsx";
import { addToCart } from "../../redux/actions.js";
import { useForm } from "react-hook-form";

const Details = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit
  } = useForm();
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const shoppingCart = useSelector((state) => state.shoppingCart);
  let userLocalDetail = localStorage.getItem("login");
  userLocalDetail = userLocalDetail ? JSON.parse(userLocalDetail) : null;
  console.log(userLocalDetail);
  const reviews = useSelector((state) => state.reviews);
  const handleButton = handleSubmit((data) => {
    const dataToSave = {
      UserId: userLocalDetail.user.id,
      name: gameDetails.name,
      reviews: [{
          GameId: gameDetails.id,
          review: data.review
        }]
    }
    console.log(dataToSave);
    if (userLocalDetail === null || userLocalDetail === "") {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Sorry you can only send if you are login",
        showConfirmButton: true,
        // showCloseButton: true,
        // allowOutsideClick: false,
        confirmButtonText: "Login",
        confirmButtonColor: "#F19E6E",
      }).then((willRedirect) => {
        if (willRedirect) {
          // Redirecciona a la URL deseada
          navigate("/auth");
        }
      });
    } else {
      dispatch(addComments(dataToSave));
      // const reviews = useSelector((state)=> state.reviews);
      dispatch(logout(reviews));
      setComments(message);
    }
    console.log("reviw",reviews)
  });

  const gameDetails = useSelector((state) => state.gameId);
  console.log(gameDetails);
  const { id } = useParams();

  let searchUserGameId = userLocalDetail?.user?.purchased.flatMap(
    (purchase) => purchase?.Videogames
  );
  let resSearch = searchUserGameId?.find((gamePurchasedId) => {
    return gamePurchasedId.GameId === gameDetails?.id;
  });
  let gameMatch;
  if (resSearch) {
    gameMatch = true;
  } else {
    gameMatch = false;
  }

  useEffect(() => {
    console.log(id);
    dispatch(gameById(id));
    return () => {
      console.log('me desmonté');
      dispatch(deleteGameDetail())
    }
  }, [dispatch. id]);

  const handleChange = (event) => {
    let cleanMessage = filter.clean(event.target.value);
    setMessage(cleanMessage);
  };

  const showAlert = () => {
    Swal.fire({
      toast: true,
      icon: "success",
      title: "Product added to cart",
      timer: 1200,
      timerProgressBar: true,
      showConfirmButton: false,
      position: "top",
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
      position: "top",
    });
  };

  const handleAdd = () => {
    const found = shoppingCart.find((el) => el.id === id);
    if (!found) {
      dispatch(addToCart(gameDetails));
      showAlert();
    } else {
      showAlert2();
    }
  };
  const updateShoppingCart = useSelector((state) => state.shoppingCart);
  localStorage.setItem("cart", JSON.stringify(updateShoppingCart));

  return (
    <>
      {gameDetails ? (
        <Stack sx={{ display: "flex" }} direction="row">
          <Stack>
            <Card sx={{ marginLeft: "3px", marginTop: "3px" }}>
              <CardMedia
                sx={{ height: 317, width: 450 }}
                image={gameDetails.image}
                title="prueba"
              />
            </Card>
          </Stack>
          <Stack textAlign="left" marginLeft="20px">
            <Typography variant="h3">{gameDetails.name}</Typography>
            <Typography variant="body1">
              <Typography variant="h6">Platforms:</Typography>{" "}
              {gameDetails.platforms && gameDetails.platforms.join(", ")}
            </Typography>
            <Typography variant="body1">
              <Typography variant="h6">Genres:</Typography>{" "}
              {gameDetails.genres && gameDetails.genres.join(", ")}
            </Typography>
            <Typography variant="body1">
              <Typography variant="h6">About the game:</Typography>{" "}
              {gameDetails.description}
            </Typography>
            <Typography variant="body1">
              <Typography variant="h6">Release:</Typography>{" "}
              {gameDetails.released}
            </Typography>
            <Typography variant="body1">
              <Typography variant="h6">Price:</Typography> ${gameDetails.price}
            </Typography>
            <div>
              <Button
                variant="outlined"
                color="success"
                size="medium"
                startIcon={<AddIcon />}
                onClick={handleAdd}
              >
                Adds
              </Button>

              <Pay />
            </div>
          </Stack>
        </Stack>
      ) : (
        <Skeleton variant="rectangular" width={450} height={500} />
      )}
      <Grafico />
      <Stack sx={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h6">Comments:</Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            textAlign: "center",
          }}
          noValidate
          autoComplete="off"
        >
          {gameMatch === true ? (
            <>
              <TextField
                variant="outlined"
                name="review"
                // onChange={handleChange}
                {...register('review')}
              ></TextField>
              <br />
              <Button onClick={handleButton} variant="outlined" color="info">
                Submit
              </Button>
              </>
          ) : (
            ""
          )}
        </Box>
      </Stack>
       <Grid container spacing={3} justifyContent="center" marginTop="30px">
        {gameDetails.reviews &&
          gameDetails.reviews.map((review, index) => (
            <Stack textAlign="center" marginRight="20px" key={index}>
              <Card sx={{ minWidth: 275, marginBottom: "20px" }}>
                <CardContent
                  sx={{ textAlign: "center", height: "200px", width: "400px" }}
                >
                  <Stack alignItems="center">
                    <Avatar src={review.photo}/>
                    <Typography
                      textAlign="center"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {review.nickName}
                    </Typography>
                    {/* <Rating value={review.rating} readOnly precision={0.5} /> */}
                  </Stack>
                  <Typography textAlign="center">{review.review}</Typography>
                </CardContent>
              </Card>
            </Stack>
          ))}
      </Grid>
    </>
  );
};
export default Details;