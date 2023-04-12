// Manejo de rutas para los ednpoints de las vistas, definidas con handlebars
const express = require('express');
const ProductManager = require('../managers/ProductManager');
const productManager = new ProductManager('./');

const viewRouter = express.Router();

viewRouter.get('/', async (req, res)=>{
    allProducts = await productManager.getProducts();

    res.render('index', {
        allProducts,
        title : "Product Manager"
    })
})

viewRouter.get('/realtimeproducts', async (req, res)=>{
    allProducts = await productManager.getProducts();

    res.render('realTimeProducts', {
        title : "Product Manager"
    })
})

module.exports = viewRouter
