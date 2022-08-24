import API_URL from "../api.js";
import axios from "axios";

export async function getGoals() {
  const { data } = await axios.get(`${API_URL}/goals`);
  return data;
}

export async function saveGoal(goal) {
  const { data } = await axios.post(`${API_URL}/goals`, { name: goal.name });
  return data;
}

export async function getGoal(goal) {
  const { data } = await axios.get(`${API_URL}/goals/${goal.id}`);
  return data;
}

export async function deleteGoal(goal) {
  const { data } = await axios.delete(`${API_URL}/goals/${goal.id}`);
  return data;
}

export async function updateGoal(goal) {
  const { data } = await axios.put(`${API_URL}/goals/${goal.id}`, {
    name: goal.name,
  });
  return data;
}
