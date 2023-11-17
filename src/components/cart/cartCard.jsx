import {
  CardContent,
  Typography,
  Card,
  CardMedia,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import BotonsCart from "./BotonsCart.jsx";
import PropTypes from "prop-types";


const CartCard = ({ element }) => {

  return (
    <Grid container spacing={3}>
      <Grid items xs>
      <Card
        sx={{
          width: "300px",
          height: "310px",
          backgroundColor: "#fff",
          boxShadow: "1px 1px 3px 1px black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <BotonsCart shop={element.id} />
        <CardMedia
          component="img"
          image={element.image}
          alt="imagen"
          sx={{
            backgroundColor: "#e4cfa5",
            height: "170px",
            width: "100%",
            borderRadius: "6px",
          }}
        />
        <Link style={{color:'#000'}} to={`/detail/${element.id}`}>
          <CardContent
            sx={{
              height: 20,
              display: "flex",
            }}
          >
            <Typography
              variant="h1"
              component="div"
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                fontFamily: "Roboto Mono, monospace",
              }}
            >
              {element.name}
            </Typography>
          </CardContent>
        </Link>
        
        <CardContent sx={{ height: 40 }}>
          <Typography variant="body1" component="div" sx={{ fontSize: 25 }}>
            ${element.price}
          </Typography>
        </CardContent>

        <CardContent
          sx={{
            height: 50,
            width: 35,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        </CardContent>
      </Card>
      </Grid>
    </Grid>
  );
};
CartCard.propTypes = {
  element: PropTypes.object.isRequired,
};
export default CartCard;
