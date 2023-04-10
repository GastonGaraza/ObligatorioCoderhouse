// Manejo de rutas para los ednpoints de carritos, para esto usa las funciones del controlador de carritos
// Permiten la adicion y baja de productos.

const express = require('express');
const cartController = require('../controllers/cart.controller')

const cartRouter = express.Router();

// Obtencion de carrito por id, parametro cid
cartRouter.get('/:cid', cartController.getCart);
// Adicion de carrito
cartRouter.post('/', cartController.addCart);
// Agrega producto a carrito
cartRouter.post('/:cid/products/:pid', cartController.addCartItem);

module.exports = cartRouter;