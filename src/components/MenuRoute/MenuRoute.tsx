import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Dish } from "../../types/BackendResponseTypes";
import { backendCall } from "../../helper/axios";
import { DishCategory } from "./DishTypeList";
import { MenuPage } from "./MenuPage";

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
      <MenuPage
        dishes={dishes}
        filteredDishes={filteredDishes}
        handleSwitchCategory={handleSwitchCategory}
      />
    </Container>
  );
}
