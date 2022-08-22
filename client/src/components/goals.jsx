import axios from "axios";
import React, { useState, useEffect } from "react";
import API_URL from "../api";
import List from "./common/crudList";

export default function Goals() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const updateGoals = async () => {
      const { data } = await axios.get(`${API_URL}/goals`);
      setGoals(data);
    };
    updateGoals();
  }, []);

  return <List data={goals}></List>;
}
