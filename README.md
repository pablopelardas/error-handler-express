# README.md

# Muestra Express Error Handler

Les dejo en este repositorio un ejemplo de manejador de errores haciendo uso del middleware de express que recibe errores y nos permite entregarlos al cliente sin vulnerabilidades y formateado de forma correcta:

### App.js

Tiene la configuración del servidor con una ruta de ejemplo para mostrar como crear ************CustomErrors************, errores personalizados que vamos a crear gracias a la clase CustomError que extendemos del objeto Error de js en el archivo CustomError.js

```jsx
const express = require("express");
// Esto es para crear errores personalizados
const CustomError = require("./utils/CustomError") 
// Esto es para formatear la respuesta que se envía al cliente
// Esto es el middleware que maneja los errores
const errorHandler = require("./middlewares/errorHandler")

...

app.get("/products", async (req, res, next) => {
    try {
        // ... código de la ruta

        // condiciones para lanzar un error
        if (true) throw new CustomError({message: "Error personalizado", status: 500})

    } catch (error) {
				// hacemos un next para mandar el error al middleware de errores
        next(error)
    }

})

// Usamos el middleware manejador de error después de definir todas las rutas
app.use(errorHandler)

...
```

### utils/CustomError.js

Una clase que extiende de Error para que el middleware manejador de errores de express reconozca al objeto como un objeto de error. Hacemos esto para poder customizar la información que queremos mandar en el error, en este caso sólo ****************message y status**************** pero se podría agregar cualquier cosa.

```jsx
class CustomError extends Error {
  constructor({message, status}) {
    super(message);
    this.status = status;
  }
}
```

### middlewares/errorHandler.js

Es un middleware de express que recibe los 4 parametros (error, request, response y next).

Lo que hacemos en él es crear un nuevo objeto con un status y mensaje (y los campos que quieran agregar) que, si nos llega en el objeto error un status y mensaje los asigne, y sino asigne un error generico de status 500 y mensaje ****************Internal Server Error****************

Esto lo hacemos por si llega un error que no sea creado por nuestro custom error

```jsx
function errorHandler (err, req, res, next) {
    const status = err.status || 500
    const message = err.message || "Internal Server Error"
    res.status(status).send({message, status})
}
```

De esta manera tenemos un manejador de errores a donde van a llegar todos nuestros errores (ya sean custom o default) gracias a los next que estamos usando en nuestros try catch.

Así podemos mandar un error bien formateado y con la información que realmente queramos.