import React, { useState, useEffect } from "react";
import List from "./common/crudList";
import axios from "axios";
import { useTitle } from "../context/title";
import { API_URL } from "../global.js";

export default function Principles() {
  const [principles, setPrinciples] = useState([]);
  const [title, setTitle] = useTitle();

  useEffect(() => {
    setTitle("Principles");
  });
  useEffect(() => {
    const updatePrinciples = async () => {
      const { data } = await axios.get(`${API_URL}/principles`);
      setPrinciples(data);
    };
    updatePrinciples();
  }, []);
  return <List data={principles}></List>;
}
