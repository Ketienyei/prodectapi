const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstname:{
        type: String,
        required:[true,'Firstname is required']
    },
    lastname:{
        type: String,
        required :[true,'Lastname is required']
    },
    email:{
        type: String,
        required :[true,'email is required']
    }
});

const Customer = mongoose.model('customers', customerSchema)

module.exports = Customer