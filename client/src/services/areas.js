import { API_URL } from "../global.js";
import axios from "axios";
import * as yup from "yup";

const url = `${API_URL}/areas`;

// const schema = yup.object().shape({
//   name: yup.string().required().min(1).max(100),
// });

async function create(item) {
  const result = await axios.post(url, item);
  return result.data;
}
async function fetch(item) {
  const result = await axios.get(url, item);
  return result.data;
}
// async function update(item) {
//   const result = await axios.put(url, item);
//   return result.data;
// }
// async function remove(item) {
//   const result = await axios.delete(url, { data: item });
//   return result.data;
// }

// function isValid(item, property) {
//   if (property) {
//     const propSchema = yup.reach(schema, property);
//     return propSchema.isValidSync(item[property]);
//   } else {
//     return schema.isValidSync(item);
//   }
// }

// function listContains(list, item) {
//   const result = list.find(
//     (item) => item.name.toLowerCase() === item.name.toLowerCase()
//   );
//   return result;
// }

export default {
  create,
  fetch,
  //   update,
  //   remove,
  //   isValid,
  //   listContains,
};
