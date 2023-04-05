// Author: Jose Angel Garcia Gomez
// Date: 10/10/2019
// Description: Definition of all the main functions of the project

/* Defining the functions */

// Function to sort the csv data by age
exports.getNamesByAge = (data) => {
  var copyData = [...data];
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
exports.getNamesByPlace = (data) => {
  var copyData = [...data];
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
exports.getBirthYear = (data) => {
  var copyData = [...data];
  var birthYear = {};
  var year = new Date().getFullYear();

  copyData.forEach(function (a) {
    birthYear[a[0]] = year - a[1];
  });
  return birthYear;
}

