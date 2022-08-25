import React from "react";

import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function DropDown({ data, openMenu }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {data.map((item) => {
        return (
          <ListItem key={item.id}>
            <ListItemButton>
              <ListItemText primary={item.name}></ListItemText>
              <IconButton
                onClick={(event) => {
                  openMenu(event, item);
                }}
                edge="end"
                aria-label="more"
              >
                <MoreVertIcon />
              </IconButton>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
