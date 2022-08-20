import React, { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Button } from "@mui/material";

import Note from "./components/note";
import Goals from "./components/goals";

class App extends Component {
  componentDidMount() {
    document.title = "GOATS";
  }

  render() {
    return (
      <React.Fragment>
        {/* <Button variant="contained">Show DB</Button> */}
        <main className="container">
          <Routes>
            <Route path="/note" element={<Note />}></Route>
            <Route path="/goals" element={<Goals />}></Route>
            <Route path="/" element={<Navigate replace to="/note" />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
  // onShowDB() {
  //   console.log(config.get("db"));
  // }
}

export default App;
