import React, { Component } from "react";
import DropDown from "./dropDown";

class Note extends Component {
  state = {
    goals: [
      "Balance",
      "Ocular Control",
      "Bilateral Integration",
      "Fine Motor Control",
      "Visual Perception",
    ],
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
