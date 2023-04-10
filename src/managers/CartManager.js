// Maneja todo lo relacionado a los carritos en el sistema 

const fs = require('fs');
const Cart = require('../models/cart.model');
const ProductManager = require('./ProductManager');
const productManager = new ProductManager('./');

class CartManager {
    // Constructor de CartManager que recibe la ruta del archivo carrito.json como parametro
	constructor(path) {
		this.path = path + 'carrito.json';
	}

    // Escribe lo recibido en el parametro data dentro del archivo carrito.json
	async writeFile(data) {
		try {
			await fs.promises.writeFile(this.path, JSON.stringify(data,null,'\t'));
		} catch (error) {
			console.error("Error writing file: " + error.message);
		}
	};

    // Devuelve todos los carritos ingresados en el archivo carrito.json
	getCarts = async () => {
        let allCarts = [];
        if (fs.existsSync(this.path)) {
            try {
                allCarts = await fs.promises.readFile(this.path, 'utf-8');
            } catch (error) {
                console.error("Can't read carts from the filesystem" + error.message);
            };
        }if (allCarts.length>0){return JSON.parse(allCarts);}else{return []}; 
    }

    // Agrega un carrito en el archivo carrito.json
    addCart = async () => {
		let allCarts = await this.getCarts();
		let cartId = 1;
		try {
			allCarts.length === 0 ? cartId : cartId = allCarts[allCarts.length-1].id + 1;
			const newCart = {...new Cart(), id: cartId};
			allCarts.push(newCart);
			await this.writeFile(allCarts);
			return newCart;
		} catch (error) {
			console.error("Can't save the cart: " + error);	
		}
	}

    // Devuleve el carro con id igual a cartId
    getCartById = async cartId => {
		let allCarts = await this.getCarts();
        return allCarts.find(cart => cart.id === cartId);
	}

    // Agrega la cantidad recibida en quantity del producto de id igual a pid en el carrito de id igual a cid 
    addCartItem = async (cid, pid, quantity) => {
		let productToAdd = await productManager.getProductById(pid);
		if	(productToAdd){
			let allCarts = await this.getCarts();
			for (let i = 0; i < allCarts.length; i++) {
				if (allCarts[i].id === cid) {
					const item = {"pid": pid, "quantity": quantity};
					let findedItem = null;
					for (let j = 0; j < allCarts[i].products.length; j++) {
						if (allCarts[i].products[j].pid === pid) {
							findedItem = allCarts[i].products[j];
							allCarts[i].products[j].quantity += quantity;
							break;
						}
					}
					if (!findedItem){
						allCarts[i].products.push(item);
					}
					await this.writeFile(allCarts);
					return allCarts[i];
				}
			}
			return null;
		}else{
			console.error("Couldn't find the specified product with id: " + pid);
			return null;
		}
	}
}

module.exports = CartManager;