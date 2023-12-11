import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Dish } from "../../types/BackendResponses";
import ScaleIcon from "@mui/icons-material/Scale";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";

interface Props {
  dish: Dish;
}

export function MenuItem(props: Props) {
  return (
    <Card sx={{ maxWidth: "450px", minWidth: "350px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="170"
          image="/src/assets/dish-placeholder-2.jpeg"
          alt={props.dish.name}
        />
        <CardContent>
          <Box display="flex">
            <Typography gutterBottom variant="h5" component="div">
              {props.dish.name}
            </Typography>
            <Typography variant="h6" ml={"8px"} pt={"2px"}>
              ({props.dish.type_})
            </Typography>
          </Box>
          <List>
            <ListItem>
              <ListItemIcon>
                <ScaleIcon />
              </ListItemIcon>
              <ListItemText primary={`${props.dish.portion_weight_g} g`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AlarmOnIcon />
              </ListItemIcon>
              <ListItemText primary={`${props.dish.approx_cook_time_s} sec`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary={`${props.dish.price} UAH`} />
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          sx={{
            backgroundColor: "#F5F5F5",
            fontWeight: "bold",
            textShadow: "0 1px #FFD700",
          }}
          size="small"
          color="primary"
        >
          Order
        </Button>
      </CardActions>
    </Card>
  );
}
