import { Route, Routes } from "react-router-dom";
import { MenuRoute } from "./components/MenuRoute/MenuRoute";
import { Navbar } from "./components/Navbar/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { OrderRoute } from "./components/OrderRoute/OrderRoute";
import { FeedbackRoute } from "./components/FeedbackRoute/FeedbackRoute";
import {
  CL_PRIMARY,
  CL_PRIMARY_LIGHT,
  CL_SECONDARY,
  CL_INFO,
} from "./helper/constants";
import {
  AppContextProvider,
} from "./components/AppContextProvider";

const theme = createTheme({
  palette: {
    primary: {
      main: CL_PRIMARY,
      light: CL_PRIMARY_LIGHT,
    },
    secondary: {
      main: CL_SECONDARY,
    },
    info: {
      main: CL_INFO,
    },
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <Routes>
          <Route path="/" element={<MenuRoute />} />
          <Route path="/order" element={<OrderRoute />} />
          <Route path="/feedback" element={<FeedbackRoute />} />
        </Routes>
        <Navbar />
      </AppContextProvider>
    </ThemeProvider>
  );
}
export { CL_SECONDARY };
