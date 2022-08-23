import API_URL from "../api.js";
import axios from "axios";

function removeSpaces(value) {
  return value.replace(/\s+/g, "-");
}

export async function getGoals() {
  const { data } = await axios.get(`${API_URL}/goals`);
  return data.map((goal) => goal.name);
}

export async function saveGoal(goal) {
  await axios.post(`${API_URL}/goals`, { name: goal });
}

export async function getGoal(id) {
  id = removeSpaces(id);
  const { data } = await axios.get(`${API_URL}/goals/${id}`);
  return data;
}
