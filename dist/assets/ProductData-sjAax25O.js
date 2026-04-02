const r = "https://wdd330-backend.onrender.com/";
function o(t) {
  if (t.ok) return t.json();
  throw new Error("Bad Response");
}
class a {
  async getData(e) {
    return await fetch(`${r}products/search/${e} `)
      .then(o)
      .then((n) => n.Result);
  }
  async findProductById(e) {
    return await fetch(`${r}product/${e} `)
      .then(o)
      .then((n) => n.Result);
  }
}
export { a as P };
