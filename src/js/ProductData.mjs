const baseURL = import.meta.env.VITE_SERVER_URL


// Hotfix to get category data until we get actual API link
async function w03HotFixFetcher({funcName:t="",category:e="",Id:o=""}={}){const n=["tents","backpacks","sleeping-bags"],a=JSON.parse(localStorage.getItem("w03_hotfix_data"))||{};for(const t of n)if(!a.hasOwnProperty(t))try{const e=await fetch(`../json/${t}.json`),o=await convertToJson(e);a[t]=o}catch(e){console.error(`Failed to fetch ${t}:`,e)}if(localStorage.setItem("w03_hotfix_data",JSON.stringify(a)),"getData"===t)return"tents"===e?a[e]:a[e]?.Result;if("findProductById"===t){for(const t of Object.keys(a)){const e="tents"===t?a[t]:a[t]?.Result,n=e?.find((t=>t.Id===o));if(n)return n}return null}}

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  async getData(category) {
    return await w03HotFixFetcher({funcName: 'getData', category: category});

    const response = await fetch(`${baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    return await w03HotFixFetcher({funcName: 'findProductById', Id: id});

    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
