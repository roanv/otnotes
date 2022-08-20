import axios from "axios";
import React, { Component } from "react";
import API_URL from "../api";
import List from "./common/CrudList";

class Goals extends Component {
  state = {
    goals: [],
  };

  async componentDidMount() {
    const { data: goals } = await axios.get(`${API_URL}/goals`);
    this.setState({ goals });
  }

  render() {
    return <List data={this.state.goals}></List>;
  }
}

export default Goals;
