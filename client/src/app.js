import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Notes from "./components/notes";
import Goals from "./components/goals";
import Principles from "./components/principles";
import Layout from "./components/layout";

import API_URL from "./api";
import axios from "axios";

export default function App() {
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

  function Page(name, element) {
    this.name = name;
    this.element = element;
  }

  Object.defineProperty(Page.prototype, "path", {
    get: function () {
      return `/${this.name}`;
    },
  });
  Object.defineProperty(Page.prototype, "key", {
    get: function () {
      return `route-${this.name}`;
    },
  });

  const pages = [
    new Page("Notes", <Notes goals={goals} principles={principles}></Notes>),
    new Page("Goals", <Goals goals={goals}></Goals>),
    new Page("Principles", <Principles principles={principles}></Principles>),
  ];

  const routes = (
    <Routes>
      {pages.map((page) => (
        <Route path={page.path} element={page.element} key={page.key} />
      ))}
      <Route path="/" element={<Navigate replace to="/notes" />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );

  return (
    <>
      <Layout pages={pages} content={routes} />
    </>
  );
}
