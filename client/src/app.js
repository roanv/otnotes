import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Note from "./components/notes";
import Goals from "./components/goals";
import NavBar from "./components/navbar";

class App extends Component {
  componentDidMount() {
    document.title = "GOATS";
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Routes>
            <Route path="/notes" element={<Note />}></Route>
            <Route path="/goals" element={<Goals />}></Route>
            <Route path="/" element={<Navigate replace to="/notes" />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
