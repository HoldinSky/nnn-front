import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  InputLabel,
} from "@mui/material";
import { DishCategory, DishTypeList } from "./DishTypeList";
import { Dish } from "../../types/BackendResponseTypes";
import { MenuCard } from "./MenuCard";
import { useState, ChangeEvent, useContext } from "react";
import { backendCall } from "../../helper/axios";
import { CL_PRIMARY } from "../../helper/constants";
import { CustomContext } from "../CustomContextProvider";

interface Props {
  dishes: Dish[];
  filteredDishes: Dish[];
  handleSwitchCategory: (dc: DishCategory) => void;
}

export function MenuPage({
  dishes,
  filteredDishes,
  handleSwitchCategory,
}: Props) {
  const [tableId, setTableId] = useState<string>("");
  const [orderId, setOrderId] = useState<string>(
    localStorage.getItem("currentOrder") ?? ""
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { dishesOrdered, setDishesOrdered } = useContext(CustomContext);

  const createOrder = () => {
    backendCall("post", `/order/create-for-table/${tableId}`)
      .then((resp) => {
        setOrderId(resp.data);
        localStorage.setItem("currentOrder", resp.data);
      })
      .catch((err) => err);
    setIsDialogOpen(false);
  };

  const orderDish = (dishId: number) => {
    if (!orderId) {
      setIsDialogOpen(true);
      return;
    }

    backendCall("post", `/order/${orderId}/add/${dishId}`).then(() => {
      setDishesOrdered(dishesOrdered + 1);
    });
  };

  const handleTableInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!Number(e.target.value) && e.target.value.length !== 0) return;

    setTableId(e.target.value);
  };

  return (
    <>
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
            <MenuCard
              dish={dish}
              onDishOrder={orderDish}
              orderExists={orderId.length > 0}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog open={isDialogOpen}>
        <DialogTitle>Specify your table number</DialogTitle>
        <DialogContent>
          <InputLabel id="table-input-label">
            Enter your table number
          </InputLabel>
          <Input
            aria-labelledby="table-input-label"
            value={tableId}
            onChange={handleTableInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={createOrder}
            disabled={!tableId}
            sx={{ color: "black", backgroundColor: CL_PRIMARY }}
          >
            Create
          </Button>
          <Box flexGrow={1} />
          <Button
            onClick={() => setIsDialogOpen(false)}
            sx={{ color: "black" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
