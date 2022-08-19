import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";

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
            <Route path="/" element={<Note />}></Route>
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
