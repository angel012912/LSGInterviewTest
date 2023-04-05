// Author: Jose Angel Garcia Gomez
// Date: 10/10/2019
// NPM VERSION: 18.15.0 (Borrar)
// Node VERSION: 9.5.0 (Borrar)

// Importing express
const express = require('express')
// Creating an express app
const app = express()
// Defining the port
const port = 3000



// Opnening the server on the port defined above
app.listen(port, () => { 
  console.log(`App listening on port ${port}`) 
}) 