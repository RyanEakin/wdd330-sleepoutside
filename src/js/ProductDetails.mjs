/*This file contains code to dynamically produce the product detail pages*/

import { getProductById } from './api/products.mjs';
import { renderProductDetails } from './components/ProductDetailsComponent.mjs';
import { getQueryParam } from './utils/urlUtils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    const productId = getQueryParam('id');
    if (productId) {
        try {
            const product = await getProductById(productId);
            renderProductDetails(product);
        } catch (error) {
            console.error('Error fetching product details:', error);
            document.getElementById('product-details').innerHTML = '<p>Failed to load product details.</p>';
        }
    } else {
        document.getElementById('product-details').innerHTML = '<p>No product ID specified.</p>';
    }
});