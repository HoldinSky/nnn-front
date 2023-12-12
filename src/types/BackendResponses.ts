
export enum DishType {
  Main = "Main",
  Appetizer = "Appetizer",
  Garnish = "Garnish",
  Cold = "Cold",
  Salad = "Salad",
  Drink = "Drink",
  Alcohol = "Alcohol"
}

export interface Dish {
  id: number,
  name: string,
  type_: DishType,
  portion_weight_g: number,
  price: number,
  approx_cook_time_s: number
}

export interface RedisDish {
  dish: Dish,
  ingredients: Ingredient[]
}

export interface Ingredient {
  name: String,
  grams: number
}