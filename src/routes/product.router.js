// Manejo de rutas para los ednpoints de productos, para esto usa las funciones del controlador de prductos
// Permiten la adicion, baja y modificacion de productos.

const express = require('express');
const productController = require('../controllers/product.controller')

const productRouter = express.Router();

// Obtencion de producto por id, parametro pid
productRouter.get('/:pid', productController.getProduct);
// Obtencion de todos los productos 
productRouter.get('/', productController.getProducts);
// Adicion de producto
productRouter.post('/', productController.addProduct);
// Actualizacion de producto
productRouter.put('/:pid', productController.updateProduct);
// Baja de producto
productRouter.delete('/:pid', productController.deleteProduct);

module.exports = productRouter;