import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Container,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NavBar = ({ pages, button }) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                component={RouterLink}
                to={page}
                key={page}
                sx={{ my: 2, color: "inherit" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {button}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
