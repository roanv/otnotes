import { Fab } from "@mui/material";
import React, { useState, useEffect } from "react";
import List from "./common/crudList";
import AddIcon from "@mui/icons-material/Add";
import API_URL from "../api.js";
import axios from "axios";
import { useTitle } from "../context/title";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useTitle();

  useEffect(() => {
    setTitle("Goals");
  });

  useEffect(() => {
    const updateGoals = async () => {
      const { data } = await axios.get(`${API_URL}/goals`);
      setGoals(data);
    };
    updateGoals();
  }, []);
  const handleAdd = () => {};
  return (
    <>
      <List data={goals}></List>
      <Fab
        sx={{ right: 16, bottom: 16, position: "absolute" }}
        color="primary"
        aria-label="add"
        onClick={handleAdd()}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
