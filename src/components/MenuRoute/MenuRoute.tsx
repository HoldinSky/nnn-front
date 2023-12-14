import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { backendCall } from "../../helper/axios";
import { DishCategory } from "./DishTypeList";
import { MenuPage } from "./MenuPage";
import { useAppContext } from "../AppContextProvider";

export function MenuRoute() {
  const { menu, partialSetState } = useAppContext();
  const [filteredDishes, setFilteredDishes] = useState(menu);

  useEffect(() => {
    backendCall("get", "/menu").then((resp) => {
      if (menu !== resp.data) {
        partialSetState({ menu: resp.data });
        setFilteredDishes(resp.data);
      }
    });
  }, []);

  const handleSwitchCategory = (category: DishCategory) => {
    if (category === "All") {
      setFilteredDishes(menu ?? []);
      return;
    }

    setFilteredDishes(menu!.filter((dish) => dish.type_ === category));
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignContent: "center" }}
    >
      <MenuPage
        filteredDishes={filteredDishes}
        handleSwitchCategory={handleSwitchCategory}
      />
    </Container>
  );
}
