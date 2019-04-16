/* Contacts Schema for MongoDB database */

//Need to bring in mongoose to talk with mongodb
const mongoose = require('mongoose');

//Contacts Schema
const ContactSchema = mongoose.Schema({
    first_name:{
        type: String,
        required: true       
    },
    last_name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});

//export scheme
const Contact = module.exports = mongoose.model('Contact', ContactSchema)