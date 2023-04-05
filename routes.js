//Author: Jose Angel Garcia Gomez
//Date: 04/04/2023
//Description: Definition of all the main routes of the project

const express = require('express');
const router = express.Router();
const testController = require('./app.js');

router.route('/').get(testController.default)

router.route('/names').get(testController.getNamesByAge)

router.route('/places').get(testController.getNamesByPlace)

router.route('/birthyear').get(testController.getBirthYear)

module.exports = router;