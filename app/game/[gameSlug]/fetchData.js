async function fetchData(params) {
  let baseUrl = new URL("https://api.rawg.io/api/games");
  let queryParams = new URLSearchParams();
  const key = process.env.NEXT_PUBLIC_RAWG_API_KEY;

  let options = {
    key: key,
    page: 1,
    page_size: 1,
    search: normalize(params.search),
  };

  for (let key in options) {
    queryParams.append(key, options[key]);
  }
  baseUrl.search = queryParams;
  let newUrl = baseUrl;

  const resp = await fetch(newUrl.href);
  const data = await resp.json();

  let newData = data;

  if (data) {
    let details = await fetchGameById(data.results[0].id, baseUrl, key);
    newData = { ...data, ...details };
  }

  console.log(newData);
  return newData;
}

async function fetchGameById(id, baseUrl, key) {
  let url = `https://${baseUrl.hostname}${baseUrl.pathname}/${id}?key=${key}`;
  const resp = await fetch(url);
  return await resp.json();
}

function normalize(text) {
  return text ? text.trim().toLowerCase().replace(/\s+/g, "-") : "";
}

export { normalize, fetchData };
