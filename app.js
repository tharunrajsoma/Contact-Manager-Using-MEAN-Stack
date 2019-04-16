/* Entry point for server side code */

//importing modules for server side code to run
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path'); //no need to install this seperately. Since this is the core module of nodejs

var app = express(); // To use express application we need to assign express method

//our server logic exists
const route = require('./routes/route');

//Connect to MongoDb
mongoose.connect('mongodb://localhost:27017/contactlist', { useNewUrlParser: true });

//On Successful connection
mongoose.connection.on('connected', ()=>{
    console.log('Connected to database mongodb@21017');
});

//Incase of any error during connection
mongoose.connection.on('error', (err)=>{
    if(err) {
        console.log('Error in Database connection ' + err);
    }
});

//port no
const port = 3000;

//adding middleware - cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files to be rendered by front-end
app.use(express.static(path.join(__dirname, 'public')));

//all paths which start with /api will be forwarded to route.js
// In route js logic to call database is present
app.use('/api', route);

//testing server
app.get('/',(req, res)=>{
    res.send('Yes this mesage is from server!');
})

//bind server with the above port. The below one is a callback and I am using a arrow we can also use js function also.
app.listen(port,()=>{
    console.log('Server started at port:'+port);
})