import { List, ListItem, ListItemText } from "@mui/material";
import { DishType } from "../../types/BackendResponses";

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  padding: 0,
};

export function DishTypeList() {
  return (
    <List sx={flexContainer}>
      {Object.values(DishType).map((dishType) => (
        <ListItem key={dishType}>
          <ListItemText primary={dishType} />
        </ListItem>
      ))}
    </List>
  );
}
