import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Stack, Typography, Card, CardMedia, CardContent } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function CardItem({ game }) {
  return (
    <Link to={`/detail/${game.id}`}>
      <Card sx={{ maxWidth: 445, marginTop:'20px', minWidth: 445, height:400, position:'relative'}}>
      <CardMedia
        sx={{ height: 240 }}
        image={game?.image}
        title={game.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
        {game?.name}
        </Typography>
        <Typography fontSize='20px' variant="body2" color="text.secondary">
        <Stack display='flex' flexDirection='row'>
        <AttachMoneyIcon/> 
        {game?.price}
        </Stack>
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
}

CardItem.propTypes = {
  game: PropTypes.object.isRequired,
};

export default CardItem;
