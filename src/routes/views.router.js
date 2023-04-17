// Manejo de rutas para los ednpoints de las vistas, definidas con handlebars
const express = require('express');
const ProductManager = require('../dao/managers/ProductManagerMongo');
const productManager = new ProductManager();
const MessageManager = require('../dao/managers/MessageManagerMongo');
const messageManager = new MessageManager();

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

viewRouter.get('/chat', async (req, res)=>{
    allMessages = await messageManager.getMessages();

    res.render('chat', {
        title : "Chat"
    })
})

viewRouter.get('/register', (req, res)=>{
    res.render('register')
})

module.exports = viewRouter
