import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Notes from "./components/notes";
import Goals from "./components/goals";
import NavBar from "./components/navbar";
import Principles from "./components/principles";

class App extends Component {
  state = {
    nabButtons: [],
    navPages: ["Notes", "Goals", "Principles"],
    goals: [],
    principles: [],
  };
  componentDidMount() {
    document.title = "Goats";
  }

  render() {
    const { navPages, navButtons } = this.state;
    return (
      <React.Fragment>
        <NavBar pages={navPages} buttons={navButtons} />
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
}

export default App;
