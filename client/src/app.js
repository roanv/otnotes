import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Notes from "./components/notes";
import Goals from "./components/goals";
import NavBar from "./components/navbar";
import Principles from "./components/principles";

import API_URL from "./api";
import axios from "axios";

export default function App() {
  const [pages, setPages] = useState(["Notes", "Goals", "Principles"]);
  const [principles, setPrinciples] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    document.title = "Goats";
  });

  useEffect(() => {
    const updatePrinciples = async () => {
      const { data } = await axios.get(`${API_URL}/principles`);
      setPrinciples(data);
    };
    updatePrinciples();
  }, []);

  useEffect(() => {
    const updateGoals = async () => {
      const { data } = await axios.get(`${API_URL}/goals`);
      setGoals(data);
    };
    updateGoals();
  }, []);

  return (
    <React.Fragment>
      <NavBar pages={pages} />
      <main className="container">
        <Routes>
          <Route path="/notes" element={<Notes />}></Route>
          <Route path="/goals" element={<Goals goals={goals} />}></Route>
          <Route
            path="/principles"
            element={<Principles principles={principles} />}
          ></Route>
          <Route path="/" element={<Navigate replace to="/notes" />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}
