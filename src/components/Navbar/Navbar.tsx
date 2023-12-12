import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  const handleOpenMenu = () => {
    navigate("/menu");
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  const handleGoToOrder = () => {
    navigate("/order");
  };

  return (
    <Box sx={{ paddingTop: "64px" }}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0, height: "fit-content" }}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={handleReturnHome}>
            <HomeIcon fontSize="large" />
          </IconButton>
          <Box flexGrow={1} />
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <RestaurantMenuIcon fontSize="large" />
          </IconButton>
          <Box flexGrow={1} />
          <IconButton color="inherit" onClick={handleGoToOrder}>
            <ListAltIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
