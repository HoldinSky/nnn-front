import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function MenuRoute() {
  return (
    <Container>
      <Typography variant="h2" align="center">
        Menu page
      </Typography>
      <Typography variant="h4" align="center">
        <Link to={"/"}>Home</Link>
      </Typography>
    </Container>
  );
}
