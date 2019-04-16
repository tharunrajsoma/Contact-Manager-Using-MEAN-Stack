/* From app.js routing gets done to this file for displaying data from Database */

const express = require('express');
const router = express.Router();

//Bring contact schema that is created in contacts.js file here
const Contact = require('../models/contacts');

//retrieving data
router.get('/contacts', (req, res, next)=>{
   // res.send('Retrieving contact list');
   //find method for retrieving contacts
   Contact.find(function(err, contacts) {
       //all the contacts after retrieving will be saved in contacts variable
       res.json(contacts);
   });
});


//add contact
// FLOW: contacts.component.html -> contacts.component.ts -> contact.service.ts -> route.js(operation to execute on the MongoDb database).
router.post('/contact', (req, res, next)=>{
    let newContact = new Contact ({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone : req.body.phone
    });
    //console.log(newContact);
    //Here we save and then we need a call back function
    newContact.save((err, contact)=> {
        if(err) {
            res.json({msg: 'Failed to add contact'});
        }
        else {
            res.json({msg: 'Contact added successfully'});
        }
    });
});

//delete contact based on the particular id
//Mongodb creates a particular id for each document
router.delete('/contact/:id', (req, res, next)=>{
    Contact.deleteMany({_id: req.params.id}, function(err, result){
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;