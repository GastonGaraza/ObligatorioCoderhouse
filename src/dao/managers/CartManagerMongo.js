// Maneja todo lo relacionado a los carritos en el sistema con persistencia en Mongo DB 

const {cart} = require('../models/carts.model');
const ProductManager = require('./ProductManagerMongo');
const productManager = new ProductManager();

class CartManagerMongo {
    // Constructor de CartManager que recibe la ruta del archivo carrito.json como parametro
	constructor() {
	}

    // Agrega un carrito en el archivo carrito.json
    addCart = async () => {
		const newCart = {};
		try {
			cart.create(newCart)
			return newCart;
		} catch (error) {
			console.error("Can't save the cart: " + error);	
		}
	}

    // Devuleve el carro con id igual a cartId
    getCartById = async cartId => {
		try {
			const cartFinded = await cart.findById(cartId);
			if(cartFinded) {
				return cartFinded;
			}else{
				console.error("Can't find the cart: " + error);	
				return [];
			}
		} catch (error) {
			console.error("Can't get the cart: " + error);	
		}
	}

    // Agrega la cantidad recibida en quantity del producto de id igual a pid en el carrito de id igual a cid 
    addCartItem = async (cid, pid, quantity) => {
		let productToAdd = await productManager.getProductById(pid);
		if	(productToAdd){
			console.log("Carro: " + this.getCartById(cid));
		}else{
			console.error("Couldn't find the specified product with id: " + pid);
			return null;
		}
	}
}

module.exports = CartManagerMongo;