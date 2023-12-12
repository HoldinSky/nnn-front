import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Dish } from "../../types/BackendResponses";
import { backendCall } from "../../helper/axios";
import { MenuItem } from "./MenuItem";
import { DishCategory, DishTypeList } from "./DishTypeList";

export function MenuRoute() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState(dishes);

  useEffect(() => {
    backendCall("get", "/menu").then((resp) => {
      setDishes(resp.data);
      setFilteredDishes(resp.data);
    });
  }, []);

  const handleSwitchCategory = (category: DishCategory) => {
    if (category === "All") {
      setFilteredDishes(dishes);
      return;
    }

    setFilteredDishes(dishes.filter((dish) => dish.type_ === category));
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignContent: "center" }}
    >
      <DishTypeList dishes={dishes} onCategorySwitch={handleSwitchCategory} />
      <Grid container spacing={1}>
        {filteredDishes.map((dish) => (
          <Grid
            item
            key={dish.id}
            xs={12}
            md={filteredDishes.length > 1 ? 6 : 12}
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
