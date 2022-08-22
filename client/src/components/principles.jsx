import axios from "axios";
import React, { useState, useEffect } from "react";
import API_URL from "../api";
import List from "./common/crudList";

function Principles() {
  const [principles, setPrinciples] = useState([]);

  useEffect(() => {
    async function updatePrinciples() {
      setPrinciples(await axios.get(`${API_URL}/principles`));
    }
    updatePrinciples();
  });

  return <List data={principles}></List>;
}

export default Principles;
