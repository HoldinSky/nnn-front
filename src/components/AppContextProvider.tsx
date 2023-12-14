import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "react-use";
import { Dish, OrderInfo } from "../types/BackendResponseTypes";
import { usePartialSetState } from "../helper/usePartialSetState";
import { useDeepEqualsSetState } from "../helper/useDeepEqualsSetState";

interface IAppContext {
  orderDishesCount: number;
  orderId?: string;
  tableId?: string;
  orderInfo?: OrderInfo;
  menu?: Dish[];

  partialSetState: (obj: Partial<IAppContext>) => void;
}

const initial: IAppContext = {
  orderDishesCount: 0,
  orderId: undefined,
  orderInfo: undefined,
  menu: [],

  partialSetState: () => {},
};

export const AppContext = createContext(initial);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [orderDishesCount, setOrderDishesCount] = useLocalStorage(
    "customContextValues",
    0
  );
  const [menu, setMenu] = useLocalStorage<Dish[]>("menu", []);
  const [orderInfo, setOrderInfo] = useLocalStorage<
    OrderInfo | undefined
  >("currentOrder", undefined);
  const [orderId, setOrderId] = useLocalStorage<string | undefined>(
    "orderId",
    undefined
  );
  const [tableId, setTableId] = useLocalStorage<string | undefined>(
    "tableId",
    undefined
  );

  const [state, partialSetState] = usePartialSetState(
    useDeepEqualsSetState(
      useState({
        ...initial,
        tableId,
        orderDishesCount: orderDishesCount ?? 0,
        menu,
        orderInfo,
        orderId,
      })
    )
  );

  const updateContextState = (update: Partial<IAppContext>) => {
    partialSetState(update);
    
    if (update.menu) setMenu(update.menu);
    if (update.orderId) setOrderId(update.orderId);
    if (update.tableId) setTableId(update.tableId);
    if (update.orderInfo) setOrderInfo(update.orderInfo);
    if (update.orderDishesCount) setOrderDishesCount(update.orderDishesCount);
  }

  useEffect(() => {
    // if (menu !== state.menu) setMenu(state.menu);
    // if (orderId !== state.orderId) setOrderId(state.orderId);
    // if (!isEqual(orderDishesCount, state.orderDishesCount))
    //   setOrderDishesCount(state.orderDishesCount);
    // if (!isEqual(currentOrder, state.currentOrder))
    //   setCurrentOrder(state.currentOrder);
  }, [menu, orderInfo, orderId, orderDishesCount]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        partialSetState: updateContextState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
