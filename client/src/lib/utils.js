import axios from "axios";

async function getBackEnd(collection, method, query) {
  let url = "api/v1/" + collection + "?" + objectToURL(query);
  try {
    return await axios(url).data;
  } catch (err) {
    console.error(err);
  }
}

let query = objectToURL({
  query: { user: "gonzaloroc" },
  sort: { date: -1 },
  limit: 1,
  select: "date"
});
let that = this;

const objectToURL = obj =>
  Object.entries(obj)
    .map(([key, val]) => {
      let newVal = typeof val === "object" ? JSON.stringify(val) : val;
      return `${key}=${newVal}`;
    })
    .join("&");

export { objectToURL, getBackEnd };
