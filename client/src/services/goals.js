import API_URL from "../api.js";
import axios from "axios";

export async function getGoals() {
  const { data } = await axios.get(`${API_URL}/goals`);
  return data;
}

export async function saveGoal(goal) {
  await axios.post(`${API_URL}/goals`, { name: goal });
}
