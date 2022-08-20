import axios from "axios";
import React, { Component } from "react";
import DropDown from "./dropDown";
import API_URL from "../api";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";

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
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <List>
            {this.state.goals.map((item) => (
              <listItem>
                <ListItemButton>
                  <ListItemText primary={item}></ListItemText>
                </ListItemButton>
              </listItem>
            ))}
          </List>
        </Box>
      </React.Fragment>
    );
  }
}

export default Note;
