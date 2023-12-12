import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  InputLabel,
} from "@mui/material";
import { DishCategory, DishTypeList } from "./DishTypeList";
import { Dish } from "../../types/BackendResponses";
import { MenuCard } from "./MenuCard";
import { useState, ChangeEvent } from "react";
import { backendCall } from "../../helper/axios";

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
  const [tableId, setTableId] = useState<string | undefined>(undefined);
  const [orderId, setOrderId] = useState<number | undefined>(
    Number(localStorage.getItem("currentOrder")) ?? undefined
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createOrder = async () => {
    const resp = await backendCall(
      "post",
      `/order/create-for-table/${tableId}`
    );
    setIsDialogOpen(false);

    setOrderId(resp.data);
    localStorage.setItem("currentOrder", resp.data);
  };

  const orderDish = async (dishId: number) => {
    if (!orderId) {
      setIsDialogOpen(true);
      return;
    }

    await backendCall("post", `/order/${orderId}/add/${dishId}`);
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
            <MenuCard dish={dish} onDishOrder={orderDish} />
          </Grid>
        ))}
      </Grid>
      <Dialog open={isDialogOpen} disableEscapeKeyDown>
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
          <Button
            onClick={createOrder}
            disabled={!tableId}
            sx={{ color: "black" }}
          >
            Confirm
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
