import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Dish } from "../../types/BackendResponses";
import { makeRequest } from "../../helper/axios";
import { MenuItem } from "./MenuItem";
import { DishCategory, DishTypeList } from "./DishTypeList";

export function MenuRoute() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [sortedDishes, setSortedDishes] = useState(dishes);

  useEffect(() => {
    makeRequest("get", "/menu").then((resp) => {
      setDishes(resp.data);
      setSortedDishes(resp.data);
    });
  }, []);

  const handleSwitchCategory = (category: DishCategory) => {
    if (category === "All") {
      setSortedDishes(dishes);
      return;
    }

    setSortedDishes(dishes.filter(dish => dish.type_ === category));
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignContent: "center" }}
    >
      <DishTypeList dishes={dishes} onCategorySwitch={handleSwitchCategory} />
      <Grid container spacing={2}>
        {sortedDishes.map((dish) => (
          <Grid
            item
            key={dish.id}
            xs={12}
            md={6}
            display={"flex"}
            justifyContent={"center"}
          >
            <MenuItem dish={dish} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
