// Author: Jose Angel Garcia Gomez
// Date: 10/10/2019
// Description: Definition of all the main functions of the project

/* Importing the packages to read CSV files */

const fs = require("fs");
const { parse } = require("csv-parse");

/* -------------------------------------------- */


/* Reading the CSV file */

var csvData = [];
fs.createReadStream("./ListadoTest.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    csvData.push(row);
  })

/* -------------------------------------------- */

/* Defining the functions */

exports.default = async (req, res) => {
  try{
    res.status(200).json({
      status: 'success',
      message: 'Hello World!'
    });
  }catch (error){
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
}

// Function to sort the csv data by age
exports.getNamesByAge = async(req, res) => {
  try{
    var copyData = [...csvData];
    var names = [];
    copyData.sort(function (a, b) {
      return a[1] - b[1];
    });
    var names = copyData.map(function (a) {
      return a[0];
    });
    res.status(200).json({
      status: 'success',
      results: names.length,
      data: {
        names
      }
    });
  }catch (error){
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
}

// Function to generate a resume of names by place of birth
exports.getNamesByPlace = async(req, res) => {
  try{
    var copyData = [...csvData];
    var places = {};
    copyData.forEach(function (a) {
      if (places[a[2]] == undefined) {
        places[a[2]] = [a[0]];
      } else {
        places[a[2]].push(a[0]);
      }
    });
    res.status(200).json({
      status: 'success',
      results: Object.keys(places).length,
      data: {
        places
      }
    });
  } catch (error){
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
}

// Function to generate a list of names with the birth year based on the age
exports.getBirthYear = async(req, res) => {
  try{
    var copyData = [...csvData];
    var birthYears = {};
    var year = new Date().getFullYear();
  
    copyData.forEach(function (a) {
      birthYears[a[0]] = year - a[1];
    });
    res.status(200).json({
      status: 'success',
      results: Object.keys(birthYears).length,
      data: {
        birthYears
      }
    });
  } catch (error){
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
}

/* -------------------------------------------- */