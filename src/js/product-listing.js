import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const defaultCategory = "tents";
const categoryLabels = {
    tents: "Tents",
    backpacks: "Backpacks",
    "sleeping-bags": "Sleeping Bags",
    hammocks: "Hammocks",
};

function getSelectedCategory() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if (category && categoryLabels[category]) {
        return category;
    }

    return defaultCategory;
}

async function getProducts(category) {
    try {
        return await new ProductData(category).getData();
    } catch (error) {
        if (category === "hammocks") {
            return [];
        }

        throw error;
    }
}

async function renderProductListing() {
    const category = getSelectedCategory();
    const listElement = document.querySelector(".product-list");
    const titleElement = document.querySelector("[data-category-title]");

    if (!listElement) {
        return;
    }

    const pageLabel = categoryLabels[category] || categoryLabels[defaultCategory];
    const products = await getProducts(category);
    const productList = new ProductList(category, null, listElement);

    document.title = `Sleep Outside | ${pageLabel}`;

    if (titleElement) {
        titleElement.textContent = pageLabel;
    }

    await productList.renderList(products);
}

renderProductListing();
