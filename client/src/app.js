import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Notes from "./components/notes";
import Goals from "./components/goals";
import NavBar from "./components/navbar";
import Principles from "./components/principles";

export default function App() {
  const [pages, setPages] = useState(["Notes", "Goals", "Principles"]);

  useEffect(() => {
    document.title = "Goats";
  });

  return (
    <React.Fragment>
      <NavBar pages={pages} />
      <main className="container">
        <Routes>
          <Route path="/notes" element={<Notes />}></Route>
          <Route path="/goals" element={<Goals />}></Route>
          <Route path="/principles" element={<Principles />}></Route>
          <Route path="/" element={<Navigate replace to="/notes" />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}
