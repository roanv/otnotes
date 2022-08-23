import API_URL from "../api.js";
import axios from "axios";

export async function getGoals() {
  const { data } = await axios.get(`${API_URL}/goals`);
  return data.map((goal) => goal.name);
}

export async function saveGoal(goal) {
  await axios.post(`${API_URL}/goals`, { id: goal });
}

export async function getGoal(id) {
  const { data } = await axios.get(`${API_URL}/goals/${id}`);
  return data;
}

export async function deleteGoal(id) {
  const { data } = await axios.delete(`${API_URL}/goals/${id}`);
  return data;
}
