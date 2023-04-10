// Controlador para manejar las rutas correspondientes al objeto carrito

const CartManager = require('../managers/CartManager');
const cartManager = new CartManager('./');
const Cart = require('../models/cart.model');

// Devuelve todos los carritos que estan en el sistema
exports.getCart = async (req, res) => {  
    try {
        const cid = parseInt(req.params.cid);
        const findedCart = await cartManager.getCartById(cid);
        res.send(findedCart);
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
      };
}

// Agrega un carrito vacio al sistema
exports.addCart = async (req, res) => {
    try {
        const cartAdded = await cartManager.addCart();
        res.send(cartAdded);    
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

// Agrega un producto de id igual a pid al carro de id igual a cid
exports.addCartItem = async (req, res) => {
    try {
        // Obtiene valores de parametros
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        const quantity = !req.body.quantity ? 1 : req.body.quantity;
        // Agrega el producto al carrito
        const result = await cartManager.addCartItem(cid, pid, quantity);  
        if (result){
            res.send(result); 
        }else{
            res.sendStatus(500);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

