import { RAWG_API_KEY } from "@/config";

async function fetchData(params) {
  let baseUrl = "https://api.rawg.io/api/games";
  const key = RAWG_API_KEY;

  let options = {
    key: key,
    page: 1,
    page_size: 1,
    search: normalize(params.search),
  };
  const queryString = Object.keys(options)
    .map((key) => `${key}=${options[key]}`)
    .join("&");

  baseUrl = `${baseUrl}?${queryString}`;

  const resp = await fetch(baseUrl);
  const data = await resp.json();
  console.log(data);
  return data;
}

function normalize(text) {
  return text ? text.trim().toLowerCase().replace(/\s+/g, "-") : "";
}

export { normalize, fetchData };
