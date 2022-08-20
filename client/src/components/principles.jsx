import axios from "axios";
import React, { Component } from "react";
import API_URL from "../api";
import List from "./common/CrudList";

class Principles extends Component {
  state = {
    principles: [],
  };

  async componentDidMount() {
    const { data: principles } = await axios.get(`${API_URL}/principles`);
    this.setState({ principles });
  }

  render() {
    return <List data={this.state.principles}></List>;
  }
}

export default Principles;
