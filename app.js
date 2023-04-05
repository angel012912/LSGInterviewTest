// Author: Jose Angel Garcia Gomez
// Date: 10/10/2019
// NPM VERSION: 18.15.0 (Borrar)
// Node VERSION: 9.5.0 (Borrar)

// Importing Swagger Packages
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

// Importing express
const express = require('express')
// Creating an express app
const app = express()
// Defining the port
const port = 3000

//  Using the swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


// Importing the csv parser
const fs = require("fs");
const { parse } = require("csv-parse");

// Defining the varaibles
var csvData = [];

// Reading the csv file
fs.createReadStream("./ListadoTest.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    csvData.push(row);
  })

// Function to sort the csv data by age
function getNamesByAge() {
  var copyData = [...csvData];
  var names = [];
  copyData.sort(function (a, b) {
    return a[1] - b[1];
  });
  var names = copyData.map(function (a) {
    return a[0];
  });
  return names;
}

// Function to generate a resume of names by place of birth
function getNamesByPlace() {
  var copyData = [...csvData];
  var places = {};
  copyData.forEach(function (a) {
    if (places[a[2]] == undefined) {
      places[a[2]] = [a[0]];
    } else {
      places[a[2]].push(a[0]);
    }
  });
  return places;
}

// Function to generate a list of names with the birth year based on the age
function getBirthYear() {
  var copyData = [...csvData];
  var birthYear = {};
  var year = new Date().getFullYear();

  copyData.forEach(function (a) {
    birthYear[a[0]] = year - a[1];
  });
  return birthYear;
}

// Defining the default route
app.get('/', (req, res) => {
  res.send('Hello World!');
})

// Defining the route to get the names sorted by age
app.get('/names', (req, res) => {
  res.send(getNamesByAge());
});

// Defining the route to get the names sorted by place of birth
app.get('/places', (req, res) => {
  res.send(getNamesByPlace());
});

// Defining the route to get the names with their year of birth based on their age
app.get('/birthyear', (req, res) => {
  res.send(getBirthYear());
});



// Opnening the server on the port defined above
app.listen(port, () => { 
  console.log(`App listening on port ${port}`) 
}) 