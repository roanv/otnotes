import React, { useState, useEffect } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

export default function ContextMenu({
  open,
  setOpen,
  item,
  anchor,
  onDelete,
  onUpdate,
}) {
  return (
    <Menu anchorEl={anchor} open={open} onClose={() => setOpen(false)}>
      <MenuItem
        onClick={() => {
          setOpen(false);
          onUpdate(item);
        }}
      >
        Edit
      </MenuItem>
      <MenuItem
        onClick={() => {
          setOpen(false);
          onDelete(item);
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
}
