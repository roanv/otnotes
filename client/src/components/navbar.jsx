import { Link as RouterLink } from "react-router-dom";

import { AppBar, Toolbar, Button, IconButton, Container } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

const NavBar = ({ pages, button }) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
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
          {button}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
