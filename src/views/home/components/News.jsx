import PropTypes from "prop-types";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";
import {
  Card,
  Box,
  Button,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../../redux/actions";
import { useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function News({ id, name, image, price }) {
  const [isPressed, setIsPressed] = useState();
  const dispatch = useDispatch();
  const handleAddToFavorites = () => {
    // Almacena el nuevo estado en una variable
    const newIsPressed = !isPressed;

    if (newIsPressed) {
      dispatch(addToFavorites({ id, name, image }));
    } else {
      dispatch(removeFromFavorites(id));
    }

    // Actualiza el estado con la nueva variable
    setIsPressed(newIsPressed);
  };

  const cardStyle = {
    cursor: "pointer",
    flexwrap: "wrap",
    width: "250px",
    maxheight: "256px", // Establece una altura fija para las tarjetas
    overflow: "hidden",
    backgroundColor: "#fff",
    color: "black",
  };
  return (
    <Card style={cardStyle}>
      <IconButton
        onClick={handleAddToFavorites}
        sx={{
          display: "grid",
          position: "absolute",
          marginLeft: "195px",
          color: isPressed ? "red" : null,
        }}
      >
        <FavoriteIcon />
      </IconButton>
      <CardMedia component="img" height="140" image={image} alt={name} />
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Box display="flex" flexDirection='column' marginTop='20px' gap={2}>
          {/* <Typography marginTop='20px' fontSize="20px" variant="body2" color="text.secondary">
            <AttachMoneyIcon/>
            {price}
          </Typography> */}
          <Link to={`/detail/${id}`}>
            <Button sx={{marginTop: name.length > 20 ? '-15px' : '15px'}} fullWidth variant="contained" endIcon={<InfoOutlinedIcon />}>
              Detail
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
News.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default News;
