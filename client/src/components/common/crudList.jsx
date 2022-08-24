import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export default function DropDown({ data, deleteItem }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {data.map((item) => {
        return (
          <ListItem key={item.id}>
            <ListItemButton onClick={() => deleteItem(item)}>
              <ListItemText primary={item.name}></ListItemText>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
