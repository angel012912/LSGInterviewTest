// Author: Jose Angel Garcia Gomez
// Date: 04/04/2023
// Description: This is the main file of the project. It contains the code to run the server and the routes

/* Importing all the Packages and Functions */

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const express = require('express');
const routes = require('./routes.js');

/* -------------------------------------------- */


/* Defining the basis for the express server */

const app = express();
const port = 4000 
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/v1', routes);

/* -------------------------------------------- */


/* Opening the server */
app.listen(port, () => { 
  console.log(`App listening on port ${port}`);
  console.log('Visit localhost:4000/v1/api-docs to see the documentation'); 
}) 

/* -------------------------------------------- */