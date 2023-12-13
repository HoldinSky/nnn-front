import {
  ReactNode,
  createContext,
} from "react";
import { useLocalStorage } from "react-use";

interface ICustomContext {
  dishesOrdered: number;
  setDishesOrdered: (n: number) => void;
}

const initial: ICustomContext = {
  dishesOrdered: 0,
  setDishesOrdered: () => {},
};

export const CustomContext = createContext(initial);

export function CustomContextProvider({ children }: { children: ReactNode }) {
  const [dishesOrdered, setDishesOrdered] = useLocalStorage("customContextValues", 0);

  const handleDishesOrderedChange = (newValue: number) => {
    setDishesOrdered(newValue);
  }

  return <CustomContext.Provider value={{ dishesOrdered: dishesOrdered!!, setDishesOrdered: handleDishesOrderedChange }}>
    {children}
  </CustomContext.Provider>;
}
