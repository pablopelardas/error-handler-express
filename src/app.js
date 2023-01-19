const express = require("express");
// Esto es para ver las peticiones que se hacen al servidor, es un logger
const morgan = require('morgan') 

// Esto es para crear errores personalizados
const CustomError = require("./utils/CustomError") 

// Esto es para formatear la respuesta que se envía al cliente
const formatResponse = require("./utils/formatResponse")
// Esto es el middleware que maneja los errores
const errorHandler = require("./middlewares/errorHandler")

const ProductManager = require("../ProductManager")
const productos = new ProductManager("./productos.json")

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get("/products", async (req, res, next) => {
    try {
        let limit = parseInt(req.query.limit);
        const allProductos = await productos.getProducts(limit);
        // if (true) throw new CustomError({message: "Error personalizado", status: 500})
        res.send(formatResponse(allProductos, "Productos", 200))

    } catch (error) {
        next(error)
    }

})

app.use(errorHandler)

app.listen(3000, () => {
    console.log("Servidor iniciado")
})
