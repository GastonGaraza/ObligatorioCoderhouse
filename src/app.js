// Servidor express que escucha en puerto 8080 y resuelve los enpoints de 
// paroductos y carritos mediante sus archivos de rutas correspondientes

const express = require('express')
const productRouter = require('./routes/product.router');
const cartRouter = require('./routes/cart.router');
const userRouter = require('./routes/user.router');
const viewsRouter = require('./routes/views.router');

const { objConfig } = require('./config/config.js')

// Instancia de ProductManager
const ProductManager = require('./dao/managers/ProductManagerMongo');
const productManager = new ProductManager();
const {product}  = require('./dao/models/products.model');

// Instancia de MessageManager
const MessageManager = require('./dao/managers/MessageManagerMongo');
const messageManager = new MessageManager();
const {message}  = require('./dao/models/message.model');

objConfig.connectDB()

// Servidor express
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Manejo de handlebars
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars' );

// Manejo directorio public
app.use('/virtual', express.static(__dirname + '/public'));

// Endpoint routes
app.use('', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/users',  userRouter)

const httpServer = app.listen(PORT, (err) => {
    if (err) return console.log(`Error running the server on port ${PORT}`)

    console.log(`Servidor iniciado en el puerto ${PORT}`)
})

// Socket server
const socketIO = require('socket.io')(httpServer, {
    cors: {
        origin: '*'
    }
});

// Manejo de las conexiones del socket server
socketIO.on('connection', async (socket) => {
    console.log('cliente conectado');

    let allProducts = await productManager.getProducts();
    
    socketIO.emit('allProducts', allProducts);

    await socket.on('addProduct', async function (datos) {
        if (datos.title && datos.description && datos.price && datos.thumbnail && datos.code && datos.stock){
            const sameProduct = await productManager.checkProduct(datos.code);
            if (!sameProduct){
                let productToAdd = new product(datos);
                const productAdded = await productManager.addProduct(productToAdd);
                allProducts = await productManager.getProducts();
                socketIO.emit('allProducts', allProducts);
            }else{
                socketIO.emit('errorInsert', "A product with the code (" + datos.code + ") already exists");       }
            }  
    });

    await socket.on('addMessage', async function (datos) {
        if (datos.email && datos.message){
            console.log("Email: " + datos.email);
            let messageToAdd = new message(datos);
            const messageAdded = await messageManager.addMessage(messageToAdd);
            allMessages = await messageManager.getMessages();
            socketIO.emit('allMessages', allMessages);
        }
    });

    // socket.on('disconnect')
    socket.on('authenticated', userEmail=>{
        socket.broadcast.emit('newUserConnected',userEmail);
    })

    // Handle Socket.io disconnections
    socket.on('disconnect', () => {
        console.log('Client disconnected'); 
    });
});