// Maneja todo lo relacionado a los productos en el sistema con sistema de archivos fs

const fs = require('fs');

class ProductManager {
	
	// Constructor de ProductManager que recibe la ruta del archivo productos.json como parametro
	constructor(path) {
		this.path = path + 'productos.json';
	}

	// Escribe lo recibido en el parametro data dentro del archivo productos.json
	async writeFile(data) {
		try {
			await fs.promises.writeFile(this.path, JSON.stringify(data,null,'\t'));
		} catch (error) {
			console.error("Error writing file: " + error.message);
		}
	};

	// Devuelve todos los productos ingresados en el archivo productos.json
	getProducts = async limit => {
		let allProducts = [];
		if (limit > 0){
			allProducts = await this.getProducts();
			return allProducts.slice(0, limit);
		}else{
			if (fs.existsSync(this.path)) {
				try {
					allProducts = await fs.promises.readFile(this.path, 'utf-8');
				} catch (error) {
					console.error("Can't read products from the filesystem" + error.message);
				}
			} if (allProducts.length>0){return JSON.parse(allProducts);}else{return []}; 
		}
    }

	// Agrega un producto en el archivo productos.json
	addProduct = async productToAdd => {
		let allProducts = await this.getProducts();
		let productId = 1;
		try {
			allProducts.length === 0 ? productId : productId = allProducts[allProducts.length-1].id + 1;
			if (productToAdd.title != "" && productToAdd.description != "" && productToAdd.price > 0 && productToAdd.thumbnail != "" && productToAdd.code != "" && productToAdd.stock > 0){
				let newProduct = {...productToAdd, id: productId};
				allProducts.push(newProduct);
				await this.writeFile(allProducts);
				return newProduct;
			}else{
				console.error("All the fields are mandatory (title, description, price, thumbnail, code, stock)");
			}
		} catch (error) {
			console.error("Can't save the product: " + productToAdd.title + " : " + error);	
		}
	}

	// Devuleve el producto con id igual a productId
	getProductById = async productId => {
		let allProducts = await this.getProducts();
		return allProducts.find(product => product.id === productId);
	}

	// Checkea si existe el producto con codigo igual a code para no ingresarlo nuevamente
	checkProduct = async code => {
		let allProducts = await this.getProducts();
		return allProducts.find(product => product.code === code);
	}
	
	// Elimina un producto cambiando su status en el archivo productos.json 
	deleteProduct = async productId => {
		let allProducts = await this.getProducts();
		let productFinded = allProducts.find(product => product.id === productId);
		if (productFinded) {
			productFinded.status = false;
			await this.writeFile(allProducts);
			return true;
		}else{
			console.error("Can't delete the product: " + productId);	
        	return false;
		}
	}

	// Actualiza un producto en el archivo productos.json
	updateProduct = async (productId, productNewValues) => {
		let allProducts = await this.getProducts();
        for (let i = 0; i < allProducts.length; i++) {
            if (allProducts[i].id === productId) {
				if (productNewValues.title != undefined && productNewValues.title != ""){allProducts[i].title = productNewValues.title;}else{console.log("Product title cant be empty")};
				if (productNewValues.description != undefined && productNewValues.description!= "") {allProducts[i].description = productNewValues.description;}else{console.log("Product description cant be empty")};
				if (productNewValues.price != undefined && productNewValues.price >= 0) {allProducts[i].price = productNewValues.price;}else{console.log("Product price cant be negative")};
				if (productNewValues.thumbnail != undefined && productNewValues.thumbnail != "") {allProducts[i].thumbnail = productNewValues.thumbnail;}else{console.log("Product thumbnail cant be empty")};
				if (productNewValues.code != undefined && productNewValues.code != "") {allProducts[i].code = productNewValues.code;}else{console.log("Product code cant be empty")};
				if (productNewValues.stock != undefined && productNewValues.stock >= 0) {allProducts[i].stock = productNewValues.stock;}else{console.log("Product stock cant be negative")};
                await this.writeFile(allProducts);
                return allProducts[i];
            }
        }
		console.error("Can't update the product: " + productId);	
        return null;
	}
}

module.exports = ProductManager;

let productManager = new ProductManager('./');
const testCases = async () => {
	let getProducts = await productManager.getProducts();
	console.log(getProducts);
	let addProduct = await productManager.addProduct(
		{
			title: 'producto prueba',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc123',
			stock: 25
		}
	);
	console.log(addProduct);
	getProducts = await productManager.getProducts();
	console.log(getProducts);
	let getProductById = await productManager.getProductById(8);
	console.log(getProductById);
	getProductById = await productManager.getProductById(1);
	console.log(getProductById);

    let updateProduct = await productManager.updateProduct(1, 
		{
            price: 150,
			stock: 34
		}
	);
	console.log(updateProduct);
}
