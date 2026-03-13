import ProductData from "./tents.json";
/*import ProductList class as a module.then create an
instance of the ProductList class,and make sure you can see the list of products*/


const dataSource = new ProductData("tents");
const featuredProductIds = ["880RR", "989CG", "985PR", "344YJ"];
const productPageMap = {
    "880RR": "product_pages/marmot-ajax-3.html",
    "989CG": "product_pages/northface-talus-4.html",
    "985PR": "product_pages/northface-alpine-3.html",
    "344YJ": "product_pages/cedar-ridge-rimrock-2.html",
};

function getFeaturedProducts(products) {
    return featuredProductIds
        .map((id) => products.find((product) => product.Id === id))
        .filter(Boolean);
}

function productCardTemplate(product) {
    const productLink = productPageMap[product.Id] || "#";
    const imagePath = product.Image.replace("../", "");

    return `<li class="product-card">
		<a href="${productLink}">
			<img src="${imagePath}" alt="${product.NameWithoutBrand}" />
			<h3 class="card__brand">${product.Brand.Name}</h3>
			<h2 class="card__name">${product.NameWithoutBrand}</h2>
			<p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
		</a>
	</li>`;
}

function renderProductList(products) {
    const productListElement = document.querySelector(".product-list");
    const html = products.map(productCardTemplate).join("");
    productListElement.innerHTML = html;
}

async function init() {
    try {
        const products = await dataSource.getData();
        const featuredProducts = getFeaturedProducts(products);
        renderProductList(featuredProducts);
    } catch (error) {
        document.querySelector(".product-list").innerHTML =
            "<li>Unable to load products right now.</li>";
    }
}

init();
