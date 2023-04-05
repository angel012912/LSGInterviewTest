// Author: Jose Angel Garcia Gomez
// Date: 10/10/2019
// Description: This is the main file of the project. It contains the code to run the server and the routes

/* Importing all the Packages and Functions */

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');
const express = require('express')
const fs = require("fs");
const { parse } = require("csv-parse");
const testController = require('./app.js');

/* -------------------------------------------- */


/* Defining the basis for the express server */

const app = express()
const port = 4000 
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

/* -------------------------------------------- */


/* Reading the CSV file */

var csvData = [];
fs.createReadStream("./ListadoTest.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    csvData.push(row);
  })

/* -------------------------------------------- */


/* Defining the main routes of the project */

app.get('/v1/', (req, res) => {
  res.status(200).send('Hello World!');
})
app.get('/v1/names', (req, res) => {
  res.status(200).send(testController.getNamesByAge(csvData));
});
app.get('/v1/places', (req, res) => {
  res.status(200).send(testController.getNamesByPlace(csvData));
});
app.get('/v1/birthyear', (req, res) => {
  res.status(200).send(testController.getBirthYear(csvData));
});

/* -------------------------------------------- */

/* Opening the server */
app.listen(port, () => { 
  console.log(`App listening on port ${port}`);
  console.log('Visit localhost:4000/v1/api-docs to see the documentation'); 
}) 

/* -------------------------------------------- */