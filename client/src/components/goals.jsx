import axios from "axios";
import React, { useState, useEffect } from "react";
import API_URL from "../api";
import List from "./common/crudList";

function Goals() {
  const [goals, setGoals] = useState([]);
  useEffect(() => {
    async function updateGoals() {
      setGoals(await axios.get(`${API_URL}/goals`));
    }
    updateGoals();
  });

  return <List data={goals}></List>;
}

export default Goals;
