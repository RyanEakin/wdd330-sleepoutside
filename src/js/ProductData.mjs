const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {

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
}
