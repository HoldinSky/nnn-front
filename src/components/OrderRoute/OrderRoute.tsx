import { useEffect, useState } from "react";
import { backendCall } from "../../helper/axios";
import { Dish, DishWithCount } from "../../types/BackendResponses";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function OrderEntry({ dish, count }: { dish: Dish, count: number }) {
  return (
    <Box display="flex" mx="1rem">
      <Typography>{dish.name}</Typography>
      <Box flexGrow={1} />
      <Typography>{dish.price} {count > 1 && `x ${count}`}</Typography>
    </Box>
  );
}

const ActionButton = ({
  onClick,
  label,
  bgColor,
  disabled,
}: {
  onClick(): void;
  label: string;
  bgColor: string;
  disabled: boolean;
}) => {
  return (
    <Grid item xs={6}>
      <Button
        fullWidth
        disabled={disabled}
        sx={{
          fontWeight: "bolder",
          color: "black",
          backgroundColor: bgColor,
          boxShadow: "black 0 1px",
        }}
        onClick={onClick}
      >
        {label}
      </Button>
    </Grid>
  );
};

interface ActionsProps {
  confirmOrder: () => void;
  payOrder: () => void;
  isConfirmed: boolean;
  isPaid: boolean;
}

function OrderActions({
  confirmOrder,
  payOrder,
  isConfirmed,
  isPaid,
}: ActionsProps) {
  return (
    <Grid container spacing={1} direction={"row"} p="0.5rem">
      <ActionButton
        disabled={isConfirmed}
        onClick={confirmOrder}
        label={"Confirm"}
        bgColor="yellow"
      />
      <ActionButton
        disabled={isPaid}
        onClick={payOrder}
        label={"Pay"}
        bgColor="green"
      />
    </Grid>
  );
}

export function OrderRoute() {
  const navigate = useNavigate();

  const currentOrder = localStorage.getItem("currentOrder");
  const [orderedDishes, setOrderedDishes] = useState<DishWithCount[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const isConfirmed =
    localStorage.getItem(`orrder-${currentOrder}-isConfirmed`) === "true";
  const isPaid =
    localStorage.getItem(`order-${currentOrder}-isPaid`) === "true";

  useEffect(() => {
    backendCall("get", `/order/${currentOrder}`).then((resp) => {
      setOrderedDishes(resp.data);

      let price = 0;
      (resp.data as DishWithCount[]).forEach((el) => (price += el.dish.price * el.count));

      setTotalPrice(price);
    });
  }, []);

  const handleConfirm = () => {
    backendCall("post", `/order/${currentOrder}/confirm`).then(() =>
      localStorage.setItem(`order-${currentOrder}-isConfirmed`, "true")
    );
  };

  const handlePay = () => {
    backendCall("post", `/order/${currentOrder}/pay`).then(() =>
      localStorage.setItem(`order-${currentOrder}-isPaid`, "true")
    );
  };

  const handleClear = () => {
    navigate("/menu");
    localStorage.clear();
  };

  return (
    <Paper>
      <Typography variant="h3" align="center">
        Your order
      </Typography>
      {orderedDishes.map((dishWithCount) => (
        <OrderEntry dish={dishWithCount.dish} count={dishWithCount.count}/>
      ))}
      <Box mx="1rem" pt="1rem">
        Total price: {totalPrice}
      </Box>
      <Box mx="1rem" mt="1rem">
        Status: {isPaid ? "Paid" : isConfirmed ? "Processing" : "Ordering"}
      </Box>
      <OrderActions
        confirmOrder={handleConfirm}
        payOrder={handlePay}
        isConfirmed={isConfirmed}
        isPaid={isPaid}
      />
      <Box display="flex" flexGrow={1}  mx="0.5rem" pb="0.5rem">
        <Button
          onClick={handleClear}
          disabled={isPaid && isConfirmed}
          fullWidth
          sx={{
            fontWeight: "bolder",
            color: "black",
            backgroundColor: "#d0d8dF",
            boxShadow: "black 0 1px",
          }}
        >
          Create new order
        </Button>
      </Box>
    </Paper>
  );
}
