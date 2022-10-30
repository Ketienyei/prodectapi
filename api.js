const express = require('express')
const routes = express.Router();
const Customer = require('../models/customers');

const User = require('../models/user');

const {authSchema} = require('../auth/auth_schema');
const creatError = require('http-errors');
const {signAccessToken} = require ('../auth/jwtHelper')
require('dotenv').config()


//list of products from the database
routes.get('/customers', (req ,res) =>{
    res.send('Here are our wonderful customers')
})

//add customers to the db
routes.post('/customers', (req, res, next)=>{
    Customer.create (req.body).then ((customer)=>{
        res.send(customer);
         }).catch(next);
    })



// register a user
routes.post('/register', async (req, res, next)=>{
    try{
      const{email, password} = req.body;
      const result = await authSchema.validateAsync(req.body)

      const exists = await User.findOne({email: email});
      if (exists) throw creatError.Conflict(`${email} has already been registered`);

      const user = new User (result);
      const savedUser = await user.save();
      //res.send(savedUser);
       const accessToken = await signAccessToken(savedUser.id);
       res.send({accessToken})
    }
    catch (error){
    next(error);
   }
  });
  



module.exports = routes;