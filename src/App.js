import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Note from "./components/note";

class App extends Component {
  componentDidMount() {
    document.title = "GOATS";
  }

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Routes>
            <Route path="/note" element={<Note />}></Route>
            <Route path="/" element={<Navigate replace to="/note" />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
