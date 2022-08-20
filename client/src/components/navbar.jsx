import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";

const pages = ["Notes", "Goals", "Principles"];

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {pages.map((page) => (
          <Button href={page} sx={{ my: 2, color: "white", display: "block" }}>
            {page}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
