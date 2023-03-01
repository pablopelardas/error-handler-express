const express = require("express");

// Esto es para crear errores personalizados
const CustomError = require("./utils/CustomError") 

// Esto es el middleware que maneja los errores
const errorHandler = require("./middlewares/errorHandler")


const app = express();
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req, res, next) => {
    try {
        // ... código de la ruta

        // condiciones para lanzar un error
        if (true) throw new CustomError({message: "Error personalizado", status: 500})

    } catch (error) {
        next(error)
    }

})

app.use(errorHandler)

app.listen(3000, () => {
    console.log("Servidor iniciado")
})
