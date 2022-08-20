import {
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DropDown({ data }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {data.map((item) => {
        return (
          <ListItem
            key={item}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemText primary={item}></ListItemText>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
