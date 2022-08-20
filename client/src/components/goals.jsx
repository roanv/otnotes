import axios from "axios";
import React, { Component } from "react";
import API_URL from "../api";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

class Note extends Component {
  state = {
    goals: [],
  };

  async componentDidMount() {
    const { data: goals } = await axios.get(`${API_URL}/goals`);
    this.setState({ goals });
  }

  render() {
    return (
      <React.Fragment>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {this.state.goals.map((item) => {
            // const labelId = "checkbox-list-label-${value}";
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
      </React.Fragment>
    );
  }
}

export default Note;
