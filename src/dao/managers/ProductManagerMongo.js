// Maneja todo lo relacionado a los productos en el sistema con persistencia en Mongo DB

const {product} = require("../models/products.model");

class ProductManagerMongo {
	
	// Constructor de ProductManager que recibe la ruta del archivo productos.json como parametro
	constructor() {
	}

	// Devuelve todos los productos ingresados en el archivo productos.json
	getProducts = async limit => {
		let allProducts = product.find();
		if (limit > 0){
			return allProducts.slice(0, limit);
		}else{
			return allProducts;
		}
    }
 
	// Agrega un producto en el archivo productos.json
	addProduct = async productToAdd => {
		try {
			if (productToAdd.title != "" && productToAdd.description != "" && productToAdd.price > 0 && productToAdd.thumbnail != "" && productToAdd.code != "" && productToAdd.stock > 0){
				await product.create(productToAdd);
				return productToAdd;
			}else{
				console.error("All the fields are mandatory (title, description, price, thumbnail, code, stock)");
			}
		} catch (error) {
			console.error("Can't save the product: " + productToAdd.title + " : " + error);	
		}
	}

	// Devuleve el producto con id igual a productId
	getProductById = async productId => {
		try {
			const productFinded = await product.findById(productId);
			return productFinded;
		} catch (error) {
			console.error("Can't get the product: " + productId + " : " + error);	
		}

	}

	// Checkea si existe el producto con codigo igual a code para no ingresarlo nuevamente
	checkProduct = async code => {
		product.findOne({ code: code })
			.then(product => {
				if (product) {
					return product;
				} else {
			  		console.log('Product not found');
				}
		  	})
		  	.catch(error => {
				console.error('Error finding product:', error);
			});
	}
	
	// Elimina un producto cambiando su status en el archivo productos.json 
	deleteProduct = async productId => {
		let productFinded = await this.getProductById(productId);
		if (productFinded) {
			productFinded.status = false;
			await product.findByIdAndUpdate(productId, productFinded);
			return true;
		}else{
			console.error("Can't delete the product: " + productId);	
        	return false;
		}
	}

	// Actualiza un producto en el archivo productos.json
	updateProduct = async (productId, productNewValues) => {
		let productFinded = this.getProductById(productId);
		if (productNewValues.title != undefined && productNewValues.title != ""){productFinded.title = productNewValues.title;}else{console.log("Product title cant be empty")};
		if (productNewValues.description != undefined && productNewValues.description!= "") {productFinded.description = productNewValues.description;}else{console.log("Product description cant be empty")};
		if (productNewValues.price != undefined && productNewValues.price >= 0) {productFinded.price = productNewValues.price;}else{console.log("Product price cant be negative")};
		if (productNewValues.thumbnail != undefined && productNewValues.thumbnail != "") {productFinded.thumbnail = productNewValues.thumbnail;}else{console.log("Product thumbnail cant be empty")};
		if (productNewValues.code != undefined && productNewValues.code != "") {productFinded.code = productNewValues.code;}else{console.log("Product code cant be empty")};
		if (productNewValues.stock != undefined && productNewValues.stock >= 0) {productFinded.stock = productNewValues.stock;}else{console.log("Product stock cant be negative")};        
		product.updateOne({_id: productId}, productFinded);
		let allProducts = await this.getProducts();
		return allProducts;
	}
}

module.exports = ProductManagerMongo;