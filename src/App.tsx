import { Route, Routes } from "react-router-dom";
import { HomeRoute } from "./components/HomeRoute/HomeRoute";
import { MenuRoute } from "./components/MenuRoute/MenuRoute";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/menu" element={<MenuRoute />} />
    </Routes>
  );
}
