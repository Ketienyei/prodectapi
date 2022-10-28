const express = require('express')
const routes = express.Router();
const Customer = require('../models/customers');

//list of products from the database
routes.get('/customers', (req ,res) =>{
    res.send('Here are our wonderful customers')
})



module.exports = routes;