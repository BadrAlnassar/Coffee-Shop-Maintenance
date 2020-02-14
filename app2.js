const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
require('dotenv').config();

// users' database
require('./db/mongoose');

//routes
const IndexRoute = require('./routes/Index');

// middlewares
// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api/', IndexRoute);

app.listen(port, console.log('server is starting... on port 3000'))