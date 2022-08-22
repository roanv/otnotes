import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Typography,
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

const NavBar = ({ pages }, props) => {
  const { window } = props;
  const location = useLocation();
  const [title, setTitle] = useState("Goats");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const drawerWidth = 240;

  useEffect(() => {
    setTitle(location.pathname.substring(1));
  }, [location]);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {pages.map((page) => (
                <Button
                  component={Link}
                  to={page}
                  key={page}
                  sx={{ my: 2, color: "inherit" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              GOATS
            </Typography>
            <Divider />
            <List>
              {pages.map((page) => (
                <ListItem key={page} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={page}
                    sx={{ textAlign: "center" }}
                  >
                    <ListItemText primary={page} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default NavBar;
