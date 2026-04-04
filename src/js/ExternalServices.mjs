const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  const req = res.json()
  if (req.ok) {
    return req;
  } else {
    throw {name: "servicesError", message: req};
  }
}

export default class ExternalServices {

  async getData(category) {
    return await fetch(`${baseURL}products/search/${category} `) // fetches from API, category data
      .then(convertToJson) // converts API data to Json
      .then((data) => data.Result); // this returns data.Result instead of data alone.
  }
  async findProductById(id) {
    return await fetch(`${baseURL}product/${id} `) // this calls the product json data via the API directly
      .then(convertToJson) // converts API data to Json
      .then((data) => data.Result); // this returns data.Result instead of data alone.
  }
  async checkout(payload){
    const options = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
