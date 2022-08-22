import axios from "axios";
import React, { useState, useEffect } from "react";
import DropDown from "./common/dropDown";
import API_URL from "../api";

export default function Notes() {
  const [goals, setGoals] = useState([]);
  const [principles, setPrinciples] = useState([]);

  useState(() => {
    const updateGoals = async () => {
      const { data } = await axios.get(`${API_URL}/goals`);
      setGoals(data);
    };
    const updatePrinciples = async () => {
      const { data } = await axios.get(`${API_URL}/principles`);
      setPrinciples(data);
    };
    updateGoals();
    updatePrinciples();
  }, []);
  return (
    <React.Fragment>
      <DropDown options={goals} label="Goals" />
      <DropDown options={principles} label="Principles" />
    </React.Fragment>
  );
}
