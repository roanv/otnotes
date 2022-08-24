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
  onDelete,
  onClose,
  onUpdate,
}) {
  return (
    <Menu anchorEl={anchor} open={open} onClose={onClose}>
      <MenuItem
        onClick={() => {
          onDelete(item);
        }}
      >
        Delete
      </MenuItem>
      <MenuItem
        onClick={() => {
          onUpdate(item);
        }}
      >
        Edit
      </MenuItem>
    </Menu>
  );
}
