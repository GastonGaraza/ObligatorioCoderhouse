// Servidor express que escucha en puerto 8080 y resuelve los enpoints de 
// paroductos y carritos mediante sus archivos de rutas correspondientes

const express = require('express')
const productRouter = require('./routes/product.router');
const cartRouter = require('./routes/cart.router');

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(PORT, (err) => {
    if (err) return console.log(`Error running the server on port ${PORT}`)

    console.log(`Servidor iniciado en el puerto ${PORT}`)
})
