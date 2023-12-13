export enum DishType {
  Main = "Main",
  Appetizer = "Appetizer",
  Garnish = "Garnish",
  Cold = "Cold",
  Salad = "Salad",
  Drink = "Drink",
  Alcohol = "Alcohol",
}

export interface Dish {
  id: number;
  name: string;
  type_: DishType;
  portion_weight_g: number;
  price: number;
  approx_cook_time_s: number;
}

export interface DishWithCount {
  dish: Dish;
  count: number;
}

export interface Ingredient {
  name: String;
  grams: number;
}

export interface OrderInfo {
  order: Order;
  dishes: DishWithCount[];
}

export interface Order {
  id: number;
  table_id: number;
  total_cost: number;
  is_confirmed: boolean;
  is_cooked: boolean;
  is_paid: boolean;
  created_at: Date;
  confirmed_at: Date;
  cooked_at: Date;
}
