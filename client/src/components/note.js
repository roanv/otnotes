import axios from "axios";
import React, { Component } from "react";
import DropDown from "./dropDown";
import API_URL from "../api";

class Note extends Component {
  state = {
    goals: [],
    principles: [
      "Weight shift",
      "Elongation",
      "Rotation",
      "Narrow base of support",
      "Elevate point of gravity",
      "Decrease external support",
      "Increase external resistance",
      "Open & closed eyes",
    ],
  };

  async componentDidMount() {
    const { data: goals } = await axios.get(`${API_URL}/goals`);
    console.log(goals);
    this.setState({ goals });
  }

  render() {
    return (
      <React.Fragment>
        <DropDown options={this.state.goals} label="Goals" />
        <DropDown options={this.state.principles} label="Principles" />
      </React.Fragment>
    );
  }
}

export default Note;
