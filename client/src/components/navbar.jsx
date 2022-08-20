import { AppBar, Toolbar, Button } from "@mui/material";

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
