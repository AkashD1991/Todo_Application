const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/Todo_Application', { useNewUrlParser: true, useUnifiedTopology: true });

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/users', require('./routes/users'));
app.use('/tasks', require('./routes/tasks'));

//Start the server
const port = process.env.PORT || 4000;

app.listen(port);
console.log(`Server is listening at ${port}`);