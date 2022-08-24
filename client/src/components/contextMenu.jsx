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
  anchor,
  item,
  handleDelete,
  handleClose,
}) {
  return (
    <Menu anchorEl={anchor} open={open} onClose={handleClose}>
      <MenuItem
        onClick={() => {
          handleDelete(item);
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
}
