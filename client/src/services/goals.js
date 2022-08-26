import { API_URL } from "../global.js";
import axios from "axios";
import * as yup from "yup";

const url = `${API_URL}/goals`;

const schema = yup.object().shape({
  name: yup.string().required().min(1).max(100),
});

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

function isValid(goal, property) {
  if (property) {
    const propSchema = yup.reach(schema, property);
    return propSchema.isValidSync(goal[property]);
  } else {
    return schema.isValidSync(goal);
  }
}

function listContains(list, goal) {
  const result = list.find(
    (item) => item.name.toLowerCase() === goal.name.toLowerCase()
  );
  return result;
}

export default {
  create,
  fetch,
  update,
  remove,
  isValid,
  listContains,
};
