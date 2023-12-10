import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function HomeRoute() {
  return (
    <Container>
      <Typography variant="h2" align="center">
        Welcome to Nom-Nom Navigator
      </Typography>
      <Typography variant="h4" align="center">
        <Link to={"/menu"}>Menu</Link>
      </Typography>
    </Container>
  );
}
