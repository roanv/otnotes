import React from "react";
import DropDown from "./common/dropDown";

export default function Notes({ goals, principles }) {
  return (
    <React.Fragment>
      <DropDown options={goals} label="Goals" />
      <DropDown options={principles} label="Principles" />
    </React.Fragment>
  );
}
