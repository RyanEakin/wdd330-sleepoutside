export default class ProductList {
    constructor(category, dataSource, listElement) {
    
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();

        console.log("List of products found:", list);
    }
}