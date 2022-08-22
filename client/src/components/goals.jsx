import { Button } from "@mui/material";
import React, { useEffect } from "react";
import List from "./common/crudList";
import AddIcon from "@mui/icons-material/Add";

export default function Goals({ goals, setButton: setNavButton }) {
  useEffect(() => {
    setNavButton(<AddIcon />);
  }, [setNavButton]);
  return <List data={goals}></List>;
}
