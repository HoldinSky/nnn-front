import { Route, Routes } from "react-router-dom";
import { HomeRoute } from "./components/HomeRoute/HomeRoute";
import { MenuRoute } from "./components/MenuRoute/MenuRoute";
import { Navbar } from "./components/Navbar/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFBF00',
      light: '#FFEF00'
    },
    secondary: {
      main: '#2072AF',
    },
    info: {
      main: '#00BFFF'
    }
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/menu" element={<MenuRoute />} />
      </Routes>
      <Navbar />
    </ThemeProvider>
  );
}
