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
import { Dish, Ingredient } from "../../types/BackendResponses";
import ScaleIcon from "@mui/icons-material/Scale";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import { backendCall } from "../../helper/axios";
import { useState } from "react";

function DishOverview({ dish }: { dish: Dish }) {
  return (
    <List dense>
      <ListItem>
        <ListItemIcon>
          <ScaleIcon />
        </ListItemIcon>
        <ListItemText primary={`${dish.portion_weight_g} g`} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AlarmOnIcon />
        </ListItemIcon>
        <ListItemText primary={`${dish.approx_cook_time_s} sec`} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary={`${dish.price} UAH`} />
      </ListItem>
    </List>
  );
}

function DishIngredients({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <>
      <Typography sx={{ textDecorationLine: "underline", fontWeight: "bold" }}>
        Ingredients
      </Typography>
      <List dense>
        {Object.values(ingredients).map((ing, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${ing.name} (${ing.grams}g)`} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

const DishHeader = ({ name, dishType }: { name: string; dishType: string }) => (
  <Box display="flex" ml="1rem">
    <Typography gutterBottom variant="h5" component="div">
      {name}
    </Typography>
    <Typography variant="h6" ml={"8px"} pt={"2px"}>
      ({dishType})
    </Typography>
  </Box>
);

interface OrderButtonProps {
  onClick: () => void;
}

const OrderButton = ({ onClick }: OrderButtonProps) => (
  <Button
    sx={{
      backgroundColor: "#F0F8FF",
      fontWeight: "bold",
      boxShadow: "#3570a5 0px 1px",
      color: "black",
    }}
    size="small"
    color="primary"
    onClick={onClick}
  >
    Order
  </Button>
);

interface Props {
  dish: Dish;
  onDishOrder: (id: number) => void;
}

export function MenuCard({ dish, onDishOrder }: Props) {
  const [showIngredients, setShowIngredients] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[] | undefined>(
    undefined
  );

  const handleClickOnDish = () => {
    if (!showIngredients) {
      if (!ingredients) {
        backendCall("get", `/menu/dish/${dish.id}`)
          .then((resp) => resp.data.ingredients)
          .then((data) => {
            const ingredients: Ingredient[] = [];

            for (let i = 0; i < data.length; i++) {
              ingredients.push({ name: data[i][0], grams: data[i][1] });
            }

            setIngredients(ingredients);
          });
      }
      setShowIngredients(!showIngredients);
    } else setShowIngredients(false);
  };

  return (
      <Card sx={{ maxWidth: "450px", minWidth: "23rem" }}>
        <CardActionArea onClick={handleClickOnDish}>
          <CardMedia
            component="img"
            height="170"
            image="/src/assets/dish-placeholder-2.jpeg"
            alt={dish.name}
          />
          <DishHeader name={dish.name} dishType={dish.type_} />
          <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
            {showIngredients && ingredients ? (
              <DishIngredients ingredients={ingredients} />
            ) : (
              <DishOverview dish={dish} />
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <OrderButton onClick={() => onDishOrder(dish.id)} />
        </CardActions>
      </Card>
  );
}
