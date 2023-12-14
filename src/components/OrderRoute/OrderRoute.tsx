import { useEffect, useMemo } from "react";
import { backendCall } from "../../helper/axios";
import { Dish, OrderInfo } from "../../types/BackendResponseTypes";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CL_INFO, CL_SECONDARY, getOrderStatus } from "../../helper/constants";
import { useInterval } from "react-use";
import { useAppContext } from "../AppContextProvider";
import isEqual from "react-fast-compare";

function OrderEntry({ dish, count }: { dish: Dish; count: number }) {
  return (
    <Box display="flex" mx="1rem">
      <Typography>{dish.name}</Typography>
      <Box flexGrow={1} />
      <Typography>
        {dish.price} {count > 1 && `x ${count}`}
      </Typography>
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
        bgColor={CL_INFO}
      />
      <ActionButton
        disabled={isPaid}
        onClick={payOrder}
        label={"Pay"}
        bgColor={CL_SECONDARY}
      />
    </Grid>
  );
}

export function OrderRoute() {
  const navigate = useNavigate();

  const { orderId, orderInfo, partialSetState } = useAppContext();

  const handleNewOrderInfo = (newOrderInfo: OrderInfo) => {
    if (!isEqual(newOrderInfo, orderInfo))
      partialSetState({ orderInfo: newOrderInfo });
  };

  const updateOrderInfo = useMemo(
    () => () => {
      backendCall("get", `/order/get/${orderId}`)
        .then((resp) => {
          handleNewOrderInfo(resp.data);
        })
        .catch((_err) => {});
    },
    []
  );

  useEffect(() => {
    if (orderId) updateOrderInfo();
  }, []);

  useInterval(() => {
    if (orderId) updateOrderInfo();
  }, 2000);

  const handleConfirm = () => {
    backendCall("post", `/order/${orderId}/confirm`)
      .then(() => updateOrderInfo)
      .catch((_e) => {});
  };

  const handlePay = () => {
    backendCall("post", `/order/${orderId}/pay`).then(() => updateOrderInfo());
  };

  const handleClear = () => {
    navigate("/");
    localStorage.clear();
    partialSetState({ orderDishesCount: 0 });
  };

  return (
    <Paper>
      <Typography variant="h4" align="center" py="0.5rem">
        Your order{" "}
        {orderInfo?.order.table_id && ` (table ${orderInfo?.order.table_id})`}
      </Typography>
      <Box m="0.5rem" border="solid 0.5px" borderRadius="5px">
        {orderInfo?.dishes.map((dishWithCount) => (
          <OrderEntry
            key={dishWithCount.dish.id}
            dish={dishWithCount.dish}
            count={dishWithCount.count}
          />
        ))}
      </Box>
      <Box mx="1rem" pt="1rem">
        Total price: {orderInfo ? orderInfo.order.total_cost : 0}
      </Box>
      <Box mx="1rem" mt="1rem">
        Status:{" "}
        {orderInfo
          ? getOrderStatus(
              orderInfo.order.is_confirmed,
              orderInfo.order.is_cooked,
              orderInfo.order.is_paid
            )
          : ""}
      </Box>
      <OrderActions
        confirmOrder={handleConfirm}
        payOrder={handlePay}
        isConfirmed={orderInfo?.order.is_confirmed ?? false}
        isPaid={orderInfo?.order.is_paid ?? false}
      />
      <Box display="flex" flexGrow={1} mx="0.5rem" pb="0.5rem">
        <Button
          onClick={handleClear}
          disabled={
            orderInfo && orderInfo.order.is_cooked && !orderInfo.order.is_paid
          }
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
