import { Box, Typography, styled } from "@mui/material";
import { Dish, DishType } from "../../types/BackendResponseTypes";
import { useState } from "react";
import {
  CL_PRIMARY,
  CL_SECONDARY,
  CL_SECONDARY_LIGHT,
} from "../../helper/constants";

const ScrollContainer = styled("div")({
  overflowX: "scroll",
  overflowY: "hidden",
  whiteSpace: "nowrap",
  WebkitOverflowScrolling: "auto",
  scrollbarWidth: "none",

  margin: "16px 0 16px 0",
  backgroundColor: CL_SECONDARY,
  borderRadius: 20,
  boxShadow: `${CL_SECONDARY} 0px 2px 3px`,
  cursor: "grab",
});

const ScrollItem = styled("div")(({ active }: { active: boolean }) => ({
  display: "inline-block",
  padding: "0 8px 0 8px",
  margin: 10,

  backgroundColor: active ? CL_PRIMARY : CL_SECONDARY_LIGHT,
  borderRadius: 8,
  boxShadow: `${CL_SECONDARY} 0px 1px`,
  cursor: "pointer",
}));

export type DishCategory = DishType | "All";

const MenuItem = ({
  category,
  handleClick,
}: {
  category: DishCategory;
  handleClick: (dc: DishCategory) => void;
}) => (
  <Box onClick={() => handleClick(category)} sx={{ width: "fit-content" }}>
    <Typography>{category}</Typography>
  </Box>
);

interface Props {
  dishes: Dish[];
  onCategorySwitch: (category: DishCategory) => void;
}

export function DishTypeList({ dishes, onCategorySwitch }: Props) {
  const [activeCategory, setActiveCategory] = useState<DishCategory>("All");
  const uniqueCategories = [
    ...new Set(dishes.map((dish) => dish.type_)),
  ].sort();

  const handleSwitchCategory = (dc: DishCategory) => {
    setActiveCategory(dc);
    onCategorySwitch(dc);
  };

  return (
    <ScrollContainer>
      <ScrollItem key="All" active={activeCategory === "All"}>
        <MenuItem category="All" handleClick={handleSwitchCategory} />
      </ScrollItem>
      {uniqueCategories.map((category) => (
        <ScrollItem key={category} active={activeCategory === category}>
          <MenuItem category={category} handleClick={handleSwitchCategory} />
        </ScrollItem>
      ))}
    </ScrollContainer>
  );
}
