var express = require('express');
var todoController = require('./controllers/todoController');
var bodyParser = require('body-parser');


var app = express();

//set up template engine
app.set('view engine','ejs');

//static files BARDZO WAZNE zeby ustawić po static dokladna sciezke?
app.use(express.static('./public')); //


//fire controllers
todoController(app);

//Listen to port
app.listen(3000);
console.log(' .. Listening on port 3000 ..')