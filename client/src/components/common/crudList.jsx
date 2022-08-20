import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

export default function DropDown({ data }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {data.map((item) => {
        return (
          <ListItem>
            <ListItemButton>
              <ListItemText primary={item}></ListItemText>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
