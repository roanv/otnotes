import axios from "axios";
import React, { Component } from "react";
import DropDown from "./common/dropDown";
import API_URL from "../api";

class Note extends Component {
  state = {
    goals: [],
    principles: [],
  };

  async componentDidMount() {
    const { data: goals } = await axios.get(`${API_URL}/goals`);
    const { data: principles } = await axios.get(`${API_URL}/principles`);
    this.setState({ goals });
    this.setState({ principles });
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
