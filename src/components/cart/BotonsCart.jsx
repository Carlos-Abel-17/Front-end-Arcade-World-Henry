import { useDispatch } from "react-redux";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteItem } from "../../redux/actions.js";
import { IconButton } from "@mui/material";

const BotonsCart = ({shop}) => {
  const dispatch = useDispatch();
  const handleRemoveCart = () => {
    dispatch(deleteItem(shop));
  };

  return (
    <div>
      <CardContent
        sx={{
          display: "Grid",
          position:'absolute',
          marginLeft:'105px',
          gap: "20px",
        }}
      >
        <IconButton sx={{backgroundColor:'#fff', padding:'2px', borderRadius: '0% 0% 0% 50%'}} color="error" size="medium"
        onClick={handleRemoveCart}><DeleteIcon /></IconButton>
      </CardContent>
    </div>
  );
};

export default BotonsCart;
