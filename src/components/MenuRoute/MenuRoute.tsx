import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Dish } from "../../types/BackendResponses";
import { makeRequest } from "../../helper/axios";
import { MenuItem } from "./MenuItem";
import { DishTypeList } from "./DishTypeList";

export function MenuRoute() {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    makeRequest("get", "/menu").then((resp) => setDishes(resp.data));
  }, []);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignContent: "center" }}
    >
      <DishTypeList />
      <Grid container spacing={2}>
        {dishes.map((dish) => (
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
