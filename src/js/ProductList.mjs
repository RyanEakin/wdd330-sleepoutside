/*The purpose of this script is to generate a list of product cards in HTML from an array*/
/*Add a class called ProductList and export this class as default. Start with the constructor*/
/*there are more than one category of products that will need to be independently listed. To make the ProductList class
as flexible and reusable as possible, the constructor should receive the parameters: category, dataSource,
and the HTML element (listElement) as an output target*/
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  /*Next, add a method called renderList(). This method will be responsible for generating the HTML for the product cards
  and inserting them into the listElement */
  async renderList() {
    const products = await this.dataSource.getData();
    const categoryProducts = products.filter(
      (product) => product.Category === this.category
    );
    this.listElement.innerHTML = categoryProducts
      .map(
        (product) => `
      <div class="product-card">
        <img src="${product.Image}" alt="${product.Name}" class="product-image"/>
        <h3 class="product-name">${product.Name}</h3>
        <p class="product-price">$${product.Price.toFixed(2)}</p>
        <a href="product.html?id=${product.Id}" class="product-link">View Details</a>
      </div>
    `).join("");
  }
}