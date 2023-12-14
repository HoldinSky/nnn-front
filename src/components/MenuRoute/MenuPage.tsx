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
import { useState, ChangeEvent, useEffect } from "react";
import { backendCall } from "../../helper/axios";
import { CL_PRIMARY } from "../../helper/constants";
import { useAppContext } from "../AppContextProvider";
import isEqual from "react-fast-compare";

interface Props {
  filteredDishes?: Dish[];
  handleSwitchCategory: (dc: DishCategory) => void;
}

export function MenuPage({ filteredDishes, handleSwitchCategory }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const tableId = 35;

  const {
    menu,
    orderDishesCount,
    orderInfo,
    orderId,
    partialSetState,
  } = useAppContext();

  useEffect(() => {
    if (menu) setDishes(menu);
  }, [menu]);

  const createOrder = () => {
    backendCall("post", `/order/create-for-table/${tableId}`)
      .then((resp) => {
        partialSetState({ orderId: resp.data });
      })
      .catch((err) => err);
    setIsDialogOpen(false);
  };

  const orderDish = async (dishId: number) => {
    if (!orderId) {
      setIsDialogOpen(true);
      return;
    }

    partialSetState({ orderDishesCount: orderDishesCount + 1 });
    const respOrderId = await backendCall(
      "post",
      `/order/${orderId}/add/${dishId}`
    ).catch((_e) => {});

    await backendCall("get", `/order/get/${respOrderId}`)
      .then((resp) => {
        if (!isEqual(resp.data, orderInfo)) {
          partialSetState({ orderInfo: resp.data });
        }
      })
      .catch((_e) => {});
  };

  const handleTableInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!Number(e.target.value) && e.target.value.length !== 0) return;

    partialSetState({ tableId: e.target.value });
  };

  return (
    <>
      <DishTypeList dishes={dishes} onCategorySwitch={handleSwitchCategory} />
      <Grid container spacing={1}>
        {filteredDishes &&
          filteredDishes.map((dish) => (
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
                orderExists={orderId !== undefined}
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
