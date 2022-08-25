import API_URL from "../api.js";
import axios from "axios";

const url = `${API_URL}/goals`;

async function create(goal) {
  const result = await axios.post(url, goal);
  return result.data;
}
async function fetch(goal) {
  const result = await axios.get(url, goal);
  return result.data;
}
async function update(goal) {
  const result = await axios.put(url, goal);
  return result.data;
}
async function remove(goal) {
  const result = await axios.delete(url, { data: goal });
  return result.data;
}

export default { create, fetch, update, remove };
