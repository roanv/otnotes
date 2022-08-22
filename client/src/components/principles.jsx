import axios from "axios";
import React, { useState, useEffect } from "react";
import API_URL from "../api";
import List from "./common/crudList";

export default function Principles() {
  const [principles, setPrinciples] = useState([]);

  useEffect(() => {
    const updatePrinciples = async () => {
      const { data } = await axios.get(`${API_URL}/principles`);
      setPrinciples(data);
    };
    updatePrinciples();
  }, []);

  return <>{<List data={principles}></List>}</>;
}
