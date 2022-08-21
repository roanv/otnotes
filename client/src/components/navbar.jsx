import { AppBar, Toolbar, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NavBar = ({ pages }, buttons) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {pages.map((page) => (
          <Button
            component={RouterLink}
            to={page}
            key={page}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
