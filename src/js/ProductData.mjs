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
      .then(convertToJson) // converts API to Json
      .then((data) => data.Result); // this returns data.Result instead of data alone.
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
