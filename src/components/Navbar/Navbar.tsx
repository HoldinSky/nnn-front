import { AppBar, Toolbar, IconButton, Box, Badge } from "@mui/material";
import TextsmsIcon from "@mui/icons-material/Textsms";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CustomContext } from "../CustomContextProvider";

export function Navbar() {
  const navigate = useNavigate();

  const handleOpenMenu = () => {
    navigate("/");
  };

  const handleGoToOrder = () => {
    navigate("/order");
  };

  const handleGoToFeedback = () => {
    navigate("/feedback");
  };

  const {dishesOrdered} = useContext(CustomContext);

  return (
    <Box sx={{ paddingTop: "64px" }}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0, height: "fit-content" }}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <RestaurantMenuIcon fontSize="large" />
          </IconButton>
          <Box flexGrow={1} />
          <IconButton color="inherit" onClick={handleGoToOrder}>
            <Badge badgeContent={dishesOrdered} color="secondary">
              <ListAltIcon fontSize="large" />
            </Badge>
          </IconButton>
          <Box flexGrow={1} />
          <IconButton color="inherit" onClick={handleGoToFeedback}>
            <TextsmsIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
